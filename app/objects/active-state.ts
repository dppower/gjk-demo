import { Injectable } from "@angular/core";

import { Vec2, Vec2_T } from "./vec2";
import { InputManager } from "./input-manager";
import { Rectangle } from "./rectangle";
import { Polygon } from "./polygon";
import { CollisionGJK, CollisionResult } from "./collision-gjk";
import { ColorRGBA } from "./colors/color-rgba";
import { COLORS } from "./colors/color-keywords";
import { Shape2d } from "./shape-2d";
import { Arrow2d } from "./arrow-2d";

@Injectable()
export class ActiveState {

    current_index = 0;

    get is_collisions() {
        return this.handle_collisions_;
    };

    collision_state: CollisionResult[] = [];

    getStatus() {
        let current = this.collision_state[this.current_index - 1];
        if (current) return current.status;

        return "...";
    };

    toggleCollisions() {
        this.handle_collisions_ = !this.handle_collisions_;
        if (this.current_index > 0) {
            this.exit();
        }
    };

    next() {
        if (this.current_index === 0) {
            // begin simulation
            this.collision_state = [...CollisionGJK.getCollisionResults(this.active, this.inactive)];
            console.log(this.collision_state);
        }
        this.current_index++;
        if (this.current_index > this.collision_state.length) {
            this.exit();
        }
    };

    previous() {
        this.current_index--;
        if (this.current_index < 1) {
            this.exit();
        }
    };

    exit() {
        this.current_index = 0;
        this.collision_state.length = 0;
    };

    private handle_collisions_ = true;

    get active() {
        return this.polygons[this.active_polygon];
    };

    get inactive() {
        let inactive = this.active_polygon ? 0 : 1;
        return this.polygons[inactive];
    };

    set set_active(value: 0 | 1) {
        this.active_polygon = value;
    };

    set increment_active(value: 1 | -1) {
        this.active_polygon = <0 | 1>(Math.abs((this.active_polygon + value) % 2));
    };

    private active_polygon: 0 | 1 = 0;
    private polygons: Polygon[];

    private points: Vec2_T[] = [];

    constructor(private input_manager: InputManager) {
        this.polygons = [];
        this.polygons.push(new Rectangle(new Vec2({ x: 0.2, y: 0.6 }), ColorRGBA.fromHex("#3cd112"), 0, 0.2, 0.3, this));
        this.polygons.push(new Rectangle(new Vec2({ x: 0.6, y: 0.2 }), ColorRGBA.fromHex("#ed8f04"), 1, 0.2, 0.2, this));
    };

    updateState(dt: number) {
        if (this.current_index === 0) {
            if (this.input_manager.isButtonPressed("left")) {
                //let check = (<Rectangle>this.polygons[this.active_polygon]).isPointInRect(this.input_manager.pointer_position);
                let check = this.active.isPointInPolygon(this.input_manager.pointer_position);
                if (!check) {
                    let inactive: 0 | 1 = this.active_polygon ? 0 : 1;
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
    };

    calculateMinkowskiDifference() {
        this.points.length = 0;
        for (let i of this.active) {
            for (let j of this.inactive) {
                this.points.push(Vec2.subtract(i, j));
            }
        }
    };

    renderState(factor: number, context: CanvasRenderingContext2D, width: number, height: number) {
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

            let simplex_path: Path2D;
            switch (simplex.length) {
                case 1:
                    simplex_path = Shape2d.drawPoint(simplex[0], width, height, 8);
                    break;
                case 2:
                    simplex_path = Shape2d.drawPolygon(simplex, width, height);
                    break;
                default:
                    simplex_path = Shape2d.drawPolygon(simplex, width, height, true);
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
                let arrow = new Arrow2d();
                let end = Vec2.scale(Vec2.normalise(direction), 0.5);
                let arrow_path = Shape2d.drawPolygon([Vec2.ZERO, end], width, height, false);
                let arrow_head = arrow.getArrowhead(Vec2.ZERO, end, width, height);
                context.strokeStyle = "rgb(18, 84, 150)";
                context.stroke(arrow_path);
                context.stroke(arrow_head);
            }
            else if (status === "Displacement!") {
                let arrow = new Arrow2d();
                let arrow_path = Shape2d.drawPolygon([Vec2.ZERO, direction], width, height, false);
                let arrow_head = arrow.getArrowhead(Vec2.ZERO, direction, width, height);
                context.strokeStyle = this.active.color.rgba;
                context.stroke(arrow_path);
                context.stroke(arrow_head);
            }
        }

        // Draw points for minkowski difference
        for (let p of this.points) {
            context.fillStyle = "black";
            let point = Shape2d.drawPoint(p, width, height, 4);
            context.fill(point);
        }   
    };
};