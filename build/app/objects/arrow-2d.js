"use strict";
const vec2_1 = require("./vec2");
const shape_2d_1 = require("./shape-2d");
/**
 * Given a start and end position, returns a Path2D object that draws an arrow.
 */
class Arrow2d {
    constructor(half_angle, arrow_length) {
        let angle = half_angle || Math.PI / 6;
        let length = arrow_length || 0.05;
        this.calculateArrowWidth(angle, length);
    }
    ;
    calculateArrowWidth(half_angle, length) {
        this.arrow_half_angle = half_angle;
        this.arrow_length = length;
        this.arrow_half_width = length * Math.tan(half_angle);
    }
    ;
    getArrowhead(A, B, width, height, closed = false) {
        let U = vec2_1.Vec2.subtract(B, A);
        let u_length = vec2_1.Vec2.length(U);
        let V = vec2_1.Vec2.perLeft(U);
        let h = vec2_1.Vec2.scale(U, this.arrow_length / u_length);
        let w = vec2_1.Vec2.scale(V, this.arrow_half_width / u_length);
        let v1 = vec2_1.Vec2.add(vec2_1.Vec2.subtract(B, h), w);
        let v2 = vec2_1.Vec2.subtract(vec2_1.Vec2.subtract(B, h), w);
        let arrow = new Path2D();
        let p1 = shape_2d_1.Shape2d.toPixels(v1, width, height);
        let pb = shape_2d_1.Shape2d.toPixels(B, width, height);
        let p2 = shape_2d_1.Shape2d.toPixels(v2, width, height);
        arrow.moveTo(p1.x, p1.y);
        arrow.lineTo(pb.x, pb.y);
        arrow.lineTo(p2.x, p2.y);
        if (closed) {
            arrow.closePath();
        }
        return arrow;
    }
    ;
}
exports.Arrow2d = Arrow2d;
;
//# sourceMappingURL=arrow-2d.js.map