import React from "react";
import { TextSettingItem } from "./common/items/textSettingItem";
import { DivContainerModel } from "./container/divContainer/divContainer";

export interface RootSettingProps {
  data: DivContainerModel;
  onChange: (key: string, value: any) => void;
}

export const RootSetting = (props: RootSettingProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div style={{padding: '10px 0', fontSize: 16, fontWeight: 700}}>Root Setting</div>
      <TextSettingItem
        title="Width"
        tag="width"
        value={props.data.width}
        onChange={props.onChange}
      />
      <TextSettingItem
        title="Height"
        tag="height"
        value={props.data.height}
        onChange={props.onChange}
      />
    </div>
  );
};
