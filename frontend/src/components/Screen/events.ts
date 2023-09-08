import { getMouse } from "../../handlers/mouseHandler";
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IMouse,
} from "../../interfaces/OSEvents";
import { IScreen } from "./screenInterface";

export const evt = (
  event: any,
  processOSEvent: any,
  eventType: EnumOSEventType,
  screen: IScreen,
) => {
  const mouse = getMouse(event, screen);
  /* Screen */
  processOSEvent({
    object: EnumOSEventObjectType.Screen,
    id: screen.id,
    type: eventType,
    mouse: mouse,
  });
  /* Titlebar & Client */
  processOSEvent({
    object:
      mouse.screen.y <= screen.titleBar.height - 1
        ? EnumOSEventObjectType.Titlebar
        : EnumOSEventObjectType.Client,
    type: eventType,
    mouse: mouse,
    parent: {
      object: EnumOSEventObjectType.Screen,
      id: screen.id,
    },
  });
};
