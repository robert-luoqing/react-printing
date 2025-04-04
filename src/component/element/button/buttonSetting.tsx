import React from "react";
import { useCallback } from "react";
import { ContainerSetting } from "../../common/containerSetting";

import { ButtonDesignModel } from "./buttonDesign";
import { ExpandSetting } from "../../common/expandSetting";
import { TextSettingItem } from "../../common/items/textSettingItem";
import { CheckboxSettingItem } from "../../common/items/checkboxSettingItem";

export interface ButtonSettingProps {
  data: ButtonDesignModel;
  onChange: (key: string, value: any) => void;
  onDelete: () => void;
}

export const ButtonSetting = (props: ButtonSettingProps) => {
  const onTextChange = useCallback(
    (event: any) => {
      const value = event.target.value;
      const tag = event.target.getAttribute("data-tag");
      props.onChange(tag, value);
    },
    [props]
  );
  const onCheckboxChange = useCallback(
    (event: any) => {
      const value = event.target.checked;
      const tag = event.target["data-tag"];

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



        <ExpandSetting title="Click Setting">

          <TextSettingItem
            title="Function Name"
            tag="funcName"
            value={props.data.funcName}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Param1"
            tag="funcParam1"
            value={props.data.funcParam1}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Param2"
            tag="funcParam2"
            value={props.data.funcParam2}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Param3"
            tag="funcParam3"
            value={props.data.funcParam3}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Param4"
            tag="funcParam4"
            value={props.data.funcParam4}
            onChange={props.onChange}
          />

          <TextSettingItem
            title="Result Path"
            tag="resultPath"
            value={props.data.resultPath}
            onChange={props.onChange}
          />

          <CheckboxSettingItem
            title="Loading when click"
            tag="loadingWhenExec"
            value={props.data.loadingWhenExec}
            onChange={props.onChange}
          />


        </ExpandSetting>
      </ContainerSetting>
    </div>
  );
};
