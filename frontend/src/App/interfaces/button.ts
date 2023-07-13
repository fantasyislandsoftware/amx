import { TIcon } from "./icons";
import { EnumMessageAction } from "./message";

export type TButton = {
  text: string;
  action: EnumMessageAction;
  icon: TIcon;
  state: EnumButtonState;
};

export enum EnumButtonState {
  UP,
  DOWN,
}
