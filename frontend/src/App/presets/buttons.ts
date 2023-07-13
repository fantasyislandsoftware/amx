import { closeIcon } from "../functions/vectorGfx/closeIcon";
import { orderIcon } from "../functions/vectorGfx/orderIcon";
import { EnumButtonState, TButton } from "../interfaces/button";
import { EnumMessageAction } from "../interfaces/message";

export class CloseButton {
  constructor() {}
  get(): TButton {
    return {
      text: "Close",
      action: EnumMessageAction.CLOSE,
      icon: closeIcon,
      state: EnumButtonState.UP,
    };
  }
}

export class OrderButton {
  constructor() {}
  get(): TButton {
    return {
      text: "Order",
      action: EnumMessageAction.ORDER,
      icon: orderIcon,
      state: EnumButtonState.UP,
    };
  }
}
