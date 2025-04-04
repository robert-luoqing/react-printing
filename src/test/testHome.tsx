import { useState } from "react";
import { DivContainerModel } from "../component/container/divContainer/divContainer";
import { Design } from "../component/design";
import { v4 as uuidv4 } from "uuid";
import { TestPreview } from "./testPreview";

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
    <div>{JSON.stringify(rootElement)}</div>
  </div>
}

