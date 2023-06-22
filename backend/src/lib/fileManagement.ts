import { lstatSync, readFileSync } from "fs";
import { icon2Png } from "./amigaIconConverter/png";
var BinaryStream = require("./amigaIconConverter/file.js");
var Icon = require("./amigaIconConverter/icon.js");
var PNG = require("pngjs").PNG;

export const isDir = (path: string) => {
  try {
    var stat = lstatSync(path);
    return stat.isDirectory();
  } catch (e) {
    return false;
  }
};

export const parseInfoFile = async (path: string) => {
    const buffer = readFileSync(path, null);
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    var file = BinaryStream(ab, true);  
    var isIcon = Icon.detect(file);
    const icon = Icon.parse(file, (icon: any) => {});  
    var png = icon2Png(icon, 0);
    let imageBuffer = PNG.sync.write(png);
    return {imageBuffer : imageBuffer};
  };

module.exports = {
    isDir,
    parseInfoFile
}