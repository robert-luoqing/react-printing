import { useState } from "react";
import { DivContainerModel } from "../component/container/divContainer/divContainer";
import { Design } from "../component/design";
import { v4 as uuidv4 } from "uuid";
import { TestPreview } from "./testPreview";

export const TestHome = () => {
  const [rootElement, setRootElement] = useState<DivContainerModel>({
    id: "root",
    type: "DivContainer",
    width: 595,
    height: 786,
    border: "1px solid gray",
    padding: "16px",
    children: [
      {
        id: "b0955086-4a0a-48e9-9193-e5f5218af44f",
        type: "Label",
        position: "absolute",
        text: "销 售 单",
        display: "inline-block",
        padding: "2px",
        children: [],
        left: 228.5,
        top: 16.5,
        fontSize: "30px",
        fontWeight: "700",
      },
      {
        id: "dfb72882-a19d-4e89-9fcd-40ea184684c2",
        type: "Label",
        position: "absolute",
        text: "公司: {companyName}",
        display: "inline-block",
        padding: "2px",
        children: [],
        left: 8.5,
        top: 93.5,
      },
      {
        id: "fc915750-8f71-4ad6-a795-3d447960481d",
        type: "Label",
        position: "absolute",
        text: "单号: {saleNo}",
        display: "inline-block",
        padding: "2px",
        children: [],
        left: 400.5,
        top: 93.5,
        width: 184,
        height: 27,
        textAlign: "right",
      },
      {
        id: "f684800f-61fa-487f-9c92-57e5d01aafd3",
        type: "DivContainer",
        width: "580",
        height: 475,
        position: "absolute",
        children: [
          {
            id: "b5863a8d-873c-4bab-98df-ad5cc79806f2",
            type: "DivContainer",
            width: "",
            height: "40",
            position: "static",
            children: [
              {
                id: "61d3e08b-aa0a-411b-9413-82c2d885cab4",
                type: "Label",
                position: "absolute",
                text: "{item.productName}",
                display: "inline-block",
                padding: "2px",
                children: [],
                left: 8,
                top: 9,
              },
              {
                id: "b3b7add1-ebf2-453f-ab9a-d3177cceda8e",
                type: "Label",
                position: "absolute",
                text: "{item.quantity}",
                display: "inline-block",
                padding: "2px",
                children: [],
                left: 162,
                top: 10,
                width: 109,
                height: 26,
                textAlign: "center",
              },
              {
                id: "89582e94-f602-4fec-ac26-d591d67f8e08",
                type: "Label",
                position: "absolute",
                text: "{item.price}",
                display: "inline-block",
                padding: "2px",
                children: [],
                left: 289,
                top: 9,
                width: 88,
                height: 25,
                textAlign: "right",
              },
              {
                id: "cc3daad2-9fba-4c3d-b12b-8a3789c3309f",
                type: "Label",
                position: "absolute",
                text: "{item.memo}",
                display: "inline-block",
                padding: "2px",
                children: [],
                left: 388,
                top: 8,
                width: 172,
                height: 26,
              },
              {
                id: "7adece6f-fa0f-4cc2-b9d7-0869e6b2ce1b",
                type: "VerticalLine",
                position: "absolute",
                display: "block",
                height: 100,
                width: 15,
                children: [],
                left: "160",
                top: "0",
              },
              {
                id: "27f37bf9-f982-4f87-8bb3-c7e3fe855747",
                type: "VerticalLine",
                position: "absolute",
                display: "block",
                height: 100,
                width: 15,
                children: [],
                left: "270",
                top: "0",
              },
              {
                id: "b71f9f9b-0f2b-4910-bf50-e47cc7519190",
                type: "VerticalLine",
                position: "absolute",
                display: "block",
                height: 100,
                width: 15,
                children: [],
                left: "380",
                top: "0",
              },
            ],
            left: 36,
            top: 16,
            forPath: "items",
            forItemName: "item",
            border: "",
            borderRight: "1px solid gray",
            borderBottom: "1px solid gray",
            borderLeft: "1px solid gray",
          },
        ],
        left: "6",
        top: "150",
      },
      {
        id: "9483cf5c-c98e-44ab-8218-4da6600a3179",
        type: "DivContainer",
        width: "580",
        height: 32,
        position: "absolute",
        children: [
          {
            id: "4fcbdefe-9fa5-4619-83ef-4741211fe464",
            type: "Label",
            position: "absolute",
            text: "产品名",
            display: "inline-block",
            padding: "2px",
            children: [],
            left: 9.5,
            top: 3,
          },
          {
            id: "e02f6820-2960-4c24-ab62-9a864674b0d6",
            type: "Label",
            position: "absolute",
            text: "数量",
            display: "inline-block",
            padding: "2px",
            children: [],
            left: 162.5,
            top: 2,
            width: 109,
            height: 26,
            textAlign: "center",
          },
          {
            id: "c8c0360a-48db-422e-b401-c6baca4484bf",
            type: "Label",
            position: "absolute",
            text: "单价",
            display: "inline-block",
            padding: "2px",
            children: [],
            left: 289.5,
            top: 2,
            width: 86,
            height: 25,
            textAlign: "right",
          },
          {
            id: "a5f4ee69-7495-4327-aa4f-c31cdc29ad21",
            type: "Label",
            position: "absolute",
            text: "说明",
            display: "inline-block",
            padding: "2px",
            children: [],
            left: 389.5,
            top: 2,
            width: 102,
            height: 26,
          },
          {
            id: "e510fdf3-acce-4f47-b07a-a6772ca08711",
            type: "VerticalLine",
            position: "absolute",
            display: "block",
            height: 100,
            width: 15,
            children: [],
            left: "160",
            top: "0",
          },
          {
            id: "170c044b-b1a6-488b-86cb-e395db7a1460",
            type: "VerticalLine",
            position: "absolute",
            display: "block",
            height: 100,
            width: 15,
            children: [],
            left: "270",
            top: "0",
          },
          {
            id: "b0beb043-3aa6-4fcf-b3ea-11f35d975b38",
            type: "VerticalLine",
            position: "absolute",
            display: "block",
            height: 100,
            width: 15,
            children: [],
            left: "380",
            top: "0",
          },
        ],
        left: "6",
        top: "120",
        border: "1px solid gray",
      },
    ],
  });

  const [previewVisible, setPreviewVisible] = useState(false);
  const onLayoutChanged = (layout: DivContainerModel) => {
    setRootElement(layout);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1 }}>
        <Design onLayoutChanged={onLayoutChanged} layout={rootElement} />
      </div>
      <div style={{ width: "100%", textAlign: "center", padding: 20 }}>
        <button onClick={() => setPreviewVisible(true)}>Show Preview</button>
      </div>
      {previewVisible && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1 }}>
            <TestPreview layout={rootElement} />
          </div>
          <div style={{ textAlign: "center", padding: 20 }}>
            <button onClick={() => setPreviewVisible(false)}>Close</button>
          </div>
        </div>
      )}
      {/* <div>{JSON.stringify(rootElement)}</div> */}
    </div>
  );
};
