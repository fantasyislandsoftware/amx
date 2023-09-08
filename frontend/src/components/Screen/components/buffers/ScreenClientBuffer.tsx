import React, { FC, useEffect, useRef } from "react";
import { IScreen } from "../../screenInterface";
import { useScreenStore } from "../../useScreenStore";
import { canvasRenderStyle } from "../../style";

interface IProps {
  screen: IScreen;
}

const ScreenClientBuffer: FC<IProps> = ({ screen }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { screens, setScreens } = useScreenStore((state) => state);
  const style = { width: "100%", display: "none" };

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d");

      ctx.canvas.width = screen.mode.width;
      ctx.canvas.height = screen.mode.height;

      ctx.fillStyle = screen.palette[2];
      ctx.fillRect(0, 0, screen.mode.width, screen.mode.height);

      /* Update screen store */
      screens.map((_screen) => {
        if (_screen.id === screen.id) {
          _screen.clientContext = ctx;
        }
      });
      setScreens([...screens]);
    }
  },[]);

  return <canvas ref={ref} style={{ ...style, ...canvasRenderStyle }}></canvas>;
};

export default ScreenClientBuffer;
