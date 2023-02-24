/* Task */
export type TTask = {
  id: number;
  name: string;
  source: TSource;
  pos: number;
};

export type TSource = { type: number; code: any };

/* Screen */
export type TScreenInfo = {
  id: number;
  name?: string;
  title: string;
  state: number;
};
export enum EnumScreenState {
  "CLOSED",
  "OPEN",
}
export type TScreen = { props: { info: TScreenInfo; windows: TWindow[] } };
export type TOpenScreen = (setScreens: any) => void;

/* Window */
export type TWindow = { title: string };

/* States */
export type TSetUpdate = (update: number) => void;
export type TSetTasks = (tasks: TTask[]) => void;
export type TSetScreens = (screens: TScreen[]) => void;
