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
}

export interface IScreen {
  id: number;
  mode: IScreenMode;
  top: number;
  titleBar?: ITitleBar;
}
