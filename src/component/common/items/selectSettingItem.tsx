import React from "react";
import { useCallback } from "react";
import { MySelect } from "../../form/mySelect";

export interface SelectSettingItemProps {
  title: string;
  tag: string;
  value: any;
  type?: string;
  onChange: (tag: string, value: any) => void;
  items: Array<{
    value: string;
    label: string;
  }>;

}
export const SelectSettingItem = (props: SelectSettingItemProps) => {
  const onSelectChange = useCallback(
    (value: any) => {
      props.onChange(props.tag, value);
    },
    [props]
  );

  return (
    <div>
      <div style={{fontWeight: 700, fontSize: "10px"}}>{props.title}</div>
      <div>
        <MySelect
          style={{width: '100%'}}
          value={props.value}
          onChange={onSelectChange}
          items= {props.items || []}
        />
         
      </div>
    </div>
  );
};
