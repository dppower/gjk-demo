"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const vec2_1 = require("./vec2");
const input_manager_1 = require("./input-manager");
const rectangle_1 = require("./rectangle");
const collision_gjk_1 = require("./collision-gjk");
const color_rgba_1 = require("./colors/color-rgba");
const shape_2d_1 = require("./shape-2d");
const arrow_2d_1 = require("./arrow-2d");
let ActiveState = class ActiveState {
    constructor(input_manager) {
        this.input_manager = input_manager;
        this.current_index = 0;
        this.collision_state = [];
        this.handle_collisions_ = true;
        this.active_polygon = 0;
        this.points = [];
        this.polygons = [];
        this.polygons.push(new rectangle_1.Rectangle(new vec2_1.Vec2({ x: 0.2, y: 0.6 }), color_rgba_1.ColorRGBA.fromHex("#3cd112"), 0, 0.2, 0.3, this));
        this.polygons.push(new rectangle_1.Rectangle(new vec2_1.Vec2({ x: 0.6, y: 0.2 }), color_rgba_1.ColorRGBA.fromHex("#ed8f04"), 1, 0.2, 0.2, this));
    }
    get is_collisions() {
        return this.handle_collisions_;
    }
    ;
    getStatus() {
        let current = this.collision_state[this.current_index - 1];
        if (current)
            return current.status;
        return "...";
    }
    ;
    toggleCollisions() {
        this.handle_collisions_ = !this.handle_collisions_;
        if (this.current_index > 0) {
            this.exit();
        }
    }
    ;
    next() {
        if (this.current_index === 0) {
            // begin simulation
            this.collision_state = [...collision_gjk_1.CollisionGJK.getCollisionResults(this.active, this.inactive)];
            console.log(this.collision_state);
        }
        this.current_index++;
        if (this.current_index > this.collision_state.length) {
            this.exit();
        }
    }
    ;
    previous() {
        this.current_index--;
        if (this.current_index < 1) {
            this.exit();
        }
    }
    ;
    exit() {
        this.current_index = 0;
        this.collision_state.length = 0;
    }
    ;
    get active() {
        return this.polygons[this.active_polygon];
    }
    ;
    get inactive() {
        let inactive = this.active_polygon ? 0 : 1;
        return this.polygons[inactive];
    }
    ;
    set set_active(value) {
        this.active_polygon = value;
    }
    ;
    set increment_active(value) {
        this.active_polygon = (Math.abs((this.active_polygon + value) % 2));
    }
    ;
    ;
    updateState(dt) {
        if (this.current_index === 0) {
            if (this.input_manager.isButtonPressed("left")) {
                //let check = (<Rectangle>this.polygons[this.active_polygon]).isPointInRect(this.input_manager.pointer_position);
                let check = this.active.isPointInPolygon(this.input_manager.pointer_position);
                if (!check) {
                    let inactive = this.active_polygon ? 0 : 1;
                    //check = (<Rectangle>this.polygons[inactive]).isPointInRect(this.input_manager.pointer_position);
                    check = this.inactive.isPointInPolygon(this.input_manager.pointer_position);
                    if (check) {
                        this.set_active = inactive;
                    }
                }
            }
            else if (this.input_manager.scroll_direction) {
                this.increment_active = this.input_manager.scroll_direction;
            }
            this.polygons[this.active_polygon].updatePolygon(dt, this.input_manager, this.handle_collisions_);
            this.calculateMinkowskiDifference();
        }
    }
    ;
    calculateMinkowskiDifference() {
        this.points.length = 0;
        for (let i of this.active) {
            for (let j of this.inactive) {
                this.points.push(vec2_1.Vec2.subtract(i, j));
            }
        }
    }
    ;
    renderState(factor, context, width, height) {
        let sim_mode = this.current_index > 0;
        // Draw inactive polygon
        context.fillStyle = sim_mode ? this.inactive.color.getTransparentColor(0.4) : this.inactive.color.rgba;
        context.fill(this.inactive.drawShape(width, height));
        // Draw active polygon outline
        let active_path = this.active.drawShape(width, height);
        if (!sim_mode) {
            context.lineWidth = 4;
            context.strokeStyle = "rgba(60, 58, 63, 0.5)";
            context.stroke(active_path);
        }
        // Draw active polygon        
        context.fillStyle = sim_mode ? this.active.color.getTransparentColor(0.4) : this.active.color.rgba;
        context.fill(active_path);
        // Draw current direction and simplex
        if (sim_mode) {
            let { direction, simplex, status } = this.collision_state[this.current_index - 1];
            let simplex_path;
            switch (simplex.length) {
                case 1:
                    simplex_path = shape_2d_1.Shape2d.drawPoint(simplex[0], width, height, 8);
                    break;
                case 2:
                    simplex_path = shape_2d_1.Shape2d.drawPolygon(simplex, width, height);
                    break;
                default:
                    simplex_path = shape_2d_1.Shape2d.drawPolygon(simplex, width, height, true);
                    break;
            }
            context.lineWidth = 2;
            if (simplex.length === 1) {
                context.fillStyle = "rgb(201, 20, 20)";
                context.fill(simplex_path);
            }
            else if (status === "Collision!") {
                context.strokeStyle = "rgb(201, 20, 20)";
                context.stroke(simplex_path);
                context.fillStyle = "rgba(201, 20, 20, 0.5)";
                context.fill(simplex_path);
            }
            else {
                context.strokeStyle = "rgb(201, 20, 20)";
                context.stroke(simplex_path);
            }
            if (!(status === "Displacement!" || status === "Collision!")) {
                let arrow = new arrow_2d_1.Arrow2d();
                let end = vec2_1.Vec2.scale(vec2_1.Vec2.normalise(direction), 0.5);
                let arrow_path = shape_2d_1.Shape2d.drawPolygon([vec2_1.Vec2.ZERO, end], width, height, false);
                let arrow_head = arrow.getArrowhead(vec2_1.Vec2.ZERO, end, width, height, true);
                context.strokeStyle = "rgb(18, 84, 150)";
                context.stroke(arrow_path);
                context.fillStyle = "rgb(18, 84, 150)";
                context.fill(arrow_head);
            }
            else if (status === "Displacement!") {
                let arrow = new arrow_2d_1.Arrow2d();
                //let end = Vec2.scale(Vec2.normalise(direction), 0.5);
                let arrow_path = shape_2d_1.Shape2d.drawPolygon([vec2_1.Vec2.ZERO, direction], width, height, false);
                let arrow_head = arrow.getArrowhead(vec2_1.Vec2.ZERO, direction, width, height, true);
                context.strokeStyle = "rgb(0, 210, 229)";
                context.stroke(arrow_path);
                context.fillStyle = "rgb(0, 210, 229)";
                context.fill(arrow_head);
            }
        }
        // Draw points for minkowski difference
        for (let p of this.points) {
            context.fillStyle = "black";
            let point = shape_2d_1.Shape2d.drawPoint(p, width, height, 4);
            context.fill(point);
        }
    }
    ;
};
ActiveState = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [input_manager_1.InputManager])
], ActiveState);
exports.ActiveState = ActiveState;
;
//# sourceMappingURL=active-state.js.map