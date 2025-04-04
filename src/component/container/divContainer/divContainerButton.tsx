import React from "react";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export const DivContainerButton = () => {
  const onDragStart: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const data = {
        id: uuidv4(),
        type: "DivContainer",
        width: 200,
        height: 30,
        position: "absolute",
        children: [],
      };
      event.dataTransfer.setData("text/plain", JSON.stringify(data));
    },
    []
  );
  return (
    <div
      style={{textAlign: 'center', border: "1px solid gray", padding: '6px 0', cursor: 'pointer'}}
      draggable="true"
      onDragStart={onDragStart}
    >
      Div Container
    </div>
  );
};
