import { TCalcButtonElement } from "../functions/calcElements/calcWindowElements";
import { TContext } from "./canvas";

export type TIcon = (
  ctx: TContext,
  palette: string[],
  buttonProps: TCalcButtonElement
) => void;
