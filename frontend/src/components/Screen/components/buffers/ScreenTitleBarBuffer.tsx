import { type FC, useEffect, useRef } from "react";
import { type IScreen } from "../../screenInterface";
import { canvasRenderStyle } from "../../style";
import { useScreenStore } from "../../useScreenStore";
import { TVectorZone, drawVectorGfx } from "../../../../handlers/vectorGfx";
import { orderIcon } from "../icons/orderIcon";
import { assigned } from "../../../../handlers/general";

interface IProps {
  screen: IScreen;
}

const ScreenTitleBarBuffer: FC<IProps> = ({ screen }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { screens, setScreens } = useScreenStore((state) => state);
  const style = { width: "100%", display: "none" };

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d");
      if (!ctx || !screen.titleBar) return;

      /* Set font and get metrics */
      ctx.font = `${screen.titleBar?.font.size}px ${screen.titleBar?.font.name}`;
      const metrics = ctx.measureText(screen.titleBar.text);
      const height =
        Math.floor(
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent * 2
        ) + 1;

      /* Set canvas dimensions dependant on font size and text */
      ctx.canvas.width = screen.mode.width;
      ctx.canvas.height = height;
      ctx.fillStyle = screen.palette[0];
      ctx.fillRect(0, 0, screen.mode.width, height);
      ctx.fillStyle = screen.palette[1];

      /* Draw text */
      ctx.fillText(
        screen.titleBar.text,
        0,
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
      );

      /* Draw Z-Order button */
      let orderIconZone: TVectorZone | undefined = undefined;
      if (screen.titleBar.height) {
        orderIconZone = {
          x: screen.mode.width - screen.titleBar.height,
          y: 0,
          w: screen.titleBar.height,
          h: screen.titleBar.height,
        };
        drawVectorGfx(ctx, orderIconZone, orderIcon(0), screen.palette);
      }

      /* Update screen store */
      screens.map((_screen) => {
        if (_screen.id === screen.id && _screen.titleBar) {
          _screen.titleBarContext = ctx;
          _screen.titleBar.height = height;
          if (orderIconZone && _screen.titleBar.icons.order) {
            _screen.titleBar.icons.order.zone = orderIconZone;
          }
        }
      });
      setScreens([...screens]);
    }
  }, []);

  return <canvas ref={ref} style={{ ...style, ...canvasRenderStyle }}></canvas>;
};

export default ScreenTitleBarBuffer;
