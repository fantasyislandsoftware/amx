export function getMousePosition(evt: any) {
  return toPoint(evt.clientX, evt.clientY);
}

export function getScale(evt: any) {
  const scale = evt.target.value;
  const textContent = scale;
  return textContent;
}

export function toCanvasCoords(
  canvas: any,
  pageX: number,
  pageY: number,
  scale: number
) {
  var rect = canvas.getBoundingClientRect();
  let x = (pageX - rect.left) / scale;
  let y = (pageY - rect.top) / scale;
  return toPoint(x, y);
}

export function toScreenCoords(canvas: any, x: number, y: number, scale: number) {
  var rect = canvas.getBoundingClientRect();
  let wx = x * scale + rect.left;
  let wy = y * scale + rect.top;
  return toPoint(wx, wy);
}

export function toPoint(x: number, y: number) {
  return { x: x, y: y };
}

export function roundPoint(point: any) {
  return {
    x: Math.round(point.x),
    y: Math.round(point.y),
  };
}
