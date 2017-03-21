"use strict";
const vec2_1 = require("./vec2");
class Edge {
    constructor(start, end, direction) {
        this.start = start;
        this.end = end;
        this.direction = direction;
    }
    ;
    *[Symbol.iterator]() {
        yield this.start;
        yield this.end;
    }
    ;
}
;
class GridEdges {
    constructor() {
        this.left = new Edge({ x: -1, y: -1 }, { x: -1, y: 1 }, vec2_1.Vec2.RIGHT);
        this.up = new Edge({ x: -1, y: 1 }, { x: 1, y: 1 }, vec2_1.Vec2.DOWN);
        this.right = new Edge({ x: 1, y: 1 }, { x: 1, y: -1 }, vec2_1.Vec2.LEFT);
        this.down = new Edge({ x: 1, y: -1 }, { x: -1, y: -1 }, vec2_1.Vec2.UP);
    }
    *[Symbol.iterator]() {
        yield this.left;
        yield this.up;
        yield this.right;
        yield this.down;
    }
    ;
}
;
exports.GRID_EDGES = new GridEdges();
