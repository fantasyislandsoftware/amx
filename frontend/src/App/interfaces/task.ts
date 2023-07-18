export type TTask = {
  id: number;
  codePointer: number;
  code: string[];
  state: EnumTaskState;
};

export enum EnumTaskState {
  Running,
  Stopped,
}
