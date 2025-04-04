import React from "react";
import { ContainerModel } from "./containerDesign";
import { TextSettingItem } from "./items/textSettingItem";
import { ExpandSetting } from "./expandSetting";
import { CheckboxSettingItem } from "./items/checkboxSettingItem";
import { SelectSettingItem } from "./items/selectSettingItem";
import { MyButton } from "../form/myButton";

export interface ContainerSettingProps {
  data: ContainerModel;
  onChange: (key: string, value: any) => void;
  children?: React.ReactNode;
  onDelete: () => void;
}

export const ContainerSetting = (props: ContainerSettingProps) => {
  return (
    <div style={{display:'flex', flexDirection: 'column', gap: 2}}>
      <TextSettingItem
        title="Id"
        tag="id"
        value={props.data.id}
        onChange={props.onChange}
      />
      {props.children}
      <TextSettingItem
        title="Background"
        tag="background"
        value={props.data.background}
        onChange={props.onChange}
      />

      <ExpandSetting title="Border Setting">
        <div style={{borderBottom: '1px gray solid', paddingBottom: 6}}>
          <TextSettingItem
            title="Border"
            tag="border"
            value={props.data.border}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Border Top"
            tag="borderTop"
            value={props.data.borderTop}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Border Right"
            tag="borderRight"
            value={props.data.borderRight}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Border Bottom"
            tag="borderBottom"
            value={props.data.borderBottom}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Border Left"
            tag="borderLeft"
            value={props.data.borderLeft}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="Border Radius"
            tag="borderRadius"
            value={props.data.borderRadius}
            onChange={props.onChange}
          />
        </div>
      </ExpandSetting>
      <ExpandSetting title="Position Setting">
        <div style={{borderBottom: '1px gray solid', paddingBottom: 6}}>
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
          <SelectSettingItem
            title="Position"
            tag="position"
            value={props.data.position}
            onChange={props.onChange}
            items={[
              { value: "static", label: "Static" },
              { value: "absolute", label: "Absolute" },
            ]}
          />

          {props.data.position === "absolute" && (
            <div>
              <TextSettingItem
                title="Top"
                tag="top"
                value={props.data.top}
                onChange={props.onChange}
              />
              <TextSettingItem
                title="Right"
                tag="right"
                value={props.data.right}
                onChange={props.onChange}
              />
              <TextSettingItem
                title="Bottom"
                tag="bottom"
                value={props.data.bottom}
                onChange={props.onChange}
              />
              <TextSettingItem
                title="Left"
                tag="left"
                value={props.data.left}
                onChange={props.onChange}
              />
            </div>
          )}
          <SelectSettingItem
            title="Display"
            tag="display"
            value={props.data.display}
            onChange={props.onChange}
            items={[
              { value: "block", label: "Block" },
              { value: "inline-block", label: "Inline Block" },

            ]}
          />
          <TextSettingItem
            title="Padding"
            tag="padding"
            value={props.data.padding}
            onChange={props.onChange}
          />
        </div>
      </ExpandSetting>
      <ExpandSetting title="Control Setting">
        <div style={{ paddingBottom: 6}}>
          <TextSettingItem
            title="For Path"
            tag="forPath"
            value={props.data.forPath}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="For Item Name"
            tag="forItemName"
            value={props.data.forItemName}
            onChange={props.onChange}
          />
          <TextSettingItem
            title="If Condition"
            tag="if"
            value={props.data.if}
            onChange={props.onChange}
          />
        </div>
      </ExpandSetting>
      <TextSettingItem
        title="zIndex"
        tag="zIndex"
        value={props.data.zIndex}
        onChange={props.onChange}
      />
      <CheckboxSettingItem
        title="Frozen"
        tag="frozen"
        value={props.data.frozen}
        onChange={props.onChange}
      />
      <CheckboxSettingItem
        title="Valid On Design"
        tag="validOnDesign"
        value={props.data.validOnDesign}
        onChange={props.onChange}
      />
      <div>
        <MyButton style={{width: '100%'}} danger={true} onClick={props.onDelete}>
          Delete
        </MyButton>
      </div>
    </div>
  );
};
