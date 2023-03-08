/* Task */
export type TTask = {
  id: number;
  name: string;
  code: TCode;
};

export type TCode = {
  type: EnumCodeType;
  codePointer: number;
  script: { name: string; lines: string[] } | undefined;
};
export enum EnumCodeType {
  "SCRIPT",
  "MACHINE_CODE",
}
export type TScript = string[];

/* Screen */
export type TScreenInfo = {
  id: number;
  parentId: number;
  name?: string;
  title: string;
  state: number;
};
export enum EnumScreenState {
  "CLOSED",
  "OPEN",
}
export type TScreen = { props: { info: TScreenInfo } };
export type TOpenScreen = (parentId: number, setScreens: any) => void;

/* Window */
export type TWindowInfo = {
  id: number;
  parentId: number;
  name?: string;
  title: string;
  x: number;
  y: number;
  state: number;
  content: EnumWindowContent;
};
export enum EnumWindowState {
  "CLOSE",
  "OPEN",
}
export enum EnumWindowContent {
  "DEFAULT",
  "FILE_MANAGER",
}
export type TWindow = { props: { info: TWindowInfo } };
export type TOpenWindow = (setWindows: any) => void;

/* States */
export type TSetUpdate = (update: number) => void;
export type TSetTasks = (tasks: TTask[]) => void;
export type TSetScreens = (screens: TScreen[]) => void;
export type TSetWindows = (windows: TWindow[]) => void;

/* Function */
export enum EnumFuncName {
  openWBScreen = "openWBScreen",
  openWBWindow = "openWBWindow",
  jmp = "jmp",
}
