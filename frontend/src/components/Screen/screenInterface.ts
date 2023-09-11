export interface IScreenMode {
  width: number;
  height: number;
  bitDepth: number;
}

export interface ITitleBar {
  font: {
    size: number;
    name: string;
  };
  text: string;
  height?: number;
  icons: {
    order?: {
      zone: {
        x: number;
        y: number;
        w: number;
        h: number;
      };
      state: number;
    };
  };
}

export interface IScreen {
  id?: number;
  mode: IScreenMode;
  top?: number;
  titleBar?: ITitleBar;
  titleBarContext?: CanvasRenderingContext2D;
  clientContext?: CanvasRenderingContext2D;
  palette: string[];
  zIndex?: number;
}
