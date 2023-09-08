export enum EnumMouseButton {
  UP,
  DOWN,
}

export type TMouse = {
  px: number;
  py: number;
  cx: number;
  cy: number;
  leftButton: EnumMouseButton;
};
