import React from "react";
import { FC } from "react";
import { IScreen } from "../../screenInterface";
import { canvasRenderStyle } from "../../style";

interface IProps {
  _ref: any;
  screen: IScreen;
  onMouseDown: (e: any) => void;
  onMouseUp: (e: any) => void;
  onMouseMove: (e: any) => void;
  onMouseLeave: (e: any) => void;
}

const ScreenDisplayBuffer: FC<IProps> = ({
  _ref,
  screen,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onMouseLeave,
}) => {
  const style = { width: "100%", height: `${screen.mode.height / 3}vw` };

  return (
    <canvas
      ref={_ref}
      width={screen.mode.width}
      height={screen.mode.height}
      style={{ ...style, ...canvasRenderStyle }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default ScreenDisplayBuffer;
