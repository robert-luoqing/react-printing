import React from "react";
import { useCallback } from "react";
import { ContainerSetting } from "../../common/containerSetting";
import { InputModel } from "./inputDesign";
import { TextSettingItem } from "../../common/items/textSettingItem";

export interface InputSettingProps {
  data: InputModel;
  onChange: (key: string, value: any) => void;
  onDelete: () => void;
}

export const InputSetting = (props: InputSettingProps) => {
  const onTextChange = useCallback(
    (event: any) => {
      const value = event.target.value;
      const tag = event.target.getAttribute("data-tag");
      props.onChange(tag, value);
    },
    [props]
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <ContainerSetting
        data={props.data}
        onChange={props.onChange}
        onDelete={props.onDelete}
      >

        <TextSettingItem
          title="Type"
          tag="rawType"
          value={props.data.rawType}
          onChange={props.onChange}
        />

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

      </ContainerSetting>
    </div>
  );
};
