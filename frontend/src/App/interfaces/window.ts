import { TButton } from "./button";

export type TWindow = {
  id: number;
  uniqueId: string;
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
