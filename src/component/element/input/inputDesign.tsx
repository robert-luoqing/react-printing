import React from "react";
import { useRef } from "react";
import {
  Container,
  ContainerModel,
  ComponentProps,
} from "../../common/containerDesign";
import { unitUtil } from "../../../utils/unitUtil";
import { isNil, omitBy } from "lodash";
import { MyInput } from "../../form/myInput";
import styles from '../../style.module.css';
import classNames from "classnames";

export interface InputModel extends ContainerModel {
  type: "Input";
  rawType?: string;
  text?: string;
  fontSize?: number;
  fontWeight?: string;
}

export interface InputProps extends ComponentProps {
  children?: undefined;
}
export const InputDesign = (props: InputProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = props.data as InputModel;
  const containerData = {
    ...data,
    border: undefined,
    borderLeft: undefined,
    borderRight: undefined,
    borderTop: undefined,
    borderBottom: undefined,
    padding: undefined,
    background: undefined,
    borderRadius: undefined,
  };
  const innerStyle = {
    fontSize: data?.fontSize,
    fontWeight: data?.fontWeight,
    padding: data?.padding,
    border: data?.border,

    borderLeft: data?.borderLeft,
    borderRight: data?.borderRight,
    borderTop: data?.borderTop,
    borderBottom: data?.borderBottom,
    background: data?.background,
    borderRadius: unitUtil.sizeParse(data?.borderRadius),
  };
  return (
    <Container
      draggable={true}
      resize="both"
      {...{ ...props, children: undefined }}
      data={containerData}
      rawData={props.rawData}
    >
      <div ref={containerRef} style={{width: "100%",height: '100%', position: 'relative'}}>
        <MyInput value={data?.text} className={classNames(styles.wFull, styles.hFull)} style={omitBy(innerStyle, isNil)} />
        <div style={{position: "absolute", inset: 0, backgroundColor: 'transparent'}}></div>
      </div>
    </Container>
  );
};
