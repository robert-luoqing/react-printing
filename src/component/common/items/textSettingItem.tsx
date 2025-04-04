import React from "react";
import { useCallback } from "react";
import { MyInput } from "../../form/myInput";

export interface TextSettingItemProps {
  title: string;
  tag: string;
  value: any;
  type?: string;
  onChange: (tag: string, value: any) => void;
}
export const TextSettingItem = (props: TextSettingItemProps) => {
  const onTextChange = useCallback(
    (event: any) => {
      const value = event.target.value;
      props.onChange(props.tag, value);
    },
    [props]
  );
  return (
    <div>
      <div style={{fontWeight: 700, fontSize: "10px"}}>{props.title}</div>
      <div>
        <MyInput
          type={props.type || "text"}
          style={{width: '100%'}}
          value={props.value}
          onChange={onTextChange}
        />
      </div>
    </div>
  );
};
