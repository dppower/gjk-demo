import { Vec2 } from "./vec2";
import { ColorRGBA } from "./colors/color-rgba";
import { InputManager } from "./input-manager";

export abstract class Polygon implements Iterable<Vec2> {

    get index() { return this.index_; };
    get color() { return this.color_; };

    protected vertices: Vec2[];

    constructor(private count_: number, private color_: ColorRGBA, private index_: number) { };

    getSupport(dir: Vec2) {
        let index = 0;
        let max = this.vertices[0].dot(dir);
        for (let i = 1; i < this.count_; i++)
        {
            let dp = this.vertices[i].dot(dir);
            if (dp > max) {
                index = i;
                max = dp;
            }
        }
        return this.vertices[index];
    };

    abstract updatePolygon(dt: number, inputs: InputManager);

    abstract drawShape(buffer_width: number, buffer_height: number);

    *genCoordinates(): IterableIterator<Vec2> {
        yield* this.vertices;
    };

    [Symbol.iterator] = this.genCoordinates;
};