import { CSSProperties, MouseEventHandler } from "react";

export interface MyButtonProps {
  className?: string;
  style?: CSSProperties;
  type?: string;
  children?: React.ReactNode;
  danger?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
}

export const MyButton = (props: MyButtonProps)=> {
  const style = {
    height: '34px',
    ...props.style,
  }
  return <button  className={props.className}  style={style} onClick={props.onClick}>{props.children}</button>;
}