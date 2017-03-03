import { Vec2 } from "./vec2";
import { ColorRGBA } from "./colors/color-rgba";
import { Shape2d } from "./shape-2d";
import { InputManager } from "./input-manager";
import { ActiveState } from "./active-state";
import { Polygon } from "./polygon";
import { CollisionGJK } from "./collision-gjk";

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

    get position() { return this.position_; };
    
    private velocity = 0.0002;
    private position_: Vec2;
    private previous_position_ = new Vec2();

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

        this.vertices = [
            new Vec2(this.position_.x - half_w, this.position_.y + half_h),
            new Vec2(this.position_.x + half_w, this.position_.y + half_h),
            new Vec2(this.position_.x + half_w, this.position_.y - half_h),
            new Vec2(this.position_.x - half_w, this.position_.y - half_h)
        ];
    };

    updateRectCoords() {
        let half_w = this.width_ / 2;
        let half_h = this.height_ / 2;

        this.vertices[0].x = this.position_.x - half_w;
        this.vertices[0].y = this.position_.y + half_h;
        this.vertices[1].x = this.position_.x + half_w;
        this.vertices[1].y = this.position_.y + half_h;
        this.vertices[2].x = this.position_.x + half_w;
        this.vertices[2].y = this.position_.y - half_h;
        this.vertices[3].x = this.position_.x - half_w;
        this.vertices[3].y = this.position_.y - half_h;
    };

    updatePolygon(dt: number, inputs: InputManager) {

        this.previous_position_.copy(this.position_);

        let direction = inputs.getDirectionFromInput();
        this.updatePosition(dt, direction);
    };

    checkEdgeCollisions() {
        
        let edges: Vec2[];

        let displacements: Vec2[] = [];

        for (let edge of edges) {
            
        }
        if (displacements.length !== 0) {
            return displacements.reduce((prev: Vec2, curr: Vec2) => {
                if (curr.length < prev.length) return curr;
                return prev;
            });
        } else {
            return new Vec2();
        }
    };

    checkPolygonCollisions(polygon: Polygon) {
        let displace = CollisionGJK.isCollision(this, polygon);
        return displace ? displace : new Vec2();
    };
    
    isPointInRect(P: Vec2) {
        let AB = this.vertices[1].subtract(this.vertices[0]);
        let AP = P.subtract(this.vertices[0]);

        let BC = this.vertices[2].subtract(this.vertices[1]);
        let BP = P.subtract(this.vertices[1]);

        let AB_AP = AB.dot(AP);
        let BC_BP = BC.dot(BP);

        return (0 <= AB_AP) && (AB_AP <= AB.dot(AB)) && (0 <= BC_BP) && (BC_BP <= BC.dot(BC));
    };

    updatePosition(dt: number, direction: Vec2) {       
        this.position_.copy(this.position_.add(direction.scale(this.velocity * dt)));
        this.updateRectCoords();
        let displace = this.checkPolygonCollisions(this.active_state.inactive);
        this.position_.copy(this.position_.add(displace));
        this.updateRectCoords();
                
    };

    drawShape(buffer_width: number, buffer_height: number) {
        let [a, b, c, d] = Shape2d.getCoordinatesInPixels(this, buffer_width, buffer_height);
        return Shape2d.drawQuad(a, b, c, d);
    };
};