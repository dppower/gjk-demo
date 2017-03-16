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
;
const InitialInputState = {
    up: false,
    down: false,
    right: false,
    left: false,
    rotate_cw: false,
    rotate_ccw: false,
    toggle_mode: false,
    jump: false,
    save_level: false
};
;
const InitialPointerState = {
    left: false,
    right: false,
    wheel: 0,
    client_position: new vec2_1.Vec2(),
    clamped_position: new vec2_1.Vec2()
};
let InputManager = class InputManager {
    constructor() {
        this.current_key_bindings_ = new Map();
        this.pointer_delta_ = new vec2_1.Vec2();
        this.top = 0;
        this.left = 0;
        this.width = 0;
        this.height = 0;
        this.previous_key_state_ = Object.assign({}, InitialInputState);
        this.current_key_state_ = Object.assign({}, InitialInputState);
        this.previous_mouse_button_state_ = Object.assign({}, InitialPointerState);
        this.current_mouse_button_state_ = Object.assign({}, InitialPointerState);
        // set default key code bindings
        this.current_key_bindings_.set("KeyW", "up");
        this.current_key_bindings_.set("KeyS", "down");
        this.current_key_bindings_.set("KeyA", "left");
        this.current_key_bindings_.set("KeyD", "right");
        this.current_key_bindings_.set("KeyE", "rotate_cw");
        this.current_key_bindings_.set("KeyQ", "rotate_ccw");
        this.current_key_bindings_.set("KeyT", "toggle_mode");
        this.current_key_bindings_.set("KeyX", "save_level");
        this.current_key_bindings_.set("Space", "jump");
    }
    get pointer_delta() {
        return { x: this.pointer_delta_.x, y: -this.pointer_delta_.y };
    }
    ;
    get pointer_position() { return this.current_mouse_button_state_.clamped_position; }
    ;
    get scroll_direction() { return this.current_mouse_button_state_.wheel; }
    ;
    ;
    getDirectionFromInput() {
        let direction = new vec2_1.Vec2();
        if (this.isButtonDown("right") /*&& this.isPointInRect(this.pointer_position)*/) {
            direction.copy(this.pointer_delta);
        }
        else {
            if (this.isKeyDown("right")) {
                vec2_1.Vec2.add(direction, vec2_1.Vec2.RIGHT, direction);
            }
            if (this.isKeyDown("left")) {
                vec2_1.Vec2.add(direction, vec2_1.Vec2.LEFT, direction);
            }
            if (this.isKeyDown("up")) {
                vec2_1.Vec2.add(direction, vec2_1.Vec2.UP, direction);
            }
            if (this.isKeyDown("down")) {
                vec2_1.Vec2.add(direction, vec2_1.Vec2.DOWN, direction);
            }
        }
        return vec2_1.Vec2.normalise(direction);
    }
    ;
    getRotationFromInput() {
        let rotation = 0;
        if (this.isKeyDown("rotate_cw")) {
            rotation = (rotation + 1);
        }
        if (this.isKeyDown("rotate_ccw")) {
            rotation = (rotation - 1);
        }
        return rotation;
    }
    ;
    setBoundaries(x, y, w, h) {
        this.left = x;
        this.top = y;
        this.height = h;
        this.width = w;
    }
    ;
    setMousePosition(position) {
        let x;
        if (position.x < -0.5 * this.left) {
            x = 0;
        }
        else if (position.x > -0.5 * this.left + this.width) {
            x = 1;
        }
        else {
            x = (position.x + 0.5 * this.left) / this.width;
        }
        let y;
        if (position.y < -0.5 * this.top) {
            y = 0;
        }
        else if (position.y > -0.5 * this.top + this.height) {
            y = 1;
        }
        else {
            y = (position.y + 0.5 * this.top) / this.height;
        }
        let current_delta = vec2_1.Vec2.normalise(vec2_1.Vec2.subtract(position, this.previous_mouse_button_state_.client_position));
        vec2_1.Vec2.scale(vec2_1.Vec2.add(this.pointer_delta, current_delta), 0.5, this.pointer_delta_);
        this.current_mouse_button_state_.client_position.copy(position);
        this.current_mouse_button_state_.clamped_position.copy({ x: 2 * x - 1, y: 1 - 2 * y });
    }
    ;
    setWheelDirection(value) {
        this.current_mouse_button_state_.wheel = value;
    }
    ;
    isKeyDown(action) {
        return this.current_key_state_[action];
    }
    ;
    wasKeyDown(action) {
        return this.previous_key_state_[action];
    }
    ;
    isKeyPressed(action) {
        if (this.isKeyDown(action) == true && this.wasKeyDown(action) == false) {
            return true;
        }
        return false;
    }
    ;
    isButtonDown(button) {
        return this.current_mouse_button_state_[button];
    }
    ;
    wasButtonDown(button) {
        return this.previous_mouse_button_state_[button];
    }
    ;
    isButtonPressed(button) {
        if (this.isButtonDown(button) == true && this.wasButtonDown(button) == false) {
            return true;
        }
        return false;
    }
    ;
    setKeyDown(key_code) {
        let action = this.current_key_bindings_.get(key_code);
        if (action != undefined) {
            this.current_key_state_[action] = true;
        }
    }
    ;
    setKeyUp(key_code) {
        let action = this.current_key_bindings_.get(key_code);
        if (action != undefined) {
            this.current_key_state_[action] = false;
        }
    }
    ;
    setMouseButton(button, state) {
        this.current_mouse_button_state_[button] = state;
    }
    ;
    update() {
        for (let input in this.current_key_state_) {
            this.previous_key_state_[input] = this.current_key_state_[input];
        }
        ;
        for (let input in this.current_mouse_button_state_) {
            this.previous_mouse_button_state_[input] = this.current_mouse_button_state_[input];
        }
        ;
        //this.pointer_delta_.reset();
        this.current_mouse_button_state_.wheel = 0.0;
    }
    ;
};
InputManager = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], InputManager);
exports.InputManager = InputManager;
//# sourceMappingURL=input-manager.js.map