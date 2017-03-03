export type Vec2Object = { x: number, y: number };

export class Vec2 {

    get x() { return this.vector_[0]; };
    get y() { return this.vector_[1]; };

    get array() { return this.vector_; };

    get length() {
        return Math.sqrt(this.squared_length);
    };

    get squared_length() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    };

    set x(value: number) { this.vector_[0] = value; };
    set y(value: number) { this.vector_[1] = value; };

    constructor(x = 0.0, y = 0.0) {
        this.vector_ = new Float32Array([x, y]);
    };

    static fromArray(array: number[]) {
        let vector = new Vec2();
        vector.x = array[0] || 0.0;
        vector.y = array[1] || 0.0;
        return vector;
    };

    dot(a: Vec2 | Vec2Object) {
        return this.x * a.x + this.y * a.y;
    };

    // Gives the signed area of a parellogram
    static cross(a: Vec2, b: Vec2) {
        return (a.x * b.y) - (a.y * b.x);
    };

    normalise() {
        let length = this.length;
        let n = new Vec2();
        if (length > 0) {
            let factor = 1.0 / length;
            n = this.scale(factor);
        }
        return n;   
    };

    add(a: Vec2) {
        let b = new Vec2();
        b.x = this.x + a.x;
        b.y = this.y + a.y;

        return b;
    };

    subtract(a: Vec2) {
        let b = new Vec2();
        b.x = this.x - a.x;
        b.y = this.y - a.y;

        return b;
    };

    scale(scalar: number) {
        let v = new Vec2();
        v.x = this.x * scalar;
        v.y = this.y * scalar;

        return v;
    };

    toString() {
        return `x: ${this.x}, y: ${this.y}`;
    };

    isZero() {
        return this.x === 0 && this.y === 0;
    };

    isEqual(b: Vec2) {
        return this.x === b.x && this.y === b.y;
    };

    zero() {
        this.x = 0;
        this.y = 0;
    };

    inverse() {
        return new Vec2(-1 * this.x + 0, -1 * this.y + 0);
    };

    copy(a: Vec2) {
        this.vector_[0] = a.x;
        this.vector_[1] = a.y;
    };

    private vector_: Float32Array;
};