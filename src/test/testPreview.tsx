import { useRef, useState } from "react";
import { DivContainerModel } from "../component/container/divContainer/divContainer";
import { Preview, PreviewRef } from "../component/preview";

export interface TestPreviewProps {
  layout: DivContainerModel;
}
export const TestPreview = (props: TestPreviewProps) => {
  const [testData] = useState<any>({
    saleId: "8aff35f4-be91-4012-b9cc-90462648f267",
    companyId: "b4117d0d-b5d5-4bac-967e-b88fa61a04ec",
    companyName: "吉利通",
    operatorId: "edd9225e-6901-45aa-96e4-04a15709d1e7",
    operatorName: "李艳坤",
    warehouseId: "7e9524cb-7ec9-402b-927a-7219723e25fa",
    warehouseName: "深圳仓",
    shortDesc: "MF800-5(黑）, MF800-5(黑）, U96-3M（灰边白、黑）",
    saleNo: "SO2024040300021",
    saleTime: 1712107809261,
    totalCost: 97529.4,
    totalAmount: 105000,
    checkAmount: 0,
    memo: "吉利通    唛头：入仓号 240142664 + Julie  ，MIFI需要贴电池+防爆标",
    createdBy: "liyankun",
    updatedBy: "liyankun",
    createdAt: 1712117261256,
    updatedAt: 1712117261256,
    bindToBill: 0,
    bankAccountId: "",
    items: [
      {
        saleItemId: "9cf0851a-99c8-4334-b0c3-5448b497a23e",
        saleId: "8aff35f4-be91-4012-b9cc-90462648f267",
        sortIndex: 0,
        productId: "a281c1ff-2cc4-43f2-9271-4a13d827ddf2",
        productNo: "MF800-5(黑）",
        productName: "MF800-5(黑）",
        cost: 46.008596,
        quantity: 800,
        price: 50,
        subCheckAmount: 0,
        memo: "MF800-5黑色定制AUSHA*  800个",
        warehouseId: "7e9524cb-7ec9-402b-927a-7219723e25fa",
      },
      {
        saleItemId: "120e0976-e5fe-4de8-b832-4ca142ef43f5",
        saleId: "8aff35f4-be91-4012-b9cc-90462648f267",
        sortIndex: 1,
        productId: "a281c1ff-2cc4-43f2-9271-4a13d827ddf2",
        productNo: "MF800-5(黑）",
        productName: "MF800-5(黑）",
        cost: 46.008596,
        quantity: 700,
        price: 50,
        subCheckAmount: 0,
        memo: "MF800-5黑色定制电池标*  700个",
        warehouseId: "7e9524cb-7ec9-402b-927a-7219723e25fa",
      },
      {
        saleItemId: "8b47b989-aef0-4c5c-9b37-6defb68dc190",
        saleId: "8aff35f4-be91-4012-b9cc-90462648f267",
        sortIndex: 2,
        productId: "0c4eb873-f1d3-4ea2-b9c3-e48d370999e3",
        productNo: "U96-3M（灰边白、黑）",
        productName: "U96-3M（灰边白、黑）",
        cost: 28.516534,
        quantity: 1000,
        price: 30,
        subCheckAmount: 0,
        memo: "U96-3灰边 定制AUSHA*1000个",
        warehouseId: "7e9524cb-7ec9-402b-927a-7219723e25fa",
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
        <Preview
          ref={previewRef}
          layout={props.layout}
          data={testData}
          dataLoadPolicy="LoadOnce"
          localFuncs={localFuncs}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <button onClick={onPrint}>Print</button>
      </div>
    </div>
  );
};
