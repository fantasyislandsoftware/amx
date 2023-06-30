import React, { FC } from "react";
import { TScreen } from "../interfaces/screen";
import { useMouseStore } from "../stores/useMouseStore";
import { useIntuitionStore } from "../stores/useIntuitionStore";

interface Props {
  ctx: any;
  screen: TScreen;
}

const MouseCursor: FC<Props> = ({ ctx, screen }) => {
  const { selectedScreen } = useIntuitionStore((state) => state);
  const { mouse } = useMouseStore((state) => state);
  const data = {
    width: 8,
    height: 8,
    pixels: [
      1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 1, 1, 1, 1, 0, 1,
      2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 1, 2, 1, 0, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2,
      1, 0, 0, 1, 2, 1, 1, 1, 0, 0, 0, 0, 1, 1,
    ],
  };
  const render = () => {
    if (selectedScreen === screen.id) {
      for (let y = 0; y < data.height; y++) {
        for (let x = 0; x < data.width; x++) {
          let pixel = data.pixels[y * data.width + x];
          if (pixel === 1) {
            ctx.fillStyle = "black";
          } else if (pixel === 2) {
            ctx.fillStyle = "red";
          } else {
            pixel = undefined;
          }
          pixel && ctx.fillRect(mouse.px + x, mouse.py + y, 1, 1);
        }
      }
    }
  };

  ctx && render();

  return <></>;
};

export default MouseCursor;
