import { EnumScreenState } from "../types";

export const openScreen = (setScreens : any) => {
    setScreens((screens: any) => [...screens, {
        props: {
          info: {
            id: 0,
            name: "wb",
            title: "Workbench",
            state: EnumScreenState.OPEN,
          },
          windows: [],
        },
      },]);
  };