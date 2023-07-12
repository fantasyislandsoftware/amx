import { TIcon } from "./icons";

export type TButton = {
    name : string;
    text : string;
    icon : TIcon;
    state : EnumButtonState;
}

export enum EnumButtonState {
    UP,
    DOWN,
}