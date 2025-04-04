
import React, { useState } from "react";

export interface ExpandSettingProps {
  children?: React.ReactNode;
  title: string;
}

export const ExpandSetting = (props: ExpandSettingProps) => {
  const [expand, setExpand] = useState(false);

  return (
    <div style={{padding: '5px 0'}}>
      <div style={{display:'flex', flexDirection: 'row', borderBottom: '1px solid gray'}}>
        <div style={{flex: 1}}>{props.title}</div>
        <div onClick={() => setExpand(!expand)} style={{cursor: 'pointer'}}>
          {expand ? "-" : "+"}
        </div>
      </div>
      {expand && (
        <div  style={{borderBottom: '1px solid gray', paddingBottom: 6}}>
          {props.children}
        </div>
      )}
    </div>
  );
};
