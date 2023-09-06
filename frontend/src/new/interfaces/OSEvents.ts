export enum EnumOSEventObjectType {
  Screen = "screen",
  Window = "window",
  Titlebar = "titlebar",
  Client = "client",
}

export enum EnumOSEventType {
  MouseClick = "mouseclick",
  MouseDown = "mousedown",
  MouseUp = "mouseup",
  MouseMove = "mousemove",
  MouseLeave = "mouseleave",
}

export enum EnumMouseButton {
  Left = 0,
  Middle = 1,
  Right = 2,
}

export type IMouse = {
  client: {
    x: number;
    y: number;
  };
  screen: {
    x: number;
    y: number;
  };
  button: EnumMouseButton;
};

export type IOSEvent = {
  object: EnumOSEventObjectType;
  id?: number;
  type: EnumOSEventType;
  mouse?: IMouse;
  parent?: {
    object: EnumOSEventObjectType;
    id: number;
  };
};
