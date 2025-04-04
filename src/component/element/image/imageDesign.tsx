import React from "react";
import {
  Container,
  ContainerModel,
  ComponentProps,
} from "../../common/containerDesign";

export interface ImageModel extends ContainerModel {
  type: "Image";
  src?: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
}

export interface ImageDesignProps extends ComponentProps {
  children?: undefined;
}
export const ImageDesign = (props: ImageDesignProps) => {
  const data = props.data as ImageModel;

  return (
    <Container
      draggable={true}
      resize="both"
      {...{ ...props, children: undefined }}
      data={props.data}
    >
      <img
        alt=""
        src={data.src}
        style={{ width: '100%', height: '100%', pointerEvents: 'none',  objectFit: data.objectFit }}
      />
    </Container>
  );
};
