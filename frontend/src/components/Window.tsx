import React, { FC } from "react";
import { TWindow } from "../types";

interface WindowProps {
}

export const Window: FC<WindowProps & TWindow> = ({ title }) => {
  return <div>{title}</div>;
};

export default Window;
