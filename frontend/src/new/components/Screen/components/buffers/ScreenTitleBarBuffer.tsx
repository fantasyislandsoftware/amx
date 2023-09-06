import { FC, useEffect, useRef, useState } from "react";
import { IScreen } from "../../screenInterface";
import React from "react";
import { canvasRenderStyle } from "../../style";

interface IProps {
  dstCtx: any;
  screen: IScreen;
  titleBarHeight: number;
  setTitleBarHeight: (height: number) => void;
}

const ScreenTitleBarBuffer: FC<IProps> = ({
  dstCtx,
  screen,
  titleBarHeight,
  setTitleBarHeight,
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [srcCtx, setSrcCtx] = useState<CanvasRenderingContext2D>(null);

  const style = { width: "100%", display: "none" };

  useEffect(() => {
    if (ref.current) {
      setSrcCtx(ref.current.getContext("2d"));
    }
    if (srcCtx) {
      srcCtx.font = `${screen.titleBar.font.size}px ${screen.titleBar.font.name}`;

      const metrics = srcCtx.measureText(screen.titleBar.text);

      const height = Math.floor(
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent * 2
      );
      setTitleBarHeight(height);

      if (titleBarHeight > 0) {
        srcCtx.fillStyle = "black";
        srcCtx.fillRect(0, 0, screen.mode.width, height);

        srcCtx.fillStyle = "white";
        srcCtx.fillText(
          screen.titleBar.text,
          0,
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        );
        dstCtx.drawImage(srcCtx.canvas, 0, 0);
      }
    }
  }, [ref, srcCtx, titleBarHeight]);

  return (
    <canvas
      ref={ref}
      width={screen.mode.width}
      height={titleBarHeight}
      style={{ ...style, ...canvasRenderStyle }}
    ></canvas>
  );
};

export default ScreenTitleBarBuffer;
