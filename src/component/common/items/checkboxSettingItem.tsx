import React from "react";

import { useCallback } from "react";
import { MyCheckbox } from "../../form/myCheckbox";

export interface CheckboxSettingItemProps {
  title: string;
  tag: string;
  value: any;
  type?: string;
  onChange: (tag: string, value: any) => void;
}
export const CheckboxSettingItem = (props: CheckboxSettingItemProps) => {
  const onCheckboxChange = useCallback(
    (event: any) => {
      const value = event.target.checked;
      props.onChange(props.tag, value);
    },
    [props]
  );

  return (
    <div>
      <div style={{fontWeight: 700, fontSize: "10px"}}>{props.title}</div>
      <div>
        <MyCheckbox checked={props.value} onChange={onCheckboxChange} />
      </div>
    </div>
  );
};
