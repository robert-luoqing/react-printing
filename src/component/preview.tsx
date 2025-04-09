import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { objUtil } from "../utils/objUtil";
import { chunk, isNil } from "lodash";
import { funcUtil } from "../utils/funcUtil";
import { usePreviewComponents } from "../hoc/previewComponentHoc";
import { useFunctions } from "../hoc/functionHoc";
import { FuncModel } from "./element/button/buttonDesign";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "./style.module.css";
import { DivContainerModel } from "./container/divContainer/divContainer";

export interface PreviewProps {
  layout: DivContainerModel;
  data?: any;
  dataLoadPolicy?: "LoadOnce" | "LoadOnChange";
  localFuncs?: {
    [name: string]: (context: any, param: any) => Promise<any> | void;
  };
  pageMaxItemCount?: number;
  itemPropertyField?: string;
}

export interface PreviewRef {
  print: () => Promise<void>; // 定义要暴露的方法
}

export const Preview = forwardRef<PreviewRef, PreviewProps>((props, ref) => {
  const { componentsMap: uiElementsMap } = usePreviewComponents();

  const [data, setData] = useState<any[]>([{}]);

  const initializeData = props.data;
  const dataLoadPolicy = props.dataLoadPolicy;
  const prevInitializeData = useRef<any>(null);

  useEffect(() => {
    const splitData = (bindData: any) => {
      if (
        props.itemPropertyField &&
        bindData[props.itemPropertyField] &&
        props.pageMaxItemCount
      ) {
        const chunkItems = chunk(
          bindData[props.itemPropertyField],
          props.pageMaxItemCount
        );
        const newData = [];
        for (const chunkItem of chunkItems) {
          newData.push({
            ...bindData,
            [props.itemPropertyField]: chunkItem,
          });
        }
        setData(newData);
      } else {
        setData([bindData]);
      }
    };
    const prevData = prevInitializeData.current;
    if (prevData !== initializeData) {
      prevInitializeData.current = initializeData;
    }
    if (dataLoadPolicy === "LoadOnChange") {
      if (prevData !== initializeData) {
        splitData(initializeData);
      }
    } else {
      if (prevData === null) {
        splitData(initializeData);
      }
    }
  }, [
    dataLoadPolicy,
    initializeData,
    props.itemPropertyField,
    props.pageMaxItemCount,
  ]);

  const onInputChange = (
    val: any,
    path: string | undefined,
    data: any,
    forData: Array<{ forItemName: string; forItemData: any }>
  ) => {
    if (path) {
      const newPath = path.trim();
      if (newPath.startsWith("{") && newPath.endsWith("}")) {
        const realPath = newPath.substring(1, newPath.length - 1);
        const targetObj = objUtil.getTargetObjForProps(data, forData, realPath);
        if (targetObj === data) {
          const newData = objUtil.setProp(targetObj, realPath, val);
          setData({ ...newData });
        } else {
          // TODO 如果处理绑定For对象本身呢
          objUtil.setProp(targetObj, realPath, val);
          setData({ ...data });
        }
      }
    }
  };

  const globalFuncs = useFunctions();

  const onClick = async (
    func: FuncModel | null | undefined,
    data: any,
    forData: Array<{ forItemName: string; forItemData: any }>
  ) => {
    if (func?.funcName) {
      const funcObj =
        props.localFuncs?.[func?.funcName] ||
        globalFuncs.functions[func?.funcName];
      const funcParam1 = func.funcParam1
        ? objUtil.formatFromDataAndForData(func.funcParam1, data, forData)
        : null;
      const funcParam2 = func.funcParam2
        ? objUtil.formatFromDataAndForData(func.funcParam1, data, forData)
        : null;
      const funcParam3 = func.funcParam3
        ? objUtil.formatFromDataAndForData(func.funcParam1, data, forData)
        : null;
      const funcParam4 = func.funcParam4
        ? objUtil.formatFromDataAndForData(func.funcParam1, data, forData)
        : null;
      const resultPath = func.resultPath;
      const param = { funcParam1, funcParam2, funcParam3, funcParam4 };
      const result = await funcObj({ data, forData }, param);
      if (resultPath === ".") {
        setData({ ...(result || {}) });
      } else if (resultPath) {
        const newResult = objUtil.setProp(data, resultPath, result);
        setData({ ...newResult });
      }
    }
  };

  const renderByData = (
    layoutObj: DivContainerModel,
    bindData: any,
    forData: Array<{ forItemName: string; forItemData: any }>
  ) => {
    if (!layoutObj) {
      return null;
    }
    if (layoutObj.validOnDesign) {
      return null;
    }
    if (layoutObj.if) {
      const context = { ...bindData };
      for (const item of forData) {
        context[item.forItemName] = item.forItemData;
      }
      const result = funcUtil.evaluateCondition(layoutObj.if, context);
      if (!result) {
        return null;
      }
    }

    if (layoutObj.forPath && layoutObj.forItemName) {
      const forListData = objUtil.getPropFromDataAndForData(
        bindData,
        forData,
        layoutObj.forPath
      );
      if (isNil(forListData) || !forListData.map) {
        return null;
      }

      return forListData.map((item: any, index: number) => {
        const newForData = [
          ...forData,
          { forItemName: layoutObj.forItemName || "", forItemData: item },
        ];
        return renderElement(layoutObj, bindData, newForData, index);
      });
    }

    return renderElement(layoutObj, bindData, forData);
  };

  const renderElement = (
    layoutObj: DivContainerModel,
    bindData: any,
    forData: Array<{ forItemName: string; forItemData: any }>,
    index?: number
  ) => {
    const PreviewElement = uiElementsMap[layoutObj.type]?.previewComponent;
    if (PreviewElement) {
      return (
        <PreviewElement
          key={layoutObj.id + "-" + index}
          rawElementData={layoutObj}
          elementData={layoutObj}
          data={bindData}
          forData={[...forData]}
          onChange={onInputChange}
          onClick={onClick}
        >
          {layoutObj.children?.map((item: any) =>
            renderByData(item, bindData, forData)
          )}
        </PreviewElement>
      );
    }

    return null;
  };

  const printElements = useRef<Array<HTMLDivElement | null>>([]);
  const onPrint = async () => {
    let pdf: jsPDF | null = null;

    for (let i = 0; i < printElements.current.length; i++) {
      const printElement = printElements.current[i];
      if (printElement) {
        const rect = printElement.getBoundingClientRect();

        // Paper size, the font size so small, do make pager size = image size/1.5
        let width = rect.width;
        let height = rect.height;
        let scale = 3;

        if (props.layout.pagerWidth) {
          width = Number(props.layout.pagerWidth);
        }
        if (props.layout.pagerHeight) {
          height = Number(props.layout.pagerHeight);
        }

        if (props.layout.scale) {
          scale = Number(props.layout.scale);
        }
        if (!pdf) {
          pdf = new jsPDF(width > height ? "l" : "p", "px", [width, height]);
        }

        const canvas = await html2canvas(printElement, { scale });
        const image = canvas.toDataURL("image/png");
        if (i === 0) {
          pdf.addImage(image, "PNG", 0, 0, width, height);
        } else {
          const newPage = pdf.addPage(
            [width, height],
            width > height ? "l" : "p"
          );
          newPage.addImage(image, "PNG", 0, 0, width, height);
        }

        // pdf.save("generated.pdf");
      }
    }

    if (pdf) {
      pdf.autoPrint();

      const hiddFrame: any = document.createElement("iframe");
      hiddFrame.style.position = "fixed";
      // "visibility: hidden" would trigger safety rules in some browsers like safari，
      // in which the iframe display in a pretty small size instead of hidden.
      // here is some little hack ~
      hiddFrame.style.width = "1px";
      hiddFrame.style.height = "1px";
      hiddFrame.style.opacity = "0.01";
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        window.navigator.userAgent
      );
      if (isSafari) {
        // fallback in safari
        hiddFrame.onload = () => {
          try {
            hiddFrame.contentWindow.document.execCommand("print", false, null);
          } catch (e) {
            hiddFrame.contentWindow.print();
          }
        };
      }
      hiddFrame.src = pdf.output("bloburl").toString();
      document.body.appendChild(hiddFrame);
    }
  };

  useImperativeHandle(ref, () => ({
    print: async () => {
      await onPrint();
    },
  }));

  const previewLayout = useMemo(() => {
    const layout = { ...props.layout };
    layout.border = undefined;
    return layout;
  }, [props.layout]);

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className={styles.previewContainer}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            flex: 1,
            width: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          {data.map((item, index) => {
            return (
              <div
                key={index}
                style={{ display: "inline-block" }}
                ref={(el) => (printElements.current[index] = el)}
              >
                {renderByData(previewLayout, item, [])}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
