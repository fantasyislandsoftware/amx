export const loadFonts = async () => {
  var amigaFont = new FontFace(
    "amiga",
    "url(../fonts/AmigaTopazUnicodeRus.ttf)"
  );
  const font = await amigaFont.load();

  if (font.status === "loaded") {
    //@ts-ignore
    document.fonts.add(font);
  }
};
