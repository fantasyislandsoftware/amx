import { EnumIntuitionGadgetType } from "./generic";

export type TTask = {
  id: number;
  parentId: number;
  codePointer: number;
  code: string[];
  params: string;
  state: EnumTaskState;
  objects: TOwnedComponent[];
  c?: boolean;
};

export type TOwnedComponent = {
  uniqueId: string;
  type: EnumIntuitionGadgetType;
};

export enum EnumTaskState {
  Running,
  Ended,
}
