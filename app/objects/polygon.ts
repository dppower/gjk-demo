import { Vec2, Vec2_T } from "./vec2";
import { Mat2 } from "./mat2";
import { ColorRGBA } from "./colors/color-rgba";
import { InputManager } from "./input-manager";
import { CollisionGJK } from "./collision-gjk";

export abstract class Polygon implements Iterable<Vec2_T> {

    get length() { return this.length_; };
    get index() { return this.index_; };
    get color() { return this.color_; };

    get position() { return this.position_; };    
    protected position_: Vec2;
    protected previous_position_ = new Vec2();

    protected orientation_ = new Mat2();

    protected local_vertices: Vec2[];
    protected world_vertices: Vec2_T[];

    constructor(private length_: number, private color_: ColorRGBA, private index_: number) { };

    updateWorldVertices() {
        this.world_vertices = this.local_vertices.map((local) => {
            return this.orientation_.rotatePoint(local); 
        }).map((local) => {
            return { x: this.position_.x + local.x, y: this.position_.y + local.y };
        });
    };

    isPointInPolygon(point: Vec2_T) {
        return CollisionGJK.isCollision([point], this).is_collision;
    };

    abstract updatePolygon(dt: number, inputs: InputManager, handle_collisions?: boolean): void;

    abstract drawShape(buffer_width: number, buffer_height: number): Path2D;

    * getWorldVertices(): IterableIterator<Vec2_T> {
        yield* this.world_vertices;
    };

    * getLocalVertices(): IterableIterator<Vec2> {
        yield* this.local_vertices;
    };

    [Symbol.iterator] = this.getWorldVertices;
};