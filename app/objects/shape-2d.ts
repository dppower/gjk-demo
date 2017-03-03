import { Vec2 } from "./vec2";
import { Polygon } from "./polygon";

export class Shape2d {
    /**
     * Create a Path2D to draw an axis alligned rectangle.
     */
    static drawRect(x: number, y: number, w: number, h: number) {
        let path = new Path2D();
        path.rect(x, y, w, h);
        return path;
    };

    /**
     * Create a Path2D to draw a quadrilaterial with given coordinates.
     */
    static drawQuad(a: Vec2, b: Vec2, c: Vec2, d: Vec2) {
        let path = new Path2D();
        path.moveTo(a.x, a.y);
        path.lineTo(b.x, b.y);
        path.lineTo(c.x, c.y);
        path.lineTo(d.x, d.y);
        path.lineTo(a.x, a.y);
        return path;
    };

    static drawPoint(p: Vec2, width: number, height: number) {
        let x = Math.trunc(0.5 * (p.x + 1) * width);
        let y = Math.trunc(0.5 * (1 - p.y) * height);
        let size = 4; 
        let path = new Path2D();
        path.rect(x, y, size, size);
        return path;
    };

    static *getCoordinatesInPixels(polygon: Polygon, width: number, height: number): IterableIterator<Vec2> {
        for (let vertex of polygon) {
            let x = Math.trunc(0.5 * (vertex.x + 1) * width);
            let y = Math.trunc(0.5 * (1 - vertex.y) * height);
            yield new Vec2(x, y);
        }
    };
};