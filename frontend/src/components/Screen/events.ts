import { getMouse } from "../../handlers/mouse";
import {
  EnumOSEventObjectType,
  type EnumOSEventType,
} from "../../interfaces/OSEvents";
import { type IScreen } from "./screenInterface";

export const evt = (
  event: any,
  processOSEvent: any,
  eventType: EnumOSEventType,
  screen: IScreen
) => {
  const mouse = getMouse(event, screen);
  /* Screen */
  processOSEvent({
    object: EnumOSEventObjectType.Screen,
    id: screen.id,
    type: eventType,
    mouse,
  });
  /* Titlebar */
  if (screen.titleBar?.height) {
    if (mouse.screen.y <= screen.titleBar.height - 1) {
      processOSEvent({
        object: EnumOSEventObjectType.Titlebar,
        type: eventType,
        mouse,
        parent: {
          object: EnumOSEventObjectType.Screen,
          id: screen.id,
        },
      });
    }
    /* Titlebar icons */
    /* Order */
    if (screen.titleBar.icons.order) {
      const { x, y, w, h } = screen.titleBar.icons.order.zone;
      if (
        mouse.screen.x >= x &&
        mouse.screen.y >= y &&
        mouse.screen.y <= x + w &&
        mouse.screen.y <= y + h
      ) {
        processOSEvent({
          object: EnumOSEventObjectType.Icon,
          type: eventType,
          mouse,
          parent: {
            object: EnumOSEventObjectType.Titlebar,
            id: screen.id,
          },
        });
      }
    }
    //console.log(screen.titleBar.icons);
    //if (screen.titleBar.icons?.order.zone) {
    //  console.log("order");
    //}
  }
  /* Client */
  if (screen.titleBar?.height) {
    if (mouse.screen.y > screen.titleBar.height - 1) {
      processOSEvent({
        object: EnumOSEventObjectType.Client,
        type: eventType,
        mouse,
        parent: {
          object: EnumOSEventObjectType.Screen,
          id: screen.id,
        },
      });
    }
  }
};
