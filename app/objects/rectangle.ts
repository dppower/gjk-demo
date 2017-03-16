import { Vec2, Vec2_T } from "./vec2";
import { Mat2 } from "./mat2";
import { ColorRGBA } from "./colors/color-rgba";
import { Shape2d } from "./shape-2d";
import { InputManager } from "./input-manager";
import { ActiveState } from "./active-state";
import { Polygon } from "./polygon";
import { CollisionGJK } from "./collision-gjk";
import { GRID_EDGES } from "./grid-edges";

export class Rectangle extends Polygon {

    readonly scale = 0.05; // 0.05 is 1 unit
    
    get width() { return this.width_; };
    set width(unit: number) {
        this.width_ = this.scale * unit;
    };

    get height() { return this.height_; };
    set height(unit: number) {
        this.height_ = this.scale * unit;
    };

    private collision_sphere: number;

    private velocity = 0.0005;
    private turn_speed = 0.0005;

    constructor(
        initial_position: Vec2,
        color: ColorRGBA,
        index: number,
        private width_: number, private height_: number,
        private active_state: ActiveState
    ) {
        super(4, color, index);
        this.position_ = initial_position;
        this.initialiseRectCoords();       
    };

    initialiseRectCoords() {
        let half_w = this.width_ / 2;
        let half_h = this.height_ / 2;

        this.local_vertices = [
            new Vec2({ x: -half_w, y: +half_h }),
            new Vec2({ x: +half_w, y: +half_h }),
            new Vec2({ x: +half_w, y: -half_h }),
            new Vec2({ x: -half_w, y: -half_h })
        ];

        this.updateWorldVertices();
        this.collision_sphere = Vec2.length(this.local_vertices[0]) + 0.1;
    };

    updatePolygon(dt: number, inputs: InputManager, handle_collisions = true) {

        this.previous_position_.copy(this.position_);
        let rotation = inputs.getRotationFromInput();

        if (rotation) {
            try {
                this.rotate(dt, rotation);
            } catch (e) {
                console.error(e.message);
            }
        }
        let direction = inputs.getDirectionFromInput();
        this.translate(dt, direction);
        this.checkEdgeCollisions();
        if (handle_collisions) {
            this.checkPolygonCollisions(this.active_state.inactive);
        }
    };

    checkEdgeCollisions() {
        let displacements: Vec2_T[] = [];

        for (let edge of GRID_EDGES) {
            // Check if object is close to edge
            if (Vec2.dot(this.position_, edge.direction) < this.collision_sphere) {
                let result = CollisionGJK.isCollision(this, edge);

                if (result.is_collision) {
                    let displace = CollisionGJK.getDisplacement(this, edge, result.simplex);
                    if (!Vec2.isZero(displace)) {
                        displacements.push(displace);
                    }
                }                
            }
        }
         
        if (displacements.length !== 0) {
            let displace = displacements.reduce((prev: Vec2_T, curr: Vec2_T) => {
                return Vec2.add(prev, curr);
            });

            Vec2.add(this.position_, displace, this.position_);
            this.updateWorldVertices();
        }
    };

    checkPolygonCollisions(polygon: Polygon) {
        let result = CollisionGJK.isCollision(this, polygon);
        if (result.is_collision) {
            let displace = CollisionGJK.getDisplacement(this, polygon, result.simplex);
            if (!Vec2.isZero(displace)) {
                Vec2.add(this.position_, displace, this.position_);
                this.updateWorldVertices();
            }
        }
    };
    
    isPointInRect(point: Vec2_T) {
        let AB = Vec2.subtract(this.world_vertices[1], this.world_vertices[0]);
        let AP = Vec2.subtract(point, this.world_vertices[0]);

        let BC = Vec2.subtract(this.world_vertices[2], this.world_vertices[1]);
        let BP = Vec2.subtract(point, this.world_vertices[1]);

        let AB_AP = Vec2.dot(AB, AP);
        let BC_BP = Vec2.dot(BC, BP);

        return (0 <= AB_AP) && (AB_AP <= Vec2.dot(AB, AB)) && (0 <= BC_BP) && (BC_BP <= Vec2.dot(BC, BC));
    };

    translate(dt: number, direction: Vec2_T) {       
        Vec2.add(this.position_, Vec2.scale(direction, this.velocity * dt), this.position_);
        this.updateWorldVertices();              
    };

    rotate(dt: number, angle: -1 | 1) {
        let theta = angle * this.turn_speed * dt;
        let rotation = Mat2.fromAngle(theta);

        Mat2.multiply(rotation, this.orientation_, this.orientation_);
    };

    drawShape(buffer_width: number, buffer_height: number) {
        return Shape2d.drawPolygon(this, buffer_width, buffer_height);
    };
};