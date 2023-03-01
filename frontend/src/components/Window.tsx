import React, { FC, useEffect, useState } from "react";
import { TWindow } from "../types";

interface WindowProps {}

export const Window: FC<WindowProps & TWindow> = ({ props }) => {

  const position = { x: props.info.x, y: props.info.y };

  const [done, setDone] = useState(false);

  const id = `window_${props.info.id}`;

  function dragElement(elmnt: any) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "_header")) {
      // if present, the header is where you move the DIV from:
      // @ts-ignore
      document.getElementById(elmnt.id + "_header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: any) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  useEffect(() => {
    if (!done) {
      setDone(true);
    } else {
      dragElement(document.getElementById(id));
    }
  }, [done]);

  return (
    <div
      id={id}
      className="window_content"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div id={`${id}_header`} className="window_header">
        {'hello'}
      </div>
      {'content'}
    </div>
  );
};

export default Window;
