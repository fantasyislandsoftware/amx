function htmlToElement(html: string) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

export const createCanvasContext = (id: string) => {
  var canvas = document.createElement("canvas");
  canvas.style.cssText =
    "image-rendering: optimizeSpeed;" + // FireFox < 6.0
    "image-rendering: -moz-crisp-edges;" + // FireFox
    "image-rendering: -o-crisp-edges;" + // Opera
    "image-rendering: -webkit-crisp-edges;" + // Chrome
    "image-rendering: crisp-edges;" + // Chrome
    "image-rendering: -webkit-optimize-contrast;" + // Safari
    "image-rendering: pixelated; " + // Future browsers
    "-ms-interpolation-mode: nearest-neighbor;" +
    "font-smooth: never;" +
    "webkit-font-smoothing: none";

  let context = canvas.getContext("2d") as any;
  context.imageSmoothingEnabled = false;

  context.webkitImageSmoothingEnabled = false;
  context.mozImageSmoothingEnabled = false;
  context.msImageSmoothingEnabled = false;
  context.imageSmoothingEnabled = false;

  return context;
};

/*
imageRendering: "pixelated",
  fontSmooth: "never",
  WebkitFontSmoothing: "none",
  backgroundColor: "grey"
*/
