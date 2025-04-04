import React from "react";
import {
  Container,
  ComponentProps,
  ContainerModel,
} from "../../common/containerDesign";

export interface FetchServiceModel extends ContainerModel {
  type: "FetchService";
  url?: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  // Which data will be post if method is post
  postDataPath?: string;

  // show mask when fetching
  maskOnFetching?: boolean;
  // Which property will keep the fetch status, the property will be used in other element
  fetchStatusToPropPath?: string;
  // Which property will keep the data, the property will be used in other element
  dataToPropPath?: string;
  errorToPropPath?: string;

  fireFetchType: "onload" | "onchange";
  propPathOnChange?: string;
  onChangePolicy?: "fetchOnAll" | "fetchOnNonEmpty" | "fetchOnNonNil";
}

export interface FetchDesignProps extends ComponentProps {
  children?: undefined;
}
export const FetchDesign = (props: FetchDesignProps) => {
  return (
    <Container
      draggable={true}
      resize="none"
      {...{ ...props, children: undefined }}
      data={props.rawData}
      rawData={props.rawData}
    >
      <div  style={{width: '100%', height: '100%', position: 'relative', padding: 1}} >
        {/* <CloudDownloadOutlined /> */}
        <span>Icon</span>
        <div style={{position: "absolute", inset: 0, backgroundColor: 'transparent'}}></div>
      </div>
    </Container>
  );
};
