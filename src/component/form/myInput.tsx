import { ChangeEventHandler, CSSProperties } from "react";

export interface MyInputProps {
  className?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>
  style?: CSSProperties;
  type?: string;
}

export const MyInput = (props: MyInputProps)=> {
  const style = {
    height: '28px',
    border: '1px solid rgb(118, 118, 118)',
    borderRadius: 2,
    ...props.style,
  }
  return <input value={props.value || ''} className={props.className} onChange={props.onChange} style={style} type={props.type} />;
}