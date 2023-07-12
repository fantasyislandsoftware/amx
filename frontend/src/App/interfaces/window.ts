import { EnumButtonState, TButton } from "./button";

export type TWindow = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  titleBar: {
    text: string;
    buttons: TButton[];
  };
  zOrder: number;
};
