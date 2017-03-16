import { Vec2, Vec2_C } from "./vec2";

class Edge {
    constructor(
        readonly start: Vec2_C,
        readonly end: Vec2_C,
        readonly direction: Vec2_C,
    ) { };

    *[Symbol.iterator]() {
        yield this.start;
        yield this.end;
    };
};

class GridEdges {
    readonly left = new Edge({ x: -1, y: -1 }, { x: -1, y: 1 }, Vec2.RIGHT);
    readonly up = new Edge({ x: -1, y: 1 }, { x: 1, y: 1 }, Vec2.DOWN);
    readonly right = new Edge({ x: 1, y: 1 }, { x: 1, y: -1 }, Vec2.LEFT);
    readonly down = new Edge({ x: 1, y: -1 }, { x: -1, y: -1 }, Vec2.UP);

    *[Symbol.iterator]() {
        yield this.left;
        yield this.up;
        yield this.right;
        yield this.down;
    };
};

export const GRID_EDGES = new GridEdges();