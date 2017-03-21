"use strict";
class Vec2 {
    constructor(vec = Vec2.ZERO) {
        this.vector_ = new Float32Array([vec.x, vec.y]);
    }
    get x() { return this.vector_[0]; }
    ;
    get y() { return this.vector_[1]; }
    ;
    get array() { return this.vector_; }
    ;
    get object() {
        return { x: this.x, y: this.y };
    }
    ;
    get magnitude() {
        return Math.sqrt(this.squared_length);
    }
    ;
    get squared_length() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }
    ;
    set x(value) { this.vector_[0] = value; }
    ;
    set y(value) { this.vector_[1] = value; }
    ;
    ;
    static fromArray(array) {
        return new Vec2({
            x: array[0] || 0,
            y: array[1] || 0
        });
    }
    ;
    static length(a) {
        return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
    }
    ;
    static squaredLength(a) {
        return Math.pow(a.x, 2) + Math.pow(a.y, 2);
    }
    ;
    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    ;
    // Gives the signed area of a parellogram
    static cross(a, b) {
        return (a.x * b.y) - (a.y * b.x);
    }
    ;
    static normalise(a, out) {
        let length = Vec2.length(a);
        if (length > 0) {
            let factor = 1.0 / length;
            return Vec2.scale(a, factor, out);
        }
        else {
            if (out) {
                out.reset();
            }
            return { x: 0, y: 0 };
        }
    }
    ;
    static add(a, b, out) {
        let sum = {
            x: a.x + b.x,
            y: a.y + b.y
        };
        if (out) {
            out.copy(sum);
        }
        return sum;
    }
    ;
    static subtract(a, b, out) {
        let diff = {
            x: a.x - b.x,
            y: a.y - b.y
        };
        if (out) {
            out.copy(diff);
        }
        return diff;
    }
    ;
    static scale(a, scalar, out) {
        let scaled = {
            x: a.x * scalar,
            y: a.y * scalar
        };
        if (out) {
            out.copy(scaled);
        }
        return scaled;
    }
    ;
    static inverse(a, out) {
        let inverse = {
            x: -a.x + 0,
            y: -a.y + 0
        };
        if (out) {
            out.copy(inverse);
        }
        return inverse;
    }
    ;
    //inverse() {
    //    return Vec2.inverse(this, this);
    //};
    /**
     * returns (-y, x)
     */
    static perLeft(a, out) {
        let left = {
            x: -a.y + 0,
            y: a.x
        };
        if (out) {
            out.copy(left);
        }
        return left;
    }
    ;
    /**
     * returns (y, -x)
     */
    static perRight(a, out) {
        let right = {
            x: a.y,
            y: -a.x + 0
        };
        if (out) {
            out.copy(right);
        }
        return right;
    }
    ;
    static stringify(a) {
        return `x: ${a.x}, y: ${a.y}`;
    }
    ;
    static isZero(a) {
        return a.x === 0 && a.y === 0;
    }
    ;
    static areEqual(a, b) {
        return a.x === b.x && a.y === b.y;
    }
    ;
    reset() {
        this.x = 0;
        this.y = 0;
    }
    ;
    copy(a) {
        this.vector_[0] = a.x;
        this.vector_[1] = a.y;
    }
    ;
}
Vec2.ZERO = { x: 0, y: 0 };
Vec2.LEFT = { x: -1, y: 0 };
Vec2.UP = { x: 0, y: 1 };
Vec2.RIGHT = { x: 1, y: 0 };
Vec2.DOWN = { x: 0, y: -1 };
exports.Vec2 = Vec2;
;
