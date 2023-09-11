import { TVectorGraphic } from "../../../../handlers/vectorGfx";

export const orderIcon = (state: number) => {
  return [
    /* background */
    {
      type: "rect",
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
      paletteIndex: 0,
    },
    /* border */
    {
      type: "rect",
      x1: 10,
      y1: 10,
      x2: 90,
      y2: 90,
      paletteIndex: 1,
    },
    /* Box 1 */
    {
      type: "rect",
      x1: 20,
      y1: 20,
      x2: 70,
      y2: 60,
      paletteIndex: 0,
    },
    /* Box 2 */
    {
      type: "rect",
      x1: 30,
      y1: 30,
      x2: 80,
      y2: 80,
      paletteIndex: 2,
    },
  ];
};
