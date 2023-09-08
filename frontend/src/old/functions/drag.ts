export function dragElement(
  elmnt: any,
  enabled: boolean,
  callback: (top: number) => void
) {
  var pos2 = 0;
  var pos4 = 0;
  if (enabled) {
    if (document.getElementById(elmnt.id + "_draggable")) {
      document.getElementById(elmnt.id + "_draggable").onmousedown =
        dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }
  } else {
    elmnt.onmousedown = null;
  }

  function dragMouseDown(e: any) {
    e = e || window.event;
    e.preventDefault();
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  const elementDrag = (e: any) => {
    e = e || window.event;
    e.preventDefault();
    pos2 = pos4 - e.clientY;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    callback(elmnt.offsetTop - pos2);
  };

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };
}
