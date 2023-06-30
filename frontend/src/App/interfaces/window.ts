export type TWindow = {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    titleBar: { text: string; fontSize: number, padding: number };
    zOrder: number;
  };