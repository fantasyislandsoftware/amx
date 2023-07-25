export type TTask = {
  id: number;
  codePointer: number;
  code: string[];    
  state: EnumTaskState;
  c? : boolean;
};

export enum EnumTaskState {
  Running,
  Stopped,
}
