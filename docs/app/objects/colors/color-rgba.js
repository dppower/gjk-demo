"use strict";
const color_keywords_1 = require("./color-keywords");
class ColorRGBA {
    constructor(r, g, b, a) {
        this.array = new Uint8ClampedArray(3);
        this.alpha = 0;
        this.array[0] = r;
        this.array[1] = g;
        this.array[2] = b;
        this.a = a;
    }
    get r() { return this.array[0]; }
    ;
    get g() { return this.array[1]; }
    ;
    get b() { return this.array[2]; }
    ;
    get a() { return this.alpha; }
    ;
    set a(opacity) {
        this.alpha = (opacity < 0) ? 0 : (opacity > 1) ? 1 : opacity;
    }
    ;
    get rgb() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    ;
    get rgba() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
    ;
    getTransparentColor(opacity) {
        let alpha = (opacity < 0) ? 0 : (opacity > 1) ? 1 : opacity;
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`;
    }
    ;
    get hex() {
        let byteToHex = (byte) => {
            if (byte <= 15) {
                return "0" + byte.toString(16);
            }
            else {
                return byte.toString(16);
            }
        };
        //let a = (alpha) ? Math.trunc(this.alpha * 255) : 255;
        return `#${byteToHex(this.r)}${byteToHex(this.g)}${byteToHex(this.b)}${byteToHex(255)}`;
    }
    ;
    ;
    static fromKeyword(keyword) {
        let hex = color_keywords_1.COLORS[keyword];
        if (hex) {
            return ColorRGBA.fromHex(hex);
        }
        else {
            return new ColorRGBA(255, 255, 255, 1);
        }
    }
    ;
    static fromHex(hex) {
        const valid_hex = /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?$/i;
        let matchs = hex.match(valid_hex);
        if (matchs) {
            let r = parseInt(matchs[1], 16);
            let g = parseInt(matchs[2], 16);
            let b = parseInt(matchs[3], 16);
            let a = (matchs[4]) ? parseInt(matchs[4], 16) : 1;
            return new ColorRGBA(r, g, b, 1);
        }
        else {
            return new ColorRGBA(255, 255, 255, 1);
        }
    }
    ;
}
exports.ColorRGBA = ColorRGBA;
;
