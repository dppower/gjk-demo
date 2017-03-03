import { Vec2 } from "./vec2";

/**
 * Given a start and end position, returns a Path2D object that draws an arrow.
 */
export class Arrow2d {
    
    private arrow_half_angle: number;
    private arrow_length: number;
    private arrow_half_width: number;

    constructor(half_angle?: number, arrow_length?: number) {
        let angle = half_angle || Math.PI / 6;
        let length = arrow_length || 0.05;
        this.calculateArrowWidth(angle, length);
    };

    getPath(start_position: Vec2, end_position: Vec2, buffer_width: number, buffer_height: number) {
        let start_x = Math.trunc(start_position.x * buffer_width);
        let start_y = Math.trunc(start_position.y * buffer_height);
        let end_x = Math.trunc(end_position.x * buffer_width);
        let end_y = Math.trunc(end_position.y * buffer_height);

        let path = new Path2D();
        path.moveTo(start_x, start_y);
        path.lineTo(end_x, end_y);

        return path;
    };

    calculateArrowWidth(half_angle: number, length: number) {
        this.arrow_half_angle = half_angle;
        this.arrow_length = length;

        this.arrow_half_width = length * Math.tan(half_angle);
    };

    getArrowhead(A: Vec2, B: Vec2, buffer_width: number, buffer_height: number, closed = false) {
        let U = B.subtract(A);
        let u_length = U.length;
        let V = new Vec2(-U.y, U.x);

        let h = U.scale(this.arrow_length / u_length);
        let w = V.scale(this.arrow_half_width / u_length);

        let H = new Vec2(h.x * buffer_width, h.y * buffer_height);
        let W = new Vec2(w.x * buffer_width, w.y * buffer_height);

        let end = new Vec2(B.x * buffer_width, B.y * buffer_height);
        let v1 = end.subtract(H).add(W);        
        let v2 = end.subtract(H).subtract(W);

        let arrow = new Path2D();

        arrow.moveTo(Math.trunc(v1.x), Math.trunc(v1.y));
        arrow.lineTo(Math.trunc(end.x), Math.trunc(end.y));
        arrow.lineTo(Math.trunc(v2.x), Math.trunc(v2.y));
        if (closed) {
            arrow.lineTo(Math.trunc(v1.x), Math.trunc(v1.y));
        }

        return arrow;
    };
};