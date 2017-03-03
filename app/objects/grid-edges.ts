import { Vec2 } from "./vec2";

class Edge {
    constructor(
        readonly start: Vec2,
        readonly end: Vec2,
        readonly direction: Vec2,
    ) { };
};

class GridEdges {
    readonly left = new Edge(new Vec2(0, 0), new Vec2(0, 1), new Vec2(1, 0));
    readonly up = new Edge(new Vec2(0, 1), new Vec2(1, 1), new Vec2(0, -1));
    readonly right = new Edge(new Vec2(1, 1), new Vec2(1, 0), new Vec2(-1, 0));
    readonly down = new Edge(new Vec2(1, 0), new Vec2(0, 0), new Vec2(1, 0));

    *[Symbol.iterator]() {
        yield this.left;
        yield this.up;
        yield this.right;
        yield this.down;
    };
};

export const GRID_EDGES = new GridEdges();