export type TCalcWindow = {
  titleBar: {
    text: string;
    height: number;
  };
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TCalcElements = {
  screen: {
    titleBar:
      | {
          text: string;
          fontSize: number;
          height: number;
        }
      | undefined;
    windows: TCalcWindow[];
    palette: string[];
  };
};
