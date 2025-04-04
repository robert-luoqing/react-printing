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
    ...props.style,
  }
  return <input value={props.value} className={props.className} onChange={props.onChange} style={style} type={props.type} />;
}