import React from "react";
import { useCallback, useMemo, useState } from "react";
import {
  ComponentPreviewProps,
  ContainerPreview,
} from "../../common/containerPreview";
import { objUtil } from "../../../utils/objUtil";
import { unitUtil } from "../../../utils/unitUtil";
import { isNil, omitBy } from "lodash";
import { ButtonDesignModel, FuncModel } from "./buttonDesign";
import styles from '../../style.module.css';
import classNames from "classnames";
import { MyButton } from "../../form/myButton";

export interface ButtonPreviewProps extends ComponentPreviewProps {
  children?: undefined;
  onClick?: (
    funcName: FuncModel | null | undefined,
    data: any,
    forData: Array<{ forItemName: string; forItemData: any }>
  ) => Promise<void>;
}
export const ButtonPreview = (props: ButtonPreviewProps) => {
  const [loading, setLoading] = useState(false);

  const elementData = props.elementData as ButtonDesignModel;
  const value = useMemo(() => {
    return objUtil.formatFromDataAndForData(
      elementData?.text,
      props.data,
      props.forData
    );
  }, [elementData?.text, props.data, props.forData]);

  const containerElementData = useMemo(() => {
    return {
      ...elementData,
      border: undefined,
      borderLeft: undefined,
      borderRight: undefined,
      borderTop: undefined,
      borderBottom: undefined,
      padding: undefined,
      background: undefined,
      borderRadius: undefined,
    };
  }, [elementData]);
  const innerStyle = {
    fontSize: elementData?.fontSize,
    fontWeight: elementData?.fontWeight,
    padding: elementData?.padding,
    border: elementData?.border,
    borderLeft: elementData?.borderLeft,
    borderRight: elementData?.borderRight,
    borderTop: elementData?.borderTop,
    borderBottom: elementData?.borderBottom,
    background: elementData?.background,
    borderRadius: unitUtil.sizeParse(elementData?.borderRadius),
  };
  const onClick = useCallback(async () => {
    const elementData = props.elementData as ButtonDesignModel;
    const funcName = elementData.funcName;
    const funcParam1 = elementData.funcParam1;
    const funcParam2 = elementData.funcParam2;
    const funcParam3 = elementData.funcParam3;
    const funcParam4 = elementData.funcParam4;
    const resultPath = elementData.resultPath;

    const loadingWhenExec = elementData.loadingWhenExec;
    if (loadingWhenExec) {
      setLoading(true);
    }
    try {
      let func: FuncModel | null = null;
      if (funcName) {
        func = {
          funcName,
          funcParam1,
          funcParam2,
          funcParam3,
          funcParam4,
          resultPath
        };
      }
      await props.onClick?.(func, props.data, props.forData);
    } finally {
      setLoading(false);
    }
  }, [props]);

  return (
    <ContainerPreview
      {...{ ...props, children: undefined }}
      elementData={containerElementData}
      rawElementData={props.rawElementData}
    >
      <div style={{width: '100%', height: '100%'}}>
        <MyButton
          className={classNames(styles.wFull, styles.hFull)}
          style={omitBy(innerStyle, isNil)}
          loading={loading}
          onClick={onClick}
        >
          {value || ""}
        </MyButton>
      </div>
    </ContainerPreview>
  );
};
