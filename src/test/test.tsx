import React from "react";
import { DivContainer } from "../component/container/divContainer/divContainer";

import { LabelDesign } from "../component/element/label/labelDesign";
import { LabelButton } from "../component/element/label/labelButton";
import { DivContainerButton } from "../component/container/divContainer/divContainerButton";
import { DivContainerSetting } from "../component/container/divContainer/divContainerSetting";
import { LabelSetting } from "../component/element/label/labelSetting";
import { DivContainerPreview } from "../component/container/divContainer/divContainerPreview";
import { LabelPreview } from "../component/element/label/labelPreview";
import {
  PreviewComponentProvider,
  registerPreviewComponents,
} from "../hoc/previewComponentHoc";
import {
  DesignComponentProvider,
  registerDesignComponents,
} from "../hoc/designComponentHoc";
import { FunctionProvider, registerFunctions } from "../hoc/functionHoc";
import { ImageSetting } from "../component/element/image/imageSetting";
import { ImagePreview } from "../component/element/image/imagePreview";
import { ImageButton } from "../component/element/image/imageButton";
import { ImageDesign } from "../component/element/image/imageDesign";
import { HorizontalLineDesign } from "../component/element/horizontalLine/horizontalLineDesign";
import { HorizontalLineSetting } from "../component/element/horizontalLine/horizontalLineSetting";
import { HorizontalLineButton } from "../component/element/horizontalLine/horizontalLineButton";
import { HorizontalLinePreview } from "../component/element/horizontalLine/horizontalLinePreview";
import { VerticalLineDesign } from "../component/element/verticalLine/verticalLineDesign";
import { VerticalLineSetting } from "../component/element/verticalLine/verticalLineSetting";
import { VerticalLinePreview } from "../component/element/verticalLine/verticalLinePreview";
import { VerticalLineButton } from "../component/element/verticalLine/verticalLineButton";
import { TestHome } from "./testHome";

function registerComponent(
  name: string,
  designComponent: any,
  settingComponent: any,
  previewComponent: any,
  buttonComponent: any
) {
  registerPreviewComponents([{ name, previewComponent }]);
  registerDesignComponents([
    { name, designComponent, settingComponent, buttonComponent },
  ]);
}

registerComponent(
  "DivContainer",
  DivContainer,
  DivContainerSetting,
  DivContainerPreview,
  DivContainerButton
);
registerComponent(
  "Label",
  LabelDesign,
  LabelSetting,
  LabelPreview,
  LabelButton
);

registerComponent(
  "Image",
  ImageDesign,
  ImageSetting,
  ImagePreview,
  ImageButton
);

registerComponent(
  "HorizontalLine",
  HorizontalLineDesign,
  HorizontalLineSetting,
  HorizontalLinePreview,
  HorizontalLineButton
);

registerComponent(
  "VerticalLine",
  VerticalLineDesign,
  VerticalLineSetting,
  VerticalLinePreview,
  VerticalLineButton
);


registerFunctions([
  {
    name: "test",
    func: async (context: any) => {
      return new Promise<void>((fulfill) => {
        console.log("-----test-----", context);
        setTimeout(() => {
          fulfill();
        }, 2000);
      });
    },
  },
]);

export const Test = () => {
  return (
    <DesignComponentProvider>
      <PreviewComponentProvider>
        <FunctionProvider>
          <div style={{width: '100%', height: '100%'}}>
            <TestHome />
          </div>
        </FunctionProvider>
      </PreviewComponentProvider>
    </DesignComponentProvider>
  );
};

