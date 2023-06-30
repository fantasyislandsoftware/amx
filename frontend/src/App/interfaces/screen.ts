import { TWindow } from "./window";

export type TScreen = {
  type: EnumScreenType;
  id: number;
  mode: TypeScreenMode;
  numberOfColours: 8;
  palette: string[];
  titleBar: { text: string; fontSize: number; padding: number } | undefined;
  order: number;
  y: number;
  windows: TWindow[];
};

export enum EnumScreenType {
  INTUITION,
  BLITTER,
}

export enum EnumBitDepth {
  BIT_DEPTH_2,
  BIT_DEPTH_4,
  BIT_DEPTH_8,
  BIT_DEPTH_12,
  BIT_DEPTH_16,
  BIT_DEPTH_32,
}

export type TypeScreenMode = {
  width: number;
  height: number;
  bitDepth: number;
};

export enum EnumColorMax {
  COLOURS_2 = 2,
  COLOUR_4 = 4,
  COLOUR_8 = 8,
  COLOUR_16 = 16,
  COLOUR_32 = 32,
  COLOUR_64 = 64,
  COLOUR_256 = 256,
}

export const ScreenModeLowRes: TypeScreenMode = {
  width: 320,
  height: 240,
  bitDepth: EnumBitDepth.BIT_DEPTH_12,
};

export const ScreenModeHiRes: TypeScreenMode = {
  width: 640,
  height: 240,
  bitDepth: EnumBitDepth.BIT_DEPTH_12,
};

export type TScreenMessage = { screenId: number; key: string; value: any };
