import { closeIcon } from "../functions/vectorGfx/closeIcon";
import { orderIcon } from "../functions/vectorGfx/orderIcon";
import { EnumButtonState } from "../interfaces/button";

export class CloseButton {
  constructor() {}
  get() {
    return {
      name: "close",
      text: "Close",
      icon: closeIcon,
      state: EnumButtonState.UP,
    };
  }
}

export class OrderButton {
  constructor() {}
  get() {
    return {
      name: "order",
      text: "Order",
      icon: orderIcon,
      state: EnumButtonState.UP,
    };
  }
}
