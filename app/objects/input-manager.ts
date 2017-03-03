import { Injectable } from "@angular/core";

import { Vec2 } from "./vec2";

export interface InputState {
    up: boolean,
    down: boolean,
    right: boolean,
    left: boolean,
    rotate_cw: boolean,
    rotate_ccw: boolean,
    toggle_mode: boolean,
    jump: boolean,
    save_level: boolean
};

export type InputTypes = keyof InputState;

const InitialInputState: InputState = {
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

export interface PointerState {
    left: boolean;
    right: boolean;
    wheel: 0 | 1 | -1;
    client_position: Vec2;
    clamped_position: Vec2;
};

 const InitialPointerState: PointerState = {
    left: false,
    right: false,
    wheel: 0,
    client_position: new Vec2(),
    clamped_position: new Vec2()
};

@Injectable()
export class InputManager {

    get pointer_delta() {
        return new Vec2(this.pointer_delta_.x, -this.pointer_delta_.y);
    };

    get pointer_position() { return this.current_mouse_button_state_.clamped_position; };
    get scroll_direction() { return this.current_mouse_button_state_.wheel; };

    private current_key_bindings_ = new Map<string, InputTypes>();

    private previous_key_state_: InputState;
    private current_key_state_: InputState;

    private previous_mouse_button_state_: PointerState;
    private current_mouse_button_state_: PointerState;

    constructor() {
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
    };

    private pointer_delta_ = new Vec2();

    private top = 0;
    private left = 0;
    private width = 0;
    private height = 0;


    getDirectionFromInput() {
        let direction = new Vec2();
        if (this.isButtonDown("left") /*&& this.isPointInRect(this.pointer_position)*/) {
            direction = this.pointer_delta;
        } else {
            if (this.isKeyDown("right")) {
                direction = direction.add(new Vec2(1, 0));
            }
            if (this.isKeyDown("left")) {
                direction = direction.add(new Vec2(-1, 0));
            }
            if (this.isKeyDown("up")) {
                direction = direction.add(new Vec2(0, 1));
            }
            if (this.isKeyDown("down")) {
                direction = direction.add(new Vec2(0, -1));
            }
        }

        direction = direction.normalise();
        return direction;
    };

    setBoundaries(x: number, y: number, w: number, h: number) {
        this.left = x;
        this.top = y;
        this.height = h;
        this.width = w;
    };

    mouse_event_count = 0;

    setMousePosition(position: Vec2) {
        this.mouse_event_count++;
        
        let x: number;
        if (position.x < -0.5 * this.left) {
            x = 0;
        } else if (position.x > -0.5 * this.left + this.width) {
            x = 1;
        } else {
            x = (position.x + 0.5 * this.left) / this.width;
        }

        let y: number;
        if (position.y < -0.5 * this.top) {
            y = 0;
        } else if (position.y > -0.5 * this.top + this.height) {
            y = 1;
        } else {
            y = (position.y + 0.5 * this.top) / this.height;
        }

        let current_delta = position.subtract(this.previous_mouse_button_state_.client_position).normalise();
        this.pointer_delta_ = this.pointer_delta.add(current_delta).scale(0.5);

        this.current_mouse_button_state_.client_position = position;
        this.current_mouse_button_state_.clamped_position = new Vec2(2 * x - 1, 1 - 2 * y);
    };

    setWheelDirection(value: 1 | -1) {
        this.current_mouse_button_state_.wheel = value;
    };

    isKeyDown(action: InputTypes) {
        return this.current_key_state_[action];
    };

    wasKeyDown(action: InputTypes) {
        return this.previous_key_state_[action];
    };

    isKeyPressed(action: InputTypes) {
        if (this.isKeyDown(action) == true && this.wasKeyDown(action) == false) {
            return true;
        }
        return false;
    };

    isButtonDown(button: string) {
        return this.current_mouse_button_state_[button];
    };


    wasButtonDown(button: string) {
        return this.previous_mouse_button_state_[button];
    };

    isButtonPressed(button: string) {
        if (this.isButtonDown(button) == true && this.wasButtonDown(button) == false) {
            return true;
        }
        return false;
    };

    setKeyDown(key_code: string) {
        let action = this.current_key_bindings_.get(key_code);
        if (action != undefined) {
            this.current_key_state_[action] = true;
        }
    };
    
    setKeyUp(key_code: string) {
        let action = this.current_key_bindings_.get(key_code);
        if (action != undefined) {
            this.current_key_state_[action] = false;
        }
    };

    setMouseButton(button: string, state: boolean) {
        this.current_mouse_button_state_[button] = state;
    };

    update() {
        //console.log(`event count: ${ this.mouse_event_count }.`);
        //this.mouse_event_count = 0;
        // Reset this
        for (let input in this.current_key_state_) {
            this.previous_key_state_[input] = this.current_key_state_[input];
        };

        for (let input in this.current_mouse_button_state_) {
            this.previous_mouse_button_state_[input] = this.current_mouse_button_state_[input];
        };

        this.pointer_delta_ = new Vec2();
        this.current_mouse_button_state_.wheel = 0.0;
    };
}