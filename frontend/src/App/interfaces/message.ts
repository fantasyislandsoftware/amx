export enum EnumMessageObj {
  SCREEN,
  WINDOW,
}

export enum EnumMessageAction {
  CLOSE,
  ORDER
}

export type TMessage = {
  id: number;
  parentId: number;
  obj: EnumMessageObj;
  action: EnumMessageAction;
};
