export const _12BitColour = (r: number, g: number, b: number) => {
  const _r = Math.floor(r * 17);
  const _g = Math.floor(g * 17);
  const _b = Math.floor(b * 17);
  const _rHex = _r.toString(16);
  const _gHex = _g.toString(16);
  const _bHex = _b.toString(16);
  const result = `#${_rHex}${_gHex}${_bHex}`;
  return result;
};
