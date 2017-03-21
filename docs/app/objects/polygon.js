"use strict";
const vec2_1 = require("./vec2");
const mat2_1 = require("./mat2");
const collision_gjk_1 = require("./collision-gjk");
class Polygon {
    constructor(length_, color_, index_) {
        this.length_ = length_;
        this.color_ = color_;
        this.index_ = index_;
        this.previous_position_ = new vec2_1.Vec2();
        this.orientation_ = new mat2_1.Mat2();
        this[Symbol.iterator] = this.getWorldVertices;
    }
    get length() { return this.length_; }
    ;
    get index() { return this.index_; }
    ;
    get color() { return this.color_; }
    ;
    get position() { return this.position_; }
    ;
    ;
    updateWorldVertices() {
        this.world_vertices = this.local_vertices.map((local) => {
            return this.orientation_.rotatePoint(local);
        }).map((local) => {
            return { x: this.position_.x + local.x, y: this.position_.y + local.y };
        });
    }
    ;
    isPointInPolygon(point) {
        return collision_gjk_1.CollisionGJK.isCollision([point], this).is_collision;
    }
    ;
    *getWorldVertices() {
        yield* this.world_vertices;
    }
    ;
    *getLocalVertices() {
        yield* this.local_vertices;
    }
    ;
}
exports.Polygon = Polygon;
;
