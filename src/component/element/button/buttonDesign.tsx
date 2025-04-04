import React from "react";
import {
  Container,
  ContainerModel,
  ComponentProps,
} from "../../common/containerDesign";
import { unitUtil } from "../../../utils/unitUtil";
import { isNil, omitBy } from "lodash";
import { MyButton } from "../../form/myButton";
import styles from '../../style.module.css'
import classNames from "classnames";

export interface FuncModel {
  funcName?: string;
  funcParam1?: string;
  funcParam2?: string;
  funcParam3?: string;
  funcParam4?: string;
  resultPath?: string;
}

export interface ButtonDesignModel extends ContainerModel, FuncModel {
  type: "Button";
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  loadingWhenExec?: boolean;
}

export interface ButtonDesignProps extends ComponentProps {
  children?: undefined;
}
export const ButtonDesign = (props: ButtonDesignProps) => {
  const data = props.data as ButtonDesignModel;
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
      <div style={{width: '100%', height: '100%', position: 'relative'}}>
        <MyButton className={classNames(styles.wFull, styles.hFull)} style={omitBy(innerStyle, isNil)}>
          {data?.text}
        </MyButton>
        <div style={{position: 'absolute', inset: 0, backgroundColor: 'transparent'}}></div>
      </div>
    </Container>
  );
};
