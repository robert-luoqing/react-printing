import { useRef, useState } from "react";
import { DivContainerModel } from "../component/container/divContainer/divContainer";
import { Preview, PreviewRef } from "../component/preview";

export interface TestPreviewProps {
  layout: DivContainerModel;
}
export const TestPreview = (props: TestPreviewProps) => {
  const [testData] = useState<any>({
    saleId: "",
    companyId: "e5f1b585-243f-4709-87b6-fbb4a7e196e0",
    companyName: "阿里",
    operatorId: "edd9225e-6901-45aa-96e4-04a15709d1e7",
    operatorName: "李艳坤",
    warehouseId: "7e9524cb-7ec9-402b-927a-7219723e25fa",
    warehouseName: "深圳仓",
    shortDesc:
      "MF688-E彩屏, MF687-E彩屏 , MF680-E  蓝包（3000）彩屏, U6-G, U5-E, U6-EB28, U6-EW （包含DNXT）-U6-EW（包含DNXT）, U96-E（不分外壳颜色，含马来版）, M6-E(含DNXT和其他品牌), M80-5 灯 （8916）, 运费, 小天线（UFI使用的）",
    saleNo: "SO2024040300041",
    saleTime: "2024/04/03",
    memo: "橘子熟了209527    放清单，贴箱唛，再发货！  信丰寄付",
    totalCost: 0,
    totalAmount: "1,481.00",
    bindToBill: 0,
    bankAccountId: "",
    items: [
      {
        saleItemId: "b8a407e5-f662-426c-82dd-de8fd8dccdda",
        saleId: "",
        productId: "85937671-f867-4fb9-887a-d80b14b14fc4",
        productNo: "MF688-E彩屏",
        productName: "MF688-E彩屏",
        sortIndex: 0,
        quantity: 2,
        cost: 66,
        price: "78.00",
        memo: "MF688-E 2台（不带5G丝印 ）",
        subAmount: "156.00",
      },
      {
        saleItemId: "ae5a998e-d5c2-4999-bb6b-d345dadaec0f",
        saleId: "",
        productId: "44954459-4e0e-45d5-bb17-c1770e1ac44c",
        productNo: "MF687-E彩屏 ",
        productName: "MF687-E彩屏 ",
        sortIndex: 0,
        quantity: 2,
        cost: 65.841049,
        price: "78.00",
        memo: "MF687-E 2台（不带5G丝印 ）",
        subAmount: "156.00",
      },
      {
        saleItemId: "5aa15648-7133-414e-b188-98c8ec15a707",
        saleId: "",
        productId: "a84ec5d8-a0ed-4af6-8104-2135092cf0ab",
        productNo: "MF680-E  蓝包（3000）彩屏",
        productName: "MF680-E  蓝包（3000）彩屏",
        sortIndex: 0,
        quantity: 2,
        cost: 66,
        price: "78.00",
        memo: "MF680-E 2台（不带5G丝印 ）",
        subAmount: "156.00",
      },
      {
        saleItemId: "c94d11d4-48b0-4166-bd57-390aebafb666",
        saleId: "",
        productId: "3a78638d-fa45-4d71-a4ec-3cd5dca94202",
        productNo: "U6-G",
        productName: "U6-G",
        sortIndex: 0,
        quantity: 2,
        cost: 76.4493,
        price: "85.00",
        memo: "U6-G DNXT白 2台",
        subAmount: "170.00",
      },
      {
        saleItemId: "b99c4c8a-15f1-46e5-86b1-73f4d1469a51",
        saleId: "",
        productId: "3f4cdb8b-51d1-4bcf-a267-31989983b964",
        productNo: "U5-E",
        productName: "U5-E",
        sortIndex: 0,
        quantity: 2,
        cost: 67,
        price: "78.00",
        memo: "U5-E 白色 2台",
        subAmount: "156.00",
      },
      {
        saleItemId: "a5a79795-b970-41eb-b0f6-9da19b3d0ffe",
        saleId: "",
        productId: "c829a64d-b891-47f9-849a-4b33d6f75a47",
        productNo: "U6-EB28",
        productName: "U6-EB28",
        sortIndex: 0,
        quantity: 2,
        cost: 68.716792,
        price: "80.00",
        memo: "U6-E8 黑 2台",
        subAmount: "160.00",
      },
      {
        saleItemId: "fdedba5b-a571-4a6c-aee8-ad3e6fc98cca",
        saleId: "",
        productId: "791c586a-34c3-4341-948d-48ea3f693966",
        productNo: "U6-EW （包含DNXT）",
        productName: "U6-EW（包含DNXT）",
        sortIndex: 0,
        quantity: 2,
        cost: 66.8681,
        price: "80.00",
        memo: "U6-E W DNXT 2台",
        subAmount: "160.00",
      },
      {
        saleItemId: "aea9f5b4-dabd-4ccf-a672-bac8fe5a2fa8",
        saleId: "",
        productId: "d40c829d-2b2f-407e-afc3-236767e48bbb",
        productNo: "U96-E（不分外壳颜色，含马来版）",
        productName: "U96-E（不分外壳颜色，含马来版）",
        sortIndex: 0,
        quantity: 2,
        cost: 37.721597,
        price: "43.00",
        memo: "U96-E DNXT 2台",
        subAmount: "86.00",
      },
      {
        saleItemId: "2c9c23e5-7598-429b-a736-4445917da0b2",
        saleId: "",
        productId: "27d10b34-5558-47ff-94c1-0fd316c96abe",
        productNo: "M6-E(含DNXT和其他品牌)",
        productName: "M6-E(含DNXT和其他品牌)",
        sortIndex: 0,
        quantity: 2,
        cost: 31.995423,
        price: "65.00",
        memo: "M6-E DNXT 2台（不带5G丝印 ）",
        subAmount: "130.00",
      },
      {
        saleItemId: "a7b0cd14-4146-4a0d-bde0-7a982178a47c",
        saleId: "",
        productId: "7b28bf38-01e0-40b6-9e3d-4d91f265925a",
        productNo: "M80-5 灯 （8916）",
        productName: "M80-5 灯 （8916）",
        sortIndex: 0,
        quantity: 2,
        cost: 55.092556,
        price: "65.00",
        memo: "M80-5M 灯 2台",
        subAmount: "130.00",
      },
      {
        saleItemId: "9d2b27b2-6017-463e-bff2-2d9642c871f9",
        saleId: "",
        productId: "72a3b126-8085-4735-80a3-4bf4bc25b2bf",
        productNo: "运费",
        productName: "运费",
        sortIndex: 0,
        quantity: 1,
        cost: 0.044399,
        price: "15.00",
        memo: "",
        subAmount: "15.00",
      },
      {
        saleItemId: "d8f832fa-0be4-4520-8139-89c86189d1c4",
        saleId: "",
        productId: "78ee1aa0-d8ae-4ff3-9f14-e28263439c8e",
        productNo: "小天线（UFI使用的）",
        productName: "小天线（UFI使用的）",
        sortIndex: 0,
        quantity: 2,
        cost: 2.097282,
        price: "3.00",
        memo: "黑色天线",
        subAmount: "6.00",
      },
    ],
  });
  const [localFuncs] = useState({
    test: async (context: any, param: any) => {
      return new Promise<any>((fulfill) => {
        setTimeout(() => {
          fulfill({ order: { name: "test" + param.funcParam1 } });
        }, 1000);
      });
    },
  });
  const previewRef = useRef<PreviewRef>(null);
  const onPrint = () => {
    previewRef?.current?.print();
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
        {/* <div style={{ width: 0, height: 0, overflow: "auto" }}> */}
        <Preview
          ref={previewRef}
          layout={props.layout}
          data={testData}
          dataLoadPolicy="LoadOnce"
          localFuncs={localFuncs}
        />
        {/* </div> */}
      </div>
      <div style={{ textAlign: "center" }}>
        <button onClick={onPrint}>Print</button>
      </div>
    </div>
  );
};
