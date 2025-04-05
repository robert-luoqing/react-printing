import React, { useEffect, useMemo, useState } from "react";
import { DivContainerModel } from "../component/container/divContainer/divContainer";
import { v4 as uuidv4 } from "uuid";
import { PositionModel } from "../models/positionModel";
import { ContainerModel } from "./common/containerDesign";
import { arrayUtil } from "../utils/arrayUtil";
import { useDesignComponents } from "../hoc/designComponentHoc";
import styles from "./style.module.css";
import { RootSetting } from "./rootSetting";

function replaceData(
  oldData: any,
  newData: any,
  parentData: any,
  rootElement: any
) {
  if (parentData) {
    for (let index = 0; index < parentData.children?.length; index++) {
      const item = parentData.children[index];
      if (item.id === oldData.id) {
        parentData.children[index] = newData;
        break;
      }
    }

    return { ...rootElement };
  } else {
    return newData;
  }
}

function getSelectedDataById(
  currElement: Partial<{ id: string; children?: any[] }>,
  id: string
): any | null {
  if (currElement) {
    if (currElement.id === id) {
      return currElement;
    }
    if (currElement.children) {
      for (const child of currElement.children) {
        const result = getSelectedDataById(child, id);
        if (result) {
          return result;
        }
      }
    }
  }

  return null;
}

export interface PrintingDesignProps {
  onLayoutChanged?: (layout: DivContainerModel) => void;
  layout?: DivContainerModel;
}

