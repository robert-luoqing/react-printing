# React Layout Printing


## Install 
```
npm i react-layout-printing
```

## Usage
- Design phase
```
export const TestHome = () => {
  const [rootElement, setRootElement] = useState<DivContainerModel>({
    id: uuidv4(),
    type: "DivContainer",
    width: 1200,
    height: 800,
    border: "1px solid gray",
    padding: "16px",
    children: [],
  });

  const [previewVisible, setPreviewVisible] = useState(false);
  const onLayoutChanged = (layout: DivContainerModel) => {
    setRootElement(layout);
  }

  return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: 1 }}>
      <Design onLayoutChanged={onLayoutChanged} layout={rootElement} />
    </div>
    <div style={{width: '100%', textAlign: 'center', padding: 20}}>
      <button onClick={() => setPreviewVisible(true)}>Show Preview</button>
    </div>
    {previewVisible && <div style={{ position: 'fixed', inset: 0, backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <TestPreview layout={rootElement} />
      </div>
      <div style={{ textAlign: 'center', padding: 20 }}>
        <button onClick={() => setPreviewVisible(false)}>Close</button>
      </div>
    </div>
    }
  </div>
}
```

- Preview Phase and Print
```
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
```