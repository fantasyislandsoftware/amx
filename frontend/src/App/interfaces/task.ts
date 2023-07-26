export type TTask = {
  id: number;
  parentId: number;
  codePointer: number;
  code: string[];
  params: string;
  state: EnumTaskState;
  c?: boolean;
};

export enum EnumTaskState {
  Running,
  Stopped,
}
