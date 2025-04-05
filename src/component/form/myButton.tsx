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
    border: '1px solid rgb(118, 118, 118)',
    borderRadius: 2,
    ...props.style,
  }

  return <button  className={props.className}  style={style} onClick={props.onClick}>{props.children}</button>;
}