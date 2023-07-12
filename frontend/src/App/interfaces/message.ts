export enum EnumMessageObj {
  SCREEN,
  WINDOW,
}

export enum EnumMessageAction {
  CLOSE,
}

export type TMessage = {
  id: number;
  parentId: number;
  obj: EnumMessageObj;
  action: EnumMessageAction;
};
