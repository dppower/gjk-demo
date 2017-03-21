"use strict";
const vec2_1 = require("./vec2");
const mat2_1 = require("./mat2");
const shape_2d_1 = require("./shape-2d");
const polygon_1 = require("./polygon");
const collision_gjk_1 = require("./collision-gjk");
const grid_edges_1 = require("./grid-edges");
class Rectangle extends polygon_1.Polygon {
    constructor(initial_position, color, index, width_, height_, active_state) {
        super(4, color, index);
        this.width_ = width_;
        this.height_ = height_;
        this.active_state = active_state;
        this.scale = 0.05; // 0.05 is 1 unit
        this.velocity = 0.0005;
        this.turn_speed = 0.0005;
        this.position_ = initial_position;
        this.initialiseRectCoords();
    }
    get width() { return this.width_; }
    ;
    set width(unit) {
        this.width_ = this.scale * unit;
    }
    ;
    get height() { return this.height_; }
    ;
    set height(unit) {
        this.height_ = this.scale * unit;
    }
    ;
    ;
    initialiseRectCoords() {
        let half_w = this.width_ / 2;
        let half_h = this.height_ / 2;
        this.local_vertices = [
            new vec2_1.Vec2({ x: -half_w, y: +half_h }),
            new vec2_1.Vec2({ x: +half_w, y: +half_h }),
            new vec2_1.Vec2({ x: +half_w, y: -half_h }),
            new vec2_1.Vec2({ x: -half_w, y: -half_h })
        ];
        this.updateWorldVertices();
        this.collision_sphere = vec2_1.Vec2.length(this.local_vertices[0]) + 0.1;
    }
    ;
    updatePolygon(dt, inputs, handle_collisions = true) {
        this.previous_position_.copy(this.position_);
        let rotation = inputs.getRotationFromInput();
        if (rotation) {
            try {
                this.rotate(dt, rotation);
            }
            catch (e) {
                console.error(e.message);
            }
        }
        let direction = inputs.getDirectionFromInput();
        this.translate(dt, direction);
        this.checkEdgeCollisions();
        if (handle_collisions) {
            this.checkPolygonCollisions(this.active_state.inactive);
        }
    }
    ;
    checkEdgeCollisions() {
        let displacements = [];
        for (let edge of grid_edges_1.GRID_EDGES) {
            // Check if object is close to edge
            if (vec2_1.Vec2.dot(this.position_, edge.direction) < this.collision_sphere) {
                let result = collision_gjk_1.CollisionGJK.isCollision(this, edge);
                if (result.is_collision) {
                    let displace = collision_gjk_1.CollisionGJK.getDisplacement(this, edge, result.simplex);
                    if (!vec2_1.Vec2.isZero(displace)) {
                        displacements.push(displace);
                    }
                }
            }
        }
        if (displacements.length !== 0) {
            let displace = displacements.reduce((prev, curr) => {
                return vec2_1.Vec2.add(prev, curr);
            });
            vec2_1.Vec2.add(this.position_, displace, this.position_);
            this.updateWorldVertices();
        }
    }
    ;
    checkPolygonCollisions(polygon) {
        let result = collision_gjk_1.CollisionGJK.isCollision(this, polygon);
        if (result.is_collision) {
            let displace = collision_gjk_1.CollisionGJK.getDisplacement(this, polygon, result.simplex);
            if (!vec2_1.Vec2.isZero(displace)) {
                vec2_1.Vec2.add(this.position_, displace, this.position_);
                this.updateWorldVertices();
            }
        }
    }
    ;
    isPointInRect(point) {
        let AB = vec2_1.Vec2.subtract(this.world_vertices[1], this.world_vertices[0]);
        let AP = vec2_1.Vec2.subtract(point, this.world_vertices[0]);
        let BC = vec2_1.Vec2.subtract(this.world_vertices[2], this.world_vertices[1]);
        let BP = vec2_1.Vec2.subtract(point, this.world_vertices[1]);
        let AB_AP = vec2_1.Vec2.dot(AB, AP);
        let BC_BP = vec2_1.Vec2.dot(BC, BP);
        return (0 <= AB_AP) && (AB_AP <= vec2_1.Vec2.dot(AB, AB)) && (0 <= BC_BP) && (BC_BP <= vec2_1.Vec2.dot(BC, BC));
    }
    ;
    translate(dt, direction) {
        vec2_1.Vec2.add(this.position_, vec2_1.Vec2.scale(direction, this.velocity * dt), this.position_);
        this.updateWorldVertices();
    }
    ;
    rotate(dt, angle) {
        let theta = angle * this.turn_speed * dt;
        let rotation = mat2_1.Mat2.fromAngle(theta);
        mat2_1.Mat2.multiply(rotation, this.orientation_, this.orientation_);
    }
    ;
    drawShape(buffer_width, buffer_height) {
        return shape_2d_1.Shape2d.drawPolygon(this, buffer_width, buffer_height);
    }
    ;
}
exports.Rectangle = Rectangle;
;
