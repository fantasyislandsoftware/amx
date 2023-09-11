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
