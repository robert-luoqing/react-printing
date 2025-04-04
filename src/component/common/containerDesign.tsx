import React, { useCallback, useEffect, useRef, useState } from "react";
import { PositionModel } from "../../models/positionModel";
import { positionUtil } from "../../utils/positionUtil";
import { unitUtil } from "../../utils/unitUtil";
import { isNil, omitBy } from "lodash";
import styles from '../style.module.css';
import classNames from "classnames";

export interface ContainerModel {
  id: string;
  type: string;
  children?: any[];
  width?: number | string;
  height?: number | string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  border?: string;
  borderLeft?: string;
  borderRight?: string;
  borderTop?: string;
  borderBottom?: string;
  borderRadius?: string | number;
  background?: string;
  position?: "absolute" | "static";
  display?: "block" | "inline-block";
  padding?: string;
  // If the prop is exist, the component will be collection
  forPath?: string;
  // If for path exist, the itemName is the name of item
  // Like react, we have array object users, the forPath is "users"
  // If the item name is "user", the child can be set value to {user.name}
  // like users.map(user => {....})
  forItemName?: string;
  /**
   * if condition，
   */
  if?: string;
  // disable drag and resize
  frozen?: boolean;

  // Only valid on design phase
  validOnDesign?: boolean;

  zIndex?: number;
}

export interface ComponentProps {
  children?: React.ReactNode;
  rawData: ContainerModel;
  data: ContainerModel;
  parentData?: ContainerModel;
  selected?: boolean;
  onClick?: (data: ContainerModel | undefined) => void;
  onSizeChanged?: (
    data: ContainerModel | undefined,
    size: {
      width: number | undefined;
      height: number | undefined;
    },
    parentData: ContainerModel | undefined
  ) => void;
  onDragStart?: (
    data: ContainerModel | undefined,
    position: PositionModel,
    parentData: ContainerModel | undefined
  ) => void;
  onDragEnd?: (
    data: ContainerModel | undefined,
    position: PositionModel,
    parentData: ContainerModel | undefined
  ) => void;
}

export interface ContainerProps extends ComponentProps {
  draggable?: boolean;
  resize?: "both" | "vertical" | "horizontal" | "none";
}

export const Container = (props: ContainerProps) => {
  const resizableRef = useRef<HTMLDivElement>(null);

  const isResizing = useRef(false);

  const widthRef = useRef<number | null>(null);
  const heightRef = useRef<number | null>(null);

  useEffect(() => {
    const element = resizableRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;

        widthRef.current = width;
        heightRef.current = height;
        if (isResizing.current) {
          props.onSizeChanged?.(
            props.rawData,
            {
              width:
                props.resize === "both" || props.resize === "horizontal"
                  ? width
                  : undefined,
              height:
                props.resize === "both" || props.resize === "vertical"
                  ? height
                  : undefined,
            },
            props.parentData
          );
        }
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [props]);

  const onHandleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = resizableRef.current;
    if (box) {
      const { offsetWidth, offsetHeight } = box;
      const resizeThreshold = 10; // 调整边缘的阈值

      if (
        e.nativeEvent.offsetX > offsetWidth - resizeThreshold && // 点击在右边缘
        e.nativeEvent.offsetY > offsetHeight - resizeThreshold // 点击在下边缘
      ) {
        console.log("Resize started!");
        isResizing.current = true;
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing.current) {
        console.log("Resizing...");
      }
    };

    const handleMouseUp = (event: any) => {
      if (isResizing.current) {
        console.log("Resize ended!");
        setTimeout(() => {
          isResizing.current = false;
        }, 0);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const onDragStart: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const target = event.currentTarget;
      const position = positionUtil.getPositionByElement(
        target,
        event.clientX,
        event.clientY
      );
      props.onDragStart?.(props.rawData, position, props.parentData);
      console.log("onDragStart", props.rawData?.id, JSON.stringify(position));
      event.dataTransfer.effectAllowed = "move";
      event.stopPropagation();

      setTimeout(() => {
        setIsDragging(true);
      }, 0);
    },
    [props]
  );

  const onDragEnd: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const target = event.currentTarget;
      const position = positionUtil.getPositionByElement(
        target,
        event.clientX,
        event.clientY
      );
      props.onDragEnd?.(props.rawData, position, props.parentData);
      console.log("onDragEnd", props.rawData?.id, JSON.stringify(position));

      setIsDragging(false);
    },
    [props]
  );

  const onDrag: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      // console.log("onDrag", event.clientX, event.clientY);
    },
    []
  );

  const onClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      if (!isResizing.current) {
        props.onClick?.(props.rawData);
      }
    },
    [props]
  );

  const innerStyle = {
    padding: props.data?.padding,
    border: props.data?.border,
    borderLeft: props.data?.borderLeft,
    borderRight: props.data?.borderRight,
    borderTop: props.data?.borderTop,
    borderBottom: props.data?.borderBottom,
    background: props.data?.background,
    borderRadius: unitUtil.sizeParse(props.data?.borderRadius),
  };

  return (
    <div
      ref={resizableRef}
      className={classNames(styles.resize, styles.overflowAuto)}
      draggable={props.data?.frozen ? undefined : props.draggable}
      onMouseDown={onHandleMouseDown}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{
        width: unitUtil.sizeParse(props.data?.width),
        height: unitUtil.sizeParse(props.data?.height),
        resize: props.data?.frozen ? "none" : props.resize,
        display: isDragging ? "none" : props.data?.display || "block",
        position: props.data?.position || "static",
        top: unitUtil.sizeParse(props.data?.top),
        left: unitUtil.sizeParse(props.data?.left),
        right: unitUtil.sizeParse(props.data?.right),
        bottom: unitUtil.sizeParse(props.data?.bottom),
        zIndex: props.data?.zIndex,
        minWidth: 15,
        minHeight: 15,
      }}
    >
      <div className={classNames(styles.wFull, styles.hFull, styles.relative, styles.overflowHidden)}>
        <div
          className={classNames(styles.wFull, styles.hFull, styles.relative, styles.overflowHidden)}
          style={omitBy(innerStyle, isNil)}
        >
          {props.children}
        </div>

        <div
          style={{ inset: 0, pointerEvents: 'none', position: 'absolute', background: props.selected ? '#00000010' : undefined, border: props.selected ? '2px dashed #777' : '0.6px dotted #666' }}

        ></div>
      </div>
    </div>
  );
};
