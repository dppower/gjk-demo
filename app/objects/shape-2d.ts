import { Vec2, Vec2_T } from "./vec2";
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
     * Create a Path2D to draw a polygon with given coordinates.
     */
    static drawPolygon(polygon: Polygon | Vec2_T[], width: number, height: number, closed = true) {
        let path = new Path2D();
        let vertices = [...Shape2d.getVertices(polygon, width, height)];
        path.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 1; i < vertices.length; i++) {
            path.lineTo(vertices[i].x, vertices[i].y);
        }
        if (closed) {
            path.closePath();
        }
        return path;
    };

    static drawPoint(p: Vec2_T, width: number, height: number, size: 4 | 6 | 8 | 12) {
        let half = size / 2;
        let x = Math.trunc(0.5 * (p.x + 1) * width - half);
        let y = Math.trunc(0.5 * (1 - p.y) * height - half);
 
        let path = new Path2D();
        path.rect(x, y, size, size);
        return path;
    };

    static toPixels(vertex: Vec2_T, width: number, height: number) {
        let x = Math.trunc(0.5 * (vertex.x + 1) * width);
        let y = Math.trunc(0.5 * (1 - vertex.y) * height);
        return { x, y };
    };

    static * getVertices(polygon: Polygon | Vec2_T[], width: number, height: number): IterableIterator<Vec2_T> {
        for (let vertex of polygon) {
            yield Shape2d.toPixels(vertex, width, height);
        }
    };
};