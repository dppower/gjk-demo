import { ColorKeywords, COLORS } from "./color-keywords";

export class ColorRGBA {
    get r() { return this.array[0]; };
    get g() { return this.array[1]; };
    get b() { return this.array[2]; };
    get a() { return this.alpha; };

    set a(opacity: number) {
        this.alpha = (opacity < 0) ? 0 : (opacity > 1) ? 1 : opacity;
    };

    get rgb() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    };

    get rgba() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    };

    getTransparentColor(opacity: number) {
        let alpha = (opacity < 0) ? 0 : (opacity > 1) ? 1 : opacity;
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`;
    };

    get hex() {
        let byteToHex = (byte: number) => {
            if (byte <= 15) {
                return  "0" + byte.toString(16);
            }
            else {
                return byte.toString(16);
            }
        };
        //let a = (alpha) ? Math.trunc(this.alpha * 255) : 255;
        return `#${byteToHex(this.r)}${byteToHex(this.g)}${byteToHex(this.b)}${byteToHex(255)}`;
    };

    private array = new Uint8ClampedArray(3);
    private alpha = 0;

    constructor(r, g, b, a) {
        this.array[0] = r;
        this.array[1] = g;
        this.array[2] = b;
        this.a = a;
    };

    static fromKeyword(keyword: keyof ColorKeywords) {      
        let hex = COLORS[keyword];
        if (hex) {
            return ColorRGBA.fromHex(hex);
        }
        else {
            return new ColorRGBA(255, 255, 255, 1);
        }
    };

    static fromHex(hex: string) {
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
    };
};