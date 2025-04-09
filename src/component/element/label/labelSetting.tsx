import React from "react";
import { ContainerSetting } from "../../common/containerSetting";
import { LabelModel } from "./labelDesign";
import { TextSettingItem } from "../../common/items/textSettingItem";
import { SelectSettingItem } from "../../common/items/selectSettingItem";

export interface LabelSettingProps {
  data: LabelModel;
  onChange: (key: string, value: any) => void;
  onDelete: () => void;
}

export const LabelSetting = (props: LabelSettingProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <ContainerSetting
        data={props.data}
        onChange={props.onChange}
        onDelete={props.onDelete}
      >
        <TextSettingItem
          title="Text"
          tag="text"
          value={props.data.text}
          onChange={props.onChange}
        />

        <TextSettingItem
          title="Font Size"
          tag="fontSize"
          value={props.data.fontSize}
          onChange={props.onChange}
        />
        <TextSettingItem
          title="Font Weight"
          tag="fontWeight"
          value={props.data.fontWeight}
          onChange={props.onChange}
        />
        <TextSettingItem
          title="Line Height"
          tag="lineHeight"
          value={props.data.lineHeight}
          onChange={props.onChange}
        />
        <SelectSettingItem
          title="Vertical Align"
          tag="verticalAlign"
          value={props.data.verticalAlign}
          onChange={props.onChange}
          items={[
            { value: "top", label: "Top" },
            { value: "center", label: "Center" },
            { value: "bottom", label: "Bottom" },
          ]}
        />
        <SelectSettingItem
          title="Text Align"
          tag="textAlign"
          value={props.data.textAlign}
          onChange={props.onChange}
          items={[
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ]}
        />
      </ContainerSetting>
    </div>
  );
};
