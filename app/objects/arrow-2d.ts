import { Vec2, Vec2_T } from "./vec2";
import { Shape2d } from "./shape-2d";
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

    calculateArrowWidth(half_angle: number, length: number) {
        this.arrow_half_angle = half_angle;
        this.arrow_length = length;
        this.arrow_half_width = length * Math.tan(half_angle);
    };

    getArrowhead(A: Vec2_T, B: Vec2_T, width: number, height: number, closed = false) {
        let U = Vec2.subtract(B, A);
        let u_length = Vec2.length(U);
        let V = Vec2.perLeft(U);

        let h = Vec2.scale(U, this.arrow_length / u_length);
        let w = Vec2.scale(V, this.arrow_half_width / u_length);

        let v1 = Vec2.add(Vec2.subtract(B, h), w);        
        let v2 = Vec2.subtract(Vec2.subtract(B, h), w);

        let arrow = new Path2D();
        let p1 = Shape2d.toPixels(v1, width, height);
        let pb = Shape2d.toPixels(B, width, height);
        let p2 = Shape2d.toPixels(v2, width, height);

        arrow.moveTo(p1.x, p1.y);
        arrow.lineTo(pb.x, pb.y);
        arrow.lineTo(p2.x, p2.y);
        if (closed) {
            arrow.closePath();
        }
        return arrow;
    };
};