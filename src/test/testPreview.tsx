import { useRef, useState } from "react";
import { DivContainerModel } from "../component/container/divContainer/divContainer"
import { Preview, PreviewRef } from "../component/preview"


export interface TestPreviewProps {
  layout: DivContainerModel
}
export const TestPreview = (props: TestPreviewProps) => {
  const [testData] = useState<any>({
    userName: "robert",
    users: [{ name: "Robert" }, { name: "Chris" }],
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
  const onPrint = ()=> {
    previewRef?.current?.print();
  }
  return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{flex: 1}}>
      <Preview 
        ref={previewRef}
        layout={props.layout}
        data={testData}
        dataLoadPolicy="LoadOnce"
        localFuncs={localFuncs} />
    </div>
    <div style={{textAlign: 'center'}}>
      <button onClick={onPrint}>Print</button>
    </div>
  </div>

}