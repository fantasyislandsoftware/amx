var PNG = require("pngjs").PNG;
var Icon = require("../../lib/amigaIconConverter/icon.js");

export const icon2Png = (icon : any, stateIndex : any) => {

    stateIndex = stateIndex || 0;
    if (icon.colorIcon) {
        var w = icon.colorIcon.width;
        var h = icon.colorIcon.height;
        var state = icon.colorIcon.states[stateIndex];

        if (state) {
            var png = new PNG({ width: w, height: h });

            for (var y = 0; y < h; y++) {
                for (var x = 0; x < w; x++) {
                    var index = y * w + x;
                    var pixel = state.pixels[index];
                    if (state.rgba) {
                        var color = pixel;
                    } else {
                        color = state.palette[pixel] || [0, 0, 0, 0];
                    }
                    if (color.length < 4) color[3] = 1;
                    if (pixel === 0) color = [0, 0, 0, 0];

                    var idx = index << 2;

                    png.data[idx] = color[0];
                    png.data[idx + 1] = color[1];
                    png.data[idx + 2] = color[2];
                    png.data[idx + 3] = Math.ceil(color[3] * 255);
                }
            }

            return png;

        }
    } else {
        Icon.setPalette(icon, stateIndex);
        var img = stateIndex ? icon.img2 : icon.img;

        if (!img) return;

        var w = img.width;
        var h = img.height;
        var png = new PNG({ width: w, height: h });

        for (var y = 0; y < img.height; y++) {
            for (var x = 0; x < img.width; x++) {
                var index = y * w + x;
                var pixel = img.pixels[y][x];
                var color = img.palette[pixel] || [0, 0, 0, 0];
                if (color.length < 4) color[3] = 1;
                if (pixel === 0) color = [0, 0, 0, 0];
                var idx = index << 2;
                png.data[idx] = color[0];
                png.data[idx + 1] = color[1];
                png.data[idx + 2] = color[2];
                png.data[idx + 3] = Math.ceil(color[3] * 255);
            }
        }
    }
}

module.exports = {
    icon2Png
}