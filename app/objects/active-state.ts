import { Injectable } from "@angular/core";

import { Vec2 } from "./vec2";
import { InputManager } from "./input-manager";
import { Rectangle } from "./rectangle";
import { Polygon } from "./polygon";
import { ColorRGBA } from "./colors/color-rgba";
import { COLORS } from "./colors/color-keywords";
import { Shape2d } from "./shape-2d";

@Injectable()
export class ActiveState {

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

    private points: Vec2[] = [];

    constructor(private input_manager: InputManager) {
        this.polygons = [];
        this.polygons.push(new Rectangle(new Vec2(0.2, 0.6), ColorRGBA.fromKeyword("forestgreen"), 0, 0.2, 0.2, this));
        this.polygons.push(new Rectangle(new Vec2(0.6, 0.2), ColorRGBA.fromKeyword("goldenrod"), 1, 0.2, 0.2, this));
    };

    updateState(dt: number) {
        if (this.input_manager.isButtonPressed("left")) {
            let check = (<Rectangle>this.polygons[this.active_polygon]).isPointInRect(this.input_manager.pointer_position);
            if (!check) {
                console.log(`not in active polygon, position: ${this.input_manager.pointer_position}.`);
                let inactive: 0 | 1 = this.active_polygon ? 0 : 1;
                check = (<Rectangle>this.polygons[inactive]).isPointInRect(this.input_manager.pointer_position);
                if (check) {
                    this.set_active = inactive;
                }
            }
        }
        else if (this.input_manager.scroll_direction) {
            this.increment_active = this.input_manager.scroll_direction;
        }
               
        this.polygons[this.active_polygon].updatePolygon(dt, this.input_manager);
        this.calculateMinkowskiDifference();
    };

    calculateMinkowskiDifference() {
        this.points.length = 0;
        for (let i of this.polygons[0]) {
            for (let j of this.polygons[1]) {
                this.points.push(i.subtract(j));
            }
        }
    };

    renderState(factor: number, context: CanvasRenderingContext2D, width: number, height: number) {
        // Draw points for minkowski difference
        for (let p of this.points) {
            context.fillStyle = "black";
            let point = Shape2d.drawPoint(p, width, height);
            context.fill(point);
        }    
        // Draw inactive polygon first
        let inactive_index: 0 | 1 = this.active_polygon ? 0 : 1;
        let inactive = this.polygons[inactive_index];
        context.fillStyle = inactive.color.rgba;
        context.fill(inactive.drawShape(width, height));

        // Draw active polygon second with outline
        let active = this.polygons[this.active_polygon];
        let active_path = active.drawShape(width, height);
        context.fillStyle = active.color.rgba;
        context.fill(active_path);

        context.lineWidth = 1;
        context.strokeStyle = "white";
        context.stroke(active_path);
    };
};