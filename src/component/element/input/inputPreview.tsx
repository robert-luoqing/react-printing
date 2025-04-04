import React from "react";
import { useMemo, useRef } from "react";
import {
  ComponentPreviewProps,
  ContainerPreview,
} from "../../common/containerPreview";
import { InputModel } from "./inputDesign";
import { objUtil } from "../../../utils/objUtil";
import { unitUtil } from "../../../utils/unitUtil";
import { isNil, omitBy } from "lodash";
import styles from '../../style.module.css';
import classNames from "classnames";
import { MyInput } from "../../form/myInput";

export interface InputPreviewProps extends ComponentPreviewProps {
  children?: undefined;
  onChange: (
    val: string,
    path: string | undefined,
    data: any,
    forData: Array<{ forItemName: string; forItemData: any }>
  ) => void;
}
export const InputPreview = (props: InputPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementData = props.elementData as InputModel;
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
  return (
    <ContainerPreview
      {...{ ...props, children: undefined }}
      elementData={containerElementData}
      rawElementData={props.rawElementData}
    >
      <div ref={containerRef} style={{width: '100%', height: '100%'}}>
        <MyInput
          value={value || ""}
          className={classNames(styles.wFull, styles.hFull)}
          type={elementData.rawType}
          style={omitBy(innerStyle, isNil)}
          onChange={(e) =>
            props.onChange(
              e.target.value,
              elementData?.text,
              props.data,
              props.forData
            )
          }
        />
      </div>
    </ContainerPreview>
  );
};