export const Design = (props: PrintingDesignProps) => {
  const { components: uiElements, componentsMap: uiElementsMap } =
    useDesignComponents();

  const [rootElement, setRootElement] = useState<DivContainerModel>({
    id: uuidv4(),
    type: "DivContainer",
    width: 1200,
    height: 800,
    border: "1px solid gray",
    padding: "16px",
    children: [],
  });
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [dragData, setDragData] = useState<{
    data: any;
    position: PositionModel;
    parentData: any;
  } | null>(null);

  useEffect(() => {
    if (props.layout) {
      if (props.layout !== rootElement) {
        setRootElement(props.layout);
      }
    }
  }, [props.layout, rootElement]);

  const onSizeChanged = (
    data: any,
    event: {
      width: number | undefined;
      height: number | undefined;
    },
    parentData: any
  ) => {
    const newSize: any = { ...(data.size || {}) };
    if (event.width !== undefined) {
      newSize.width = event.width;
    }
    if (event.height !== undefined) {
      newSize.height = event.height;
    }
    const newData = { ...data, ...newSize };
    const newRootElement = replaceData(data, newData, parentData, rootElement);
    setRootElement(newRootElement);
    props.onLayoutChanged?.(newRootElement);
  };

  const onClick = (data: any) => {
    // Only select one item in this time
    if (selectedItemIds.length > 0 && selectedItemIds[0] === data.id) {
      setSelectedItemIds([]);
    } else {
      if (data.id !== rootElement?.id) {
        setSelectedItemIds([data.id]);
      }
    }
  };

  const onDragStart = (data: any, position: PositionModel, parentData: any) => {
    setDragData({ position, data, parentData });
  };
  const onDragEnd = (data: any, position: PositionModel, parentData: any) => {
    setDragData(null);
  };
  const onDrop = (
    data: any,
    position: PositionModel,
    parentData: any,
    event: any
  ) => {
    if (dragData) {
      setDragData(null);
      if (dragData === data) {
        return;
      }

      const target = event.target;
      const paddingLeft = target.offsetLeft - target.clientLeft;
      const paddingTop = target.offsetTop - target.clientTop;

      const newX = position.self.x - dragData.position.self.x;
      const newY = position.self.y - dragData.position.self.y;
      const dragObj: ContainerModel = dragData.data;
      const dragParentObj: ContainerModel = dragData.parentData;
      const dropObj: ContainerModel = data;
      const newDragObj = { ...dragObj };

      if (dropObj.id === dragParentObj.id) {
        if (dragObj.position === "absolute") {
          dragObj.top = newY + paddingTop;
          dragObj.left = newX + paddingLeft;
          dragObj.bottom = undefined;
          dragObj.right = undefined;
        } else {
          arrayUtil.removeItemByFilter(
            dragParentObj?.children || [],
            (item: any) => dragObj.id === item.id
          );
          dropObj.children = [...(dropObj.children || []), newDragObj];
        }
      } else {
        arrayUtil.removeItemByFilter(
          dragParentObj?.children || [],
          (item: any) => dragObj.id === item.id
        );
        if (dragObj.position === "absolute") {
          newDragObj.top = newY + paddingTop;
          newDragObj.left = newX + paddingLeft;
          newDragObj.bottom = undefined;
          newDragObj.right = undefined;
          dropObj.children = [...(dropObj.children || []), newDragObj];
        } else {
          dropObj.children = [...(dropObj.children || []), newDragObj];
        }
      }

      const newRootElement = { ...rootElement };
      setRootElement(newRootElement);
      props.onLayoutChanged?.(newRootElement);
    } else {
      const droppedData = event.dataTransfer.getData("text/plain");
      if (droppedData) {
        const droppedObj = JSON.parse(droppedData);
        droppedObj.left = position.self.x;
        droppedObj.top = position.self.y;
        const dropObj: ContainerModel = data;
        dropObj.children = [...(dropObj.children || []), droppedObj];
        const newRootElement = { ...rootElement };
        setRootElement(newRootElement);
        props.onLayoutChanged?.(newRootElement);
        setSelectedItemIds([droppedObj.id]);
      }
    }
  };

  const renderByData = (data: any, parentData: any) => {
    if (!data) {
      return null;
    }
    const componentInfo = uiElementsMap[data.type];
    if (componentInfo) {
      const DesignComponent = componentInfo.designComponent;
      return (
        <DesignComponent
          key={data.id}
          data={data}
          rawData={data}
          parentData={parentData}
          selected={selectedItemIds.includes(data.id)}
          draggable={rootElement === data ? false : true}
          onSizeChanged={onSizeChanged}
          onClick={onClick}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
        >
          {data.children?.map((item: any) => renderByData(item, data))}
        </DesignComponent>
      );
    }

    return null;
  };

  const selectedData = useMemo(() => {
    if (!rootElement || selectedItemIds.length === 0) {
      return null;
    }
    return getSelectedDataById(rootElement, selectedItemIds[0]);
  }, [rootElement, selectedItemIds]);

  const onSelectedDataChanged = (key: string, value: any) => {
    selectedData[key] = value;
    const newRootElement = { ...rootElement };
    setRootElement(newRootElement);
    props.onLayoutChanged?.(newRootElement);
  };

  const onRootSettingChanged = (key: string, value: any) => {
    const newRootElement = {
      ...rootElement,
      [key]: value,
    };

    setRootElement(newRootElement);
    props.onLayoutChanged?.(newRootElement);
  };

  const removeFromId = (
    id: string,
    currElement: Partial<{
      id: string;
      children?: any[];
    }>
  ): boolean => {
    let removed = false;
    let newChildren: any[] | undefined = undefined;
    if (currElement.children) {
      newChildren = [];
      for (const child of currElement.children) {
        if (child?.id === id) {
          removed = true;
        } else {
          newChildren.push(child);
          if (!removed) {
            removed = removeFromId(id, child);
          }
        }
      }
    }
    currElement.children = newChildren;
    return removed;
  };

  const onComponentDeleted = () => {
    if (!rootElement || selectedItemIds.length === 0) {
      return null;
    }
    const id = selectedItemIds[0];
    removeFromId(id, rootElement);
    const newRootElement = { ...rootElement };
    setRootElement(newRootElement);
    props.onLayoutChanged?.(newRootElement);
  };

  const renderSetting = () => {
    if (!!selectedData && uiElementsMap[selectedData.type]) {
      const SettingComponent =
        uiElementsMap[selectedData.type].settingComponent;
      return (
        <SettingComponent
          data={selectedData}
          onChange={onSelectedDataChanged}
          onDelete={onComponentDeleted}
        />
      );
    } else {
      return <RootSetting data={rootElement} onChange={onRootSettingChanged} />;
    }
  };

  const renderButtons = () => {
    return uiElements.map((item) => (
      <div key={item.name}>
        <item.buttonComponent />
      </div>
    ));
  };

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className={styles.designContainer}
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
            width: "200px",
            height: "100%",
            borderRight: "1px solid gray",
            paddingTop: 28,
            paddingLeft: 16,
            paddingRight: 16,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {renderButtons()}
        </div>
        <div
          style={{
            flex: 1,
            width: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <div>{renderByData(rootElement, null)}</div>
        </div>
        <div
          style={{
            width: "300px",
            height: "100%",
            borderLeft: "1px solid gray",
            paddingTop: 28,
            paddingLeft: 16,
            paddingRight: 16,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            overflow: "auto",
          }}
        >
          <div>{renderSetting()}</div>
        </div>
      </div>
    </div>
  );
};
