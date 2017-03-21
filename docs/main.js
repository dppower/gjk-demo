var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("app-main.component", ["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, AppMain;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            AppMain = class AppMain {
            };
            AppMain = __decorate([
                core_1.Component({
                    selector: "app-main",
                    template: `
    <demo></demo>
    `
                }),
                __metadata("design:paramtypes", [])
            ], AppMain);
            exports_1("AppMain", AppMain);
            ;
        }
    };
});
System.register("objects/vec2", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Vec2;
    return {
        setters: [],
        execute: function () {
            Vec2 = class Vec2 {
                constructor(vec = Vec2.ZERO) {
                    this.vector_ = new Float32Array([vec.x, vec.y]);
                }
                get x() { return this.vector_[0]; }
                ;
                get y() { return this.vector_[1]; }
                ;
                get array() { return this.vector_; }
                ;
                get object() {
                    return { x: this.x, y: this.y };
                }
                ;
                get length() {
                    return Math.sqrt(this.squared_length);
                }
                ;
                get squared_length() {
                    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
                }
                ;
                set x(value) { this.vector_[0] = value; }
                ;
                set y(value) { this.vector_[1] = value; }
                ;
                ;
                static fromArray(array) {
                    return new Vec2({
                        x: array[0] || 0,
                        y: array[1] || 0
                    });
                }
                ;
                static length(a) {
                    return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
                }
                ;
                static squaredLength(a) {
                    return Math.pow(a.x, 2) + Math.pow(a.y, 2);
                }
                ;
                static dot(a, b) {
                    return a.x * b.x + a.y * b.y;
                }
                ;
                // Gives the signed area of a parellogram
                static cross(a, b) {
                    return (a.x * b.y) - (a.y * b.x);
                }
                ;
                static normalise(a, out) {
                    let length = Vec2.length(a);
                    if (length > 0) {
                        let factor = 1.0 / length;
                        return Vec2.scale(a, factor, out);
                    }
                    else {
                        if (out) {
                            out.reset();
                        }
                        return { x: 0, y: 0 };
                    }
                }
                ;
                static add(a, b, out) {
                    let sum = {
                        x: a.x + b.x,
                        y: a.y + b.y
                    };
                    if (out) {
                        out.copy(sum);
                    }
                    return sum;
                }
                ;
                static subtract(a, b, out) {
                    let diff = {
                        x: a.x - b.x,
                        y: a.y - b.y
                    };
                    if (out) {
                        out.copy(diff);
                    }
                    return diff;
                }
                ;
                static scale(a, scalar, out) {
                    let scaled = {
                        x: a.x * scalar,
                        y: a.y * scalar
                    };
                    if (out) {
                        out.copy(scaled);
                    }
                    return scaled;
                }
                ;
                static inverse(a, out) {
                    let inverse = {
                        x: -a.x + 0,
                        y: -a.y + 0
                    };
                    if (out) {
                        out.copy(inverse);
                    }
                    return inverse;
                }
                ;
                inverse() {
                    return Vec2.inverse(this, this);
                }
                ;
                /**
                 * returns (-y, x)
                 */
                static perLeft(a, out) {
                    let left = {
                        x: -a.y + 0,
                        y: a.x
                    };
                    if (out) {
                        out.copy(left);
                    }
                    return left;
                }
                ;
                /**
                 * returns (y, -x)
                 */
                static perRight(a, out) {
                    let right = {
                        x: a.y,
                        y: -a.x + 0
                    };
                    if (out) {
                        out.copy(right);
                    }
                    return right;
                }
                ;
                static stringify(a) {
                    return `x: ${a.x}, y: ${a.y}`;
                }
                ;
                static isZero(a) {
                    return a.x === 0 && a.y === 0;
                }
                ;
                static areEqual(a, b) {
                    return a.x === b.x && a.y === b.y;
                }
                ;
                reset() {
                    this.x = 0;
                    this.y = 0;
                }
                ;
                copy(a) {
                    this.vector_[0] = a.x;
                    this.vector_[1] = a.y;
                }
                ;
            };
            Vec2.ZERO = { x: 0, y: 0 };
            Vec2.LEFT = { x: -1, y: 0 };
            Vec2.UP = { x: 0, y: 1 };
            Vec2.RIGHT = { x: 1, y: 0 };
            Vec2.DOWN = { x: 0, y: -1 };
            exports_2("Vec2", Vec2);
            ;
        }
    };
});
System.register("objects/input-manager", ["@angular/core", "objects/vec2"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, vec2_1, InitialInputState, InitialPointerState, InputManager;
    return {
        setters: [
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (vec2_1_1) {
                vec2_1 = vec2_1_1;
            }
        ],
        execute: function () {
            ;
            InitialInputState = {
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
            InitialPointerState = {
                left: false,
                right: false,
                wheel: 0,
                client_position: new vec2_1.Vec2(),
                clamped_position: new vec2_1.Vec2()
            };
            InputManager = class InputManager {
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
                core_2.Injectable(),
                __metadata("design:paramtypes", [])
            ], InputManager);
            exports_3("InputManager", InputManager);
        }
    };
});
System.register("canvas/canvas-controller.component", ["@angular/core", "objects/input-manager"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_3, input_manager_1, CanvasController;
    return {
        setters: [
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (input_manager_1_1) {
                input_manager_1 = input_manager_1_1;
            }
        ],
        execute: function () {
            CanvasController = class CanvasController {
                constructor(input_manager_) {
                    this.input_manager_ = input_manager_;
                }
                ;
                disableContext(event) {
                    return false;
                }
                ;
                setMousePosition(event) {
                    this.input_manager_.setMousePosition({ x: event.clientX, y: event.clientY });
                }
                ;
                setMouseWheel(event) {
                    let scroll = (event.deltaY > 0) ? 1 : -1;
                    this.input_manager_.setWheelDirection(scroll);
                }
                ;
                setMouseUp(event) {
                    event.stopPropagation();
                    if (event.button == 0) {
                        this.input_manager_.setMouseButton("left", false);
                    }
                    else if (event.button == 2) {
                        this.input_manager_.setMouseButton("right", false);
                    }
                }
                ;
                setMouseDown(event) {
                    event.stopPropagation();
                    if (event.button == 0) {
                        this.input_manager_.setMouseButton("left", true);
                    }
                    else if (event.button == 2) {
                        this.input_manager_.setMouseButton("right", true);
                    }
                }
                ;
                setKeyDown(event) {
                    this.input_manager_.setKeyDown(event.code);
                    return false;
                }
                ;
                setKeyUp(event) {
                    this.input_manager_.setKeyUp(event.code);
                    return false;
                }
                ;
                //@HostListener("selectstart", ["$event"])
                //selectStarted(event: Event) {
                //    console.log("canvas selected");
                //    //event.stopPropagation();
                //    //return false;
                //};
                selectionChanged(event) {
                    let selection = document.getSelection();
                    let focus_node = selection.focusNode && selection.focusNode.parentNode;
                    let anchor_node = selection.anchorNode && selection.anchorNode.parentNode;
                    if (focus_node !== anchor_node) {
                        let range = new Range();
                        range.selectNodeContents(focus_node);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
                ;
            };
            __decorate([
                core_3.HostListener("contextmenu", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [MouseEvent]),
                __metadata("design:returntype", void 0)
            ], CanvasController.prototype, "disableContext", null);
            __decorate([
                core_3.HostListener("mousemove", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [MouseEvent]),
                __metadata("design:returntype", void 0)
            ], CanvasController.prototype, "setMousePosition", null);
            __decorate([
                core_3.HostListener("wheel", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [WheelEvent]),
                __metadata("design:returntype", void 0)
            ], CanvasController.prototype, "setMouseWheel", null);
            __decorate([
                core_3.HostListener("mouseup", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [MouseEvent]),
                __metadata("design:returntype", void 0)
            ], CanvasController.prototype, "setMouseUp", null);
            __decorate([
                core_3.HostListener("mousedown", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [MouseEvent]),
                __metadata("design:returntype", void 0)
            ], CanvasController.prototype, "setMouseDown", null);
            __decorate([
                core_3.HostListener("document:keydown", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [KeyboardEvent]),
                __metadata("design:returntype", void 0)
            ], CanvasController.prototype, "setKeyDown", null);
            __decorate([
                core_3.HostListener("document:keyup", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [KeyboardEvent]),
                __metadata("design:returntype", void 0)
            ], CanvasController.prototype, "setKeyUp", null);
            __decorate([
                core_3.HostListener("document:selectionchange", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Event]),
                __metadata("design:returntype", void 0)
            ], CanvasController.prototype, "selectionChanged", null);
            CanvasController = __decorate([
                core_3.Directive({
                    selector: "[canvas-controller]"
                }),
                __metadata("design:paramtypes", [input_manager_1.InputManager])
            ], CanvasController);
            exports_4("CanvasController", CanvasController);
        }
    };
});
System.register("canvas/context-2d", ["@angular/core"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_4, Context2D;
    return {
        setters: [
            function (core_4_1) {
                core_4 = core_4_1;
            }
        ],
        execute: function () {
            Context2D = class Context2D {
                constructor(canvas_ref) {
                    this.canvas_ref = canvas_ref;
                    this.is_resizing = false;
                    this.has_resized = false;
                }
                ;
                ngOnChanges(changes) {
                    if (changes["client_width"] || changes["client_height"]) {
                        this.canvas_width = this.client_width;
                        this.canvas_height = this.client_height;
                        this.is_resizing = true;
                    }
                }
                ;
                isContextResizing() {
                    return this.is_resizing;
                }
                ;
                hasContextResized() {
                    return this.has_resized && !this.is_resizing;
                }
                ;
                createContext() {
                    this.c2d = this.canvas_ref.nativeElement.getContext("2d");
                    if (this.c2d) {
                        this.afterContextInit();
                        return true;
                    }
                    return false;
                }
                ;
                clearContext() {
                    this.c2d.clearRect(0, 0, this.canvas_width, this.canvas_height);
                }
                ;
            };
            __decorate([
                core_4.HostBinding("width"),
                __metadata("design:type", Number)
            ], Context2D.prototype, "canvas_width", void 0);
            __decorate([
                core_4.HostBinding("height"),
                __metadata("design:type", Number)
            ], Context2D.prototype, "canvas_height", void 0);
            __decorate([
                core_4.Input("client-width"),
                __metadata("design:type", Number)
            ], Context2D.prototype, "client_width", void 0);
            __decorate([
                core_4.Input("client-height"),
                __metadata("design:type", Number)
            ], Context2D.prototype, "client_height", void 0);
            __decorate([
                core_4.Input("client-top"),
                __metadata("design:type", Number)
            ], Context2D.prototype, "client_top", void 0);
            __decorate([
                core_4.Input("client-left"),
                __metadata("design:type", Number)
            ], Context2D.prototype, "client_left", void 0);
            exports_5("Context2D", Context2D);
            ;
        }
    };
});
System.register("canvas/canvas-2d", ["@angular/core", "canvas/context-2d"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_5, context_2d_1, Canvas2D;
    return {
        setters: [
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (context_2d_1_1) {
                context_2d_1 = context_2d_1_1;
            }
        ],
        execute: function () {
            Canvas2D = class Canvas2D {
                constructor() { }
                ;
                initialise() {
                    return new Promise((resolve, reject) => {
                        if (this.context_2d.createContext()) {
                            setTimeout(() => {
                                this.afterCanvasInit();
                                resolve(true);
                            }, 0);
                        }
                        else {
                            reject();
                        }
                    });
                }
                ;
            };
            __decorate([
                core_5.Input("z-index"),
                __metadata("design:type", Number)
            ], Canvas2D.prototype, "z_index", void 0);
            __decorate([
                core_5.ViewChild(context_2d_1.Context2D),
                __metadata("design:type", context_2d_1.Context2D)
            ], Canvas2D.prototype, "context_2d", void 0);
            exports_6("Canvas2D", Canvas2D);
        }
    };
});
System.register("canvas/grid-canvas.component", ["@angular/core", "canvas/canvas-2d"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_6, canvas_2d_1, GridCanvas, GridCanvas_1;
    return {
        setters: [
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (canvas_2d_1_1) {
                canvas_2d_1 = canvas_2d_1_1;
            }
        ],
        execute: function () {
            GridCanvas = GridCanvas_1 = class GridCanvas extends canvas_2d_1.Canvas2D {
                constructor() {
                    super(...arguments);
                    this.buffer_width = 800;
                    this.buffer_height = 800;
                }
                afterCanvasInit() {
                    this.buffer = document.createElement("canvas");
                    this.context = this.buffer.getContext("2d");
                    this.resizeBuffer();
                    this.drawBuffer();
                }
                ;
                resizeBuffer() {
                    this.buffer.width = this.buffer_width;
                    this.buffer.height = this.buffer_height;
                }
                ;
                drawBuffer() {
                    const row_count = 20;
                    this.context.strokeStyle = "rgba(125, 125, 125, 0.4)";
                    this.context.strokeRect(0, 0, this.buffer_width, this.buffer_height);
                    let spacing = this.buffer_width / row_count;
                    // Draw gridlines
                    this.context.beginPath();
                    for (let i = 1; i < row_count; i++) {
                        this.context.moveTo(i * spacing, 0);
                        this.context.lineTo(i * spacing, this.buffer_height);
                    }
                    for (let i = 1; i < row_count; i++) {
                        this.context.moveTo(0, i * spacing);
                        this.context.lineTo(this.buffer_width, i * spacing);
                    }
                    this.context.stroke();
                    this.context.strokeStyle = "rgba(0, 0, 0, 0.6)";
                    // Draw tick marks
                    this.context.beginPath();
                    for (let i = 1; i < row_count; i++) {
                        this.context.moveTo(i * spacing, 10 * spacing);
                        this.context.lineTo(i * spacing, 10 * spacing - 8);
                    }
                    for (let i = 1; i < row_count; i++) {
                        this.context.moveTo(10 * spacing, i * spacing);
                        this.context.lineTo(10 * spacing + 8, i * spacing);
                    }
                    this.context.stroke();
                    // Draw x and y axes
                    this.context.beginPath();
                    this.context.moveTo(10 * spacing, 0);
                    this.context.lineTo(10 * spacing, this.buffer_height);
                    this.context.moveTo(0, 10 * spacing);
                    this.context.lineTo(this.buffer_width, 10 * spacing);
                    this.context.stroke();
                }
                ;
            };
            GridCanvas = GridCanvas_1 = __decorate([
                core_6.Component({
                    selector: "grid-canvas",
                    template: `
    <canvas #canvas id="grid-canvas" grid-context
        [client-width]="canvas.offsetWidth" 
        [client-height]="canvas.offsetHeight"
        [client-top]="canvas.offsetTop" 
        [client-left]="canvas.offsetLeft"
        [style.z-index]="zIndex"
        [back-buffer]="buffer"    
    ></canvas>
    `,
                    styles: [`
    #grid-canvas {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
    }
    `],
                    providers: [{ provide: canvas_2d_1.Canvas2D, useExisting: core_6.forwardRef(() => GridCanvas_1) }]
                }),
                __metadata("design:paramtypes", [])
            ], GridCanvas);
            exports_7("GridCanvas", GridCanvas);
            ;
        }
    };
});
System.register("objects/render-loop", ["@angular/core", "rxjs/Rx", "objects/input-manager"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_7, Rx_1, input_manager_2, RenderLoop;
    return {
        setters: [
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (input_manager_2_1) {
                input_manager_2 = input_manager_2_1;
            }
        ],
        execute: function () {
            RenderLoop = class RenderLoop {
                constructor(input_manager) {
                    this.input_manager = input_manager;
                    this.previous_time = 0;
                    this.time_step = 1000 / 60.0;
                    this.accumulated_time = 0;
                    // fps
                    this.frames_per_second = 60;
                    this.frames_this_second = 0;
                    this.render$ = new Rx_1.Subject();
                    this.update$ = new Rx_1.Subject();
                    this.renderUpdateList = new Map();
                }
                get fps() {
                    return this.frames_per_second;
                }
                ;
                ;
                beginLoop() {
                    console.log(`render loop begins.`);
                    this.cancel_token = requestAnimationFrame((time) => {
                        this.last_fps_update = performance.now();
                        this.updateLoop(time);
                    });
                }
                ;
                fixedUpdate(interval) {
                    this.update$.next(interval);
                }
                ;
                renderUpdate(factor) {
                    //this.renderUpdateList.forEach((fn) => fn(factor));
                    this.render$.next(factor);
                }
                ;
                updateLoop(time_now) {
                    this.cancel_token = requestAnimationFrame((time) => {
                        this.updateLoop(time);
                    });
                    if (time_now > this.last_fps_update + 1000) {
                        this.frames_per_second = 0.25 * this.frames_this_second + (1 - 0.25) * this.frames_per_second;
                        // Reset
                        this.last_fps_update = time_now;
                        this.frames_this_second = 0;
                    }
                    this.frames_this_second++;
                    let delta_time = time_now - this.previous_time;
                    this.accumulated_time += delta_time;
                    while (this.accumulated_time > this.time_step) {
                        // Update
                        this.fixedUpdate(this.time_step);
                        this.accumulated_time -= this.time_step;
                    }
                    this.previous_time = time_now;
                    let alpha = this.accumulated_time / this.time_step;
                    this.renderUpdate(alpha);
                    this.input_manager.update();
                }
                ;
                stopLoop() {
                    cancelAnimationFrame(this.cancel_token);
                }
                ;
            };
            RenderLoop = __decorate([
                core_7.Injectable(),
                __metadata("design:paramtypes", [input_manager_2.InputManager])
            ], RenderLoop);
            exports_8("RenderLoop", RenderLoop);
            ;
        }
    };
});
System.register("canvas/grid-context.directive", ["@angular/core", "canvas/context-2d", "objects/render-loop"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_8, context_2d_2, render_loop_1, GridContext, GridContext_1;
    return {
        setters: [
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (context_2d_2_1) {
                context_2d_2 = context_2d_2_1;
            },
            function (render_loop_1_1) {
                render_loop_1 = render_loop_1_1;
            }
        ],
        execute: function () {
            GridContext = GridContext_1 = class GridContext extends context_2d_2.Context2D {
                constructor(canvas_ref, render_loop) {
                    super(canvas_ref);
                    this.render_loop = render_loop;
                }
                ;
                afterContextInit() {
                    this.render_loop.render$.subscribe((status) => {
                        this.drawContext();
                    });
                }
                ;
                updateContext() { }
                ;
                drawContext() {
                    this.clearContext();
                    // Destination
                    let dx = 0;
                    let dy = 0;
                    let dw = this.client_width;
                    let dh = this.client_height;
                    //Source
                    let sx = 0;
                    let sy = 0;
                    let sw = this.client_width;
                    let sh = this.client_height;
                    let width = this.buffer.width - this.client_width;
                    if (width < 0) {
                        dx = Math.trunc(Math.abs(width) * 0.5);
                        dw = this.buffer.width;
                        sw = this.buffer.width;
                    }
                    else if (width > 0) {
                        sx = Math.trunc(width * 0.5);
                    }
                    let height = this.buffer.height - this.client_height;
                    if (height < 0) {
                        dy = Math.trunc(Math.abs(height) * 0.5);
                        dh = this.buffer.height;
                        sh = this.buffer.height;
                    }
                    else if (height > 0) {
                        sy = Math.trunc(height * 0.5);
                    }
                    this.c2d.drawImage(this.buffer, sx, sy, sw, sh, dx, dy, dw, dh);
                }
                ;
            };
            __decorate([
                core_8.Input("back-buffer"),
                __metadata("design:type", HTMLCanvasElement)
            ], GridContext.prototype, "buffer", void 0);
            GridContext = GridContext_1 = __decorate([
                core_8.Directive({
                    selector: "[grid-context]",
                    providers: [{ provide: context_2d_2.Context2D, useExisting: core_8.forwardRef(() => GridContext_1) }]
                }),
                __metadata("design:paramtypes", [core_8.ElementRef, render_loop_1.RenderLoop])
            ], GridContext);
            exports_9("GridContext", GridContext);
            ;
        }
    };
});
System.register("objects/mat2", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var Mat2;
    return {
        setters: [],
        execute: function () {
            Mat2 = class Mat2 {
                constructor(m_00 = 1, m_01 = 0, m_10 = 0, m_11 = 1) {
                    this.m_00 = m_00;
                    this.m_01 = m_01;
                    this.m_10 = m_10;
                    this.m_11 = m_11;
                }
                ;
                static fromAngle(angle) {
                    let c = Math.cos(angle);
                    let s = Math.sin(angle);
                    return new Mat2(c, -s, s, c);
                }
                ;
                static multiply(m1, m2, out) {
                    let m_00 = m1.m_00 * m2.m_00 + m1.m_01 * m2.m_10;
                    let m_01 = m1.m_00 * m2.m_01 + m1.m_01 * m2.m_11;
                    let m_10 = m1.m_10 * m2.m_00 + m1.m_11 * m2.m_10;
                    let m_11 = m1.m_10 * m2.m_01 + m1.m_11 * m2.m_11;
                    if (out) {
                        out.m_00 = m_00;
                        out.m_01 = m_01;
                        out.m_10 = m_10;
                        out.m_11 = m_11;
                    }
                    else {
                        return new Mat2(m_00, m_01, m_10, m_11);
                    }
                }
                ;
                rotatePoint(point) {
                    return { x: this.m_00 * point.x + this.m_01 * point.y, y: this.m_10 * point.x + this.m_11 * point.y };
                }
                ;
            };
            exports_10("Mat2", Mat2);
            ;
        }
    };
});
System.register("objects/colors/color-keywords", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var ColorKeywords, COLORS;
    return {
        setters: [],
        execute: function () {
            ColorKeywords = class ColorKeywords {
                constructor() {
                    this.black = "#000000";
                    this.silver = "#c0c0c0";
                    this.gray = "#808080";
                    this.white = "#ffffff";
                    this.maroon = "#800000";
                    this.red = "#ff0000";
                    this.purple = "#800080";
                    this.fuchsia = "#ff00ff";
                    this.green = "#008000";
                    this.lime = "#00ff00";
                    this.olive = "#808000";
                    this.yellow = "#ffff00";
                    this.navy = "#000080";
                    this.blue = "#0000ff";
                    this.teal = "#008080";
                    this.aqua = "#00ffff";
                    this.orange = "#ffa500";
                    this.aliceblue = "#f0f8ff";
                    this.antiquewhite = "#faebd7";
                    this.aquamarine = "#7fffd4";
                    this.azure = "#f0ffff";
                    this.beige = "#f5f5dc";
                    this.bisque = "#ffe4c4";
                    this.blanchedalmond = "#ffebcd";
                    this.blueviolet = "#8a2be2";
                    this.brown = "#a52a2a";
                    this.burlywood = "#deb887";
                    this.cadetblue = "#5f9ea0";
                    this.chartreuse = "#7fff00";
                    this.chocolate = "#d2691e";
                    this.coral = "#ff7f50";
                    this.cornflowerblue = "#6495ed";
                    this.cornsilk = "#fff8dc";
                    this.crimson = "#dc143c";
                    this.darkblue = "#00008b";
                    this.darkcyan = "#008b8b";
                    this.darkgoldenrod = "#b8860b";
                    this.darkgray = "#a9a9a9";
                    this.darkgreen = "#006400";
                    this.darkgrey = "#a9a9a9";
                    this.darkkhaki = "#bdb76b";
                    this.darkmagenta = "#8b008b";
                    this.darkolivegreen = "#556b2f";
                    this.darkorange = "#ff8c00";
                    this.darkorchid = "#9932cc";
                    this.darkred = "#8b0000";
                    this.darksalmon = "#e9967a";
                    this.darkseagreen = "#8fbc8f";
                    this.darkslateblue = "#483d8b";
                    this.darkslategray = "#2f4f4f";
                    this.darkslategrey = "#2f4f4f";
                    this.darkturquoise = "#00ced1";
                    this.darkviolet = "#9400d3";
                    this.deeppink = "#ff1493";
                    this.deepskyblue = "#00bfff";
                    this.dimgray = "#696969";
                    this.dimgrey = "#696969";
                    this.dodgerblue = "#1e90ff";
                    this.firebrick = "#b22222";
                    this.floralwhite = "#fffaf0";
                    this.forestgreen = "#228b22";
                    this.gainsboro = "#dcdcdc";
                    this.ghostwhite = "#f8f8ff";
                    this.gold = "#ffd700";
                    this.goldenrod = "#daa520";
                    this.greenyellow = "#adff2f";
                    this.grey = "#808080";
                    this.honeydew = "#f0fff0";
                    this.hotpink = "#ff69b4";
                    this.indianred = "#cd5c5c";
                    this.indigo = "#4b0082";
                    this.ivory = "#fffff0";
                    this.khaki = "#f0e68c";
                    this.lavender = "#e6e6fa";
                    this.lavenderblush = "#fff0f5";
                    this.lawngreen = "#7cfc00";
                    this.lemonchiffon = "#fffacd";
                    this.lightblue = "#add8e6";
                    this.lightcoral = "#f08080";
                    this.lightcyan = "#e0ffff";
                    this.lightgoldenrodyellow = "#fafad2";
                    this.lightgray = "#d3d3d3";
                    this.lightgreen = "#90ee90";
                    this.lightgrey = "#d3d3d3";
                    this.lightpink = "#ffb6c1";
                    this.lightsalmon = "#ffa07a";
                    this.lightseagreen = "#20b2aa";
                    this.lightskyblue = "#87cefa";
                    this.lightslategray = "#778899";
                    this.lightslategrey = "#778899";
                    this.lightsteelblue = "#b0c4de";
                    this.lightyellow = "#ffffe0";
                    this.limegreen = "#32cd32";
                    this.linen = "#faf0e6";
                    this.mediumaquamarine = "#66cdaa";
                    this.mediumblue = "#0000cd";
                    this.mediumorchid = "#ba55d3";
                    this.mediumpurple = "#9370db";
                    this.mediumseagreen = "#3cb371";
                    this.mediumslateblue = "#7b68ee";
                    this.mediumspringgreen = "#00fa9a";
                    this.mediumturquoise = "#48d1cc";
                    this.mediumvioletred = "#c71585";
                    this.midnightblue = "#191970";
                    this.mintcream = "#f5fffa";
                    this.mistyrose = "#ffe4e1";
                    this.moccasin = "#ffe4b5";
                    this.navajowhite = "#ffdead";
                    this.oldlace = "#fdf5e6";
                    this.olivedrab = "#6b8e23";
                    this.orangered = "#ff4500";
                    this.orchid = "#da70d6";
                    this.palegoldenrod = "#eee8aa";
                    this.palegreen = "#98fb98";
                    this.paleturquoise = "#afeeee";
                    this.palevioletred = "#db7093";
                    this.papayawhip = "#ffefd5";
                    this.peachpuff = "#ffdab9";
                    this.peru = "#cd853f";
                    this.pink = "#ffc0cb";
                    this.plum = "#dda0dd";
                    this.powderblue = "#b0e0e6";
                    this.rosybrown = "#bc8f8f";
                    this.royalblue = "#4169e1";
                    this.saddlebrown = "#8b4513";
                    this.salmon = "#fa8072";
                    this.sandybrown = "#f4a460";
                    this.seagreen = "#2e8b57";
                    this.seashell = "#fff5ee";
                    this.sienna = "#a0522d";
                    this.skyblue = "#87ceeb";
                    this.slateblue = "#6a5acd";
                    this.slategray = "#708090";
                    this.slategrey = "#708090";
                    this.snow = "#fffafa";
                    this.springgreen = "#00ff7f";
                    this.steelblue = "#4682b4";
                    this.tan = "#d2b48c";
                    this.thistle = "#d8bfd8";
                    this.tomato = "#ff6347";
                    this.turquoise = "#40e0d0";
                    this.violet = "#ee82ee";
                    this.wheat = "#f5deb3";
                    this.whitesmoke = "#f5f5f5";
                    this.yellowgreen = "#9acd32";
                    this.rebeccapurple = "#663399";
                }
            };
            exports_11("ColorKeywords", ColorKeywords);
            ;
            exports_11("COLORS", COLORS = new ColorKeywords());
        }
    };
});
System.register("objects/colors/color-rgba", ["objects/colors/color-keywords"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var color_keywords_1, ColorRGBA;
    return {
        setters: [
            function (color_keywords_1_1) {
                color_keywords_1 = color_keywords_1_1;
            }
        ],
        execute: function () {
            ColorRGBA = class ColorRGBA {
                constructor(r, g, b, a) {
                    this.array = new Uint8ClampedArray(3);
                    this.alpha = 0;
                    this.array[0] = r;
                    this.array[1] = g;
                    this.array[2] = b;
                    this.a = a;
                }
                get r() { return this.array[0]; }
                ;
                get g() { return this.array[1]; }
                ;
                get b() { return this.array[2]; }
                ;
                get a() { return this.alpha; }
                ;
                set a(opacity) {
                    this.alpha = (opacity < 0) ? 0 : (opacity > 1) ? 1 : opacity;
                }
                ;
                get rgb() {
                    return `rgb(${this.r}, ${this.g}, ${this.b})`;
                }
                ;
                get rgba() {
                    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
                }
                ;
                getTransparentColor(opacity) {
                    let alpha = (opacity < 0) ? 0 : (opacity > 1) ? 1 : opacity;
                    return `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`;
                }
                ;
                get hex() {
                    let byteToHex = (byte) => {
                        if (byte <= 15) {
                            return "0" + byte.toString(16);
                        }
                        else {
                            return byte.toString(16);
                        }
                    };
                    //let a = (alpha) ? Math.trunc(this.alpha * 255) : 255;
                    return `#${byteToHex(this.r)}${byteToHex(this.g)}${byteToHex(this.b)}${byteToHex(255)}`;
                }
                ;
                ;
                static fromKeyword(keyword) {
                    let hex = color_keywords_1.COLORS[keyword];
                    if (hex) {
                        return ColorRGBA.fromHex(hex);
                    }
                    else {
                        return new ColorRGBA(255, 255, 255, 1);
                    }
                }
                ;
                static fromHex(hex) {
                    const valid_hex = /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?$/i;
                    let matchs = hex.match(valid_hex);
                    if (matchs) {
                        let r = parseInt(matchs[1], 16);
                        let g = parseInt(matchs[2], 16);
                        let b = parseInt(matchs[3], 16);
                        let a = (matchs[4]) ? parseInt(matchs[4], 16) : 1;
                        return new ColorRGBA(r, g, b, 1);
                    }
                    else {
                        return new ColorRGBA(255, 255, 255, 1);
                    }
                }
                ;
            };
            exports_12("ColorRGBA", ColorRGBA);
            ;
        }
    };
});
System.register("objects/collision-gjk", ["objects/vec2"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var vec2_2, CollisionGJK;
    return {
        setters: [
            function (vec2_2_1) {
                vec2_2 = vec2_2_1;
            }
        ],
        execute: function () {
            CollisionGJK = class CollisionGJK {
                static *getCollisionResults(a, b) {
                    const create_result = (status) => {
                        return { direction: direction.object, simplex: simplex.slice(), status };
                    };
                    let is_collision = false;
                    let direction = new vec2_2.Vec2(vec2_2.Vec2.UP);
                    let simplex_vertex = this.getSupportPoint(a, b, direction);
                    let simplex = [simplex_vertex];
                    yield create_result("GJK...");
                    vec2_2.Vec2.inverse(simplex_vertex, direction);
                    let iter = 0;
                    while (!is_collision) {
                        simplex_vertex = this.getSupportPoint(a, b, direction);
                        if (vec2_2.Vec2.dot(simplex_vertex, direction) < 0.0000001)
                            break;
                        simplex.push(simplex_vertex);
                        yield create_result("GJK...");
                        switch (simplex.length) {
                            case 2:
                                CollisionGJK.checkSimplex1(simplex, direction);
                                break;
                            case 3:
                                if (CollisionGJK.checkSimplex2(simplex, direction)) {
                                    is_collision = true;
                                }
                                break;
                        }
                        iter++;
                        if (iter === 10) {
                            console.error("GJK: REACHED MAX ITERATIONS!!!");
                            break;
                        }
                    }
                    if (is_collision) {
                        yield create_result("Collision!");
                        yield* this.getDisplacementStepwise(a, b, simplex);
                    }
                    else {
                        yield create_result("No collision");
                    }
                }
                ;
                static isCollision(a, b) {
                    let dir = new vec2_2.Vec2(vec2_2.Vec2.UP);
                    let simplex_vertex = this.getSupportPoint(a, b, dir);
                    let simplex = [simplex_vertex];
                    vec2_2.Vec2.inverse(simplex_vertex, dir);
                    let is_collision = false;
                    let iter = 0;
                    while (!is_collision) {
                        simplex_vertex = this.getSupportPoint(a, b, dir);
                        if (vec2_2.Vec2.dot(simplex_vertex, dir) < 0.0000001)
                            break;
                        simplex.push(simplex_vertex);
                        switch (simplex.length) {
                            case 2:
                                CollisionGJK.checkSimplex1(simplex, dir);
                                break;
                            case 3:
                                if (CollisionGJK.checkSimplex2(simplex, dir)) {
                                    is_collision = true;
                                }
                                break;
                        }
                        iter++;
                        if (iter === 10) {
                            console.error("GJK: REACHED MAX ITERATIONS!!!");
                            break;
                        }
                    }
                    return { is_collision, simplex };
                }
                ;
                static getSupportPoint(a, b, dir) {
                    let support_a = this.getFarthestPoint(a, dir);
                    let support_b = this.getFarthestPoint(b, vec2_2.Vec2.inverse(dir));
                    return vec2_2.Vec2.subtract(support_a, support_b);
                }
                ;
                static getFarthestPoint(points, dir) {
                    let iter = (points[Symbol.iterator]());
                    let max_point = iter.next().value;
                    let max = vec2_2.Vec2.dot(max_point, dir);
                    for (let p of iter) {
                        let dp = vec2_2.Vec2.dot(p, dir);
                        if (dp > max) {
                            max_point = p;
                            max = dp;
                        }
                    }
                    return max_point;
                }
                ;
                static checkSimplex1(simplex, dir) {
                    let a = simplex[0];
                    let b = simplex[1];
                    let ba = vec2_2.Vec2.subtract(a, b);
                    let bo = vec2_2.Vec2.inverse(b);
                    let dp = vec2_2.Vec2.dot(ba, bo);
                    if (dp > 0) {
                        let right = vec2_2.Vec2.perRight(ba);
                        if (vec2_2.Vec2.dot(right, bo) < 0) {
                            vec2_2.Vec2.inverse(right, dir);
                            simplex.splice(0, 2, b, a); // Need to swap to maintain anti-clockwise winding
                        }
                        else {
                            dir.copy(right);
                        }
                    }
                    else {
                        simplex.splice(0, 1);
                        dir.copy(bo);
                    }
                }
                ;
                static checkSimplex2(simplex, dir) {
                    let a = simplex[0];
                    let b = simplex[1];
                    let c = simplex[2];
                    let co = vec2_2.Vec2.inverse(c);
                    let ca = vec2_2.Vec2.subtract(a, c);
                    let cb = vec2_2.Vec2.subtract(b, c);
                    let cb_en = vec2_2.Vec2.perLeft(cb);
                    let ca_en = vec2_2.Vec2.perRight(ca);
                    if (vec2_2.Vec2.dot(ca_en, co) > 0) {
                        if (vec2_2.Vec2.dot(ca, co) > 0) {
                            simplex.splice(1, 1);
                            dir.copy(ca_en);
                        }
                        else {
                            simplex.splice(0, 2);
                            dir.copy(co);
                        }
                    }
                    else {
                        if (vec2_2.Vec2.dot(cb_en, co) > 0) {
                            if (vec2_2.Vec2.dot(cb, co) > 0) {
                                simplex.splice(0, 2);
                                simplex.push(b);
                                dir.copy(cb_en);
                            }
                            else {
                                simplex.splice(0, 2);
                                dir.copy(co);
                            }
                        }
                        else {
                            // Triangle contains origin - collision!
                            return true;
                        }
                    }
                    return false;
                }
                ;
                static getDisplacementAARect(a, b) {
                    let directions = [vec2_2.Vec2.LEFT, vec2_2.Vec2.UP, vec2_2.Vec2.RIGHT, vec2_2.Vec2.DOWN];
                    let dist = vec2_2.Vec2.dot(this.getSupportPoint(a, b, vec2_2.Vec2.LEFT), vec2_2.Vec2.LEFT);
                    let index = 0;
                    directions.forEach((dir, i) => {
                        let d = vec2_2.Vec2.dot(this.getSupportPoint(a, b, dir), dir);
                        if (d < dist) {
                            dist = d;
                            index = i;
                        }
                    });
                    return vec2_2.Vec2.inverse(vec2_2.Vec2.scale(directions[index], dist));
                }
                ;
                static distanceSquared(a, b) {
                    let ao = vec2_2.Vec2.inverse(a);
                    let ab = vec2_2.Vec2.subtract(b, a);
                    return vec2_2.Vec2.squaredLength(ao) - ((Math.pow(vec2_2.Vec2.dot(ao, ab), 2)) / vec2_2.Vec2.squaredLength(ab));
                }
                ;
                static getClosestEdge(simplex) {
                    let length = simplex.length;
                    let index = 0;
                    let dist = this.distanceSquared(simplex[0], simplex[1]);
                    for (let i = 1; i < length; i++) {
                        let j = (i + 1) % length;
                        let d = this.distanceSquared(simplex[i], simplex[j]);
                        if (d < dist) {
                            index = i;
                            dist = d;
                        }
                    }
                    return [dist, index];
                }
                ;
                // Calculate the shortest vector from origin to polygon edge
                static getDisplacement(a, b, simplex) {
                    for (let vertex of simplex) {
                        if (vec2_2.Vec2.isZero(vertex))
                            return vec2_2.Vec2.ZERO;
                    }
                    ;
                    let [dist, index] = this.getClosestEdge(simplex);
                    let next = (index + 1) % simplex.length;
                    let closest_edge = new vec2_2.Vec2(vec2_2.Vec2.subtract(simplex[next], simplex[index]));
                    let edge_normal = new vec2_2.Vec2(vec2_2.Vec2.perRight(closest_edge));
                    let iter = 1;
                    while (iter <= 10) {
                        if (dist <= 0)
                            break;
                        let vertex = this.getSupportPoint(a, b, edge_normal);
                        let d = Math.pow(vec2_2.Vec2.dot(vertex, edge_normal), 2) / vec2_2.Vec2.squaredLength(edge_normal);
                        if (Math.abs(d - dist) < 0.0000001)
                            break;
                        // Update simplex with new point
                        simplex.splice(next, 0, vertex);
                        [dist, index] = this.getClosestEdge(simplex);
                        next = (index + 1) % simplex.length;
                        vec2_2.Vec2.subtract(simplex[next], simplex[index], closest_edge);
                        vec2_2.Vec2.perRight(closest_edge, edge_normal);
                        iter++;
                        if (iter === 10) {
                            console.error("EPA: REACHED MAX ITERATIONS!!!");
                            break;
                        }
                    }
                    let displace;
                    if (dist > 0) {
                        displace = vec2_2.Vec2.inverse(vec2_2.Vec2.scale(vec2_2.Vec2.normalise(edge_normal), Math.sqrt(dist)));
                    }
                    else {
                        displace = vec2_2.Vec2.ZERO;
                    }
                    return displace;
                }
                ;
                static *getDisplacementStepwise(a, b, simplex) {
                    for (let vertex of simplex) {
                        if (vec2_2.Vec2.isZero(vertex))
                            return;
                    }
                    ;
                    let [dist, index] = this.getClosestEdge(simplex);
                    let next = (index + 1) % simplex.length;
                    let closest_edge = new vec2_2.Vec2(vec2_2.Vec2.subtract(simplex[next], simplex[index]));
                    let edge_normal = new vec2_2.Vec2(vec2_2.Vec2.perRight(closest_edge));
                    yield { direction: edge_normal.object, simplex: simplex.slice(), status: "EPA..." };
                    let iter = 1;
                    while (iter <= 10) {
                        if (dist <= 0)
                            break;
                        let vertex = this.getSupportPoint(a, b, edge_normal);
                        let d = Math.pow(vec2_2.Vec2.dot(vertex, edge_normal), 2) / vec2_2.Vec2.squaredLength(edge_normal);
                        if (Math.abs(d - dist) < 0.0000001)
                            break;
                        simplex.splice(next, 0, vertex);
                        [dist, index] = this.getClosestEdge(simplex);
                        next = (index + 1) % simplex.length;
                        vec2_2.Vec2.subtract(simplex[next], simplex[index], closest_edge);
                        vec2_2.Vec2.perRight(closest_edge, edge_normal);
                        yield { direction: edge_normal.object, simplex: simplex.slice(), status: "EPA..." };
                        iter++;
                        if (iter === 10) {
                            console.error("EPA: REACHED MAX ITERATIONS!!!");
                        }
                    }
                    if (dist > 0) {
                        let displace = vec2_2.Vec2.inverse(vec2_2.Vec2.scale(vec2_2.Vec2.normalise(edge_normal), Math.sqrt(dist)));
                        yield { direction: displace, simplex: simplex.slice(), status: "Displacement!" };
                    }
                    else {
                        yield { direction: vec2_2.Vec2.ZERO, simplex: simplex.slice(), status: "No displacement" };
                    }
                }
                ;
            };
            exports_13("CollisionGJK", CollisionGJK);
            ;
        }
    };
});
System.register("objects/polygon", ["objects/vec2", "objects/mat2", "objects/collision-gjk"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var vec2_3, mat2_1, collision_gjk_1, Polygon;
    return {
        setters: [
            function (vec2_3_1) {
                vec2_3 = vec2_3_1;
            },
            function (mat2_1_1) {
                mat2_1 = mat2_1_1;
            },
            function (collision_gjk_1_1) {
                collision_gjk_1 = collision_gjk_1_1;
            }
        ],
        execute: function () {
            Polygon = class Polygon {
                constructor(length_, color_, index_) {
                    this.length_ = length_;
                    this.color_ = color_;
                    this.index_ = index_;
                    this.previous_position_ = new vec2_3.Vec2();
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
            };
            exports_14("Polygon", Polygon);
            ;
        }
    };
});
System.register("objects/shape-2d", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var Shape2d;
    return {
        setters: [],
        execute: function () {
            Shape2d = class Shape2d {
                /**
                 * Create a Path2D to draw an axis alligned rectangle.
                 */
                static drawRect(x, y, w, h) {
                    let path = new Path2D();
                    path.rect(x, y, w, h);
                    return path;
                }
                ;
                /**
                 * Create a Path2D to draw a polygon with given coordinates.
                 */
                static drawPolygon(polygon, width, height, closed = true) {
                    let path = new Path2D();
                    let vertices = [...Shape2d.getVertices(polygon, width, height)];
                    path.moveTo(vertices[0].x, vertices[0].y);
                    for (let i = 1; i < vertices.length; i++) {
                        path.lineTo(vertices[i].x, vertices[i].y);
                    }
                    if (closed) {
                        path.closePath();
                    }
                    return path;
                }
                ;
                static drawPoint(p, width, height, size) {
                    let half = size / 2;
                    let x = Math.trunc(0.5 * (p.x + 1) * width - half);
                    let y = Math.trunc(0.5 * (1 - p.y) * height - half);
                    let path = new Path2D();
                    path.rect(x, y, size, size);
                    return path;
                }
                ;
                static toPixels(vertex, width, height) {
                    let x = Math.trunc(0.5 * (vertex.x + 1) * width);
                    let y = Math.trunc(0.5 * (1 - vertex.y) * height);
                    return { x, y };
                }
                ;
                static *getVertices(polygon, width, height) {
                    for (let vertex of polygon) {
                        yield Shape2d.toPixels(vertex, width, height);
                    }
                }
                ;
            };
            exports_15("Shape2d", Shape2d);
            ;
        }
    };
});
System.register("objects/grid-edges", ["objects/vec2"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var vec2_4, Edge, GridEdges, GRID_EDGES;
    return {
        setters: [
            function (vec2_4_1) {
                vec2_4 = vec2_4_1;
            }
        ],
        execute: function () {
            Edge = class Edge {
                constructor(start, end, direction) {
                    this.start = start;
                    this.end = end;
                    this.direction = direction;
                }
                ;
                *[Symbol.iterator]() {
                    yield this.start;
                    yield this.end;
                }
                ;
            };
            ;
            GridEdges = class GridEdges {
                constructor() {
                    this.left = new Edge({ x: -1, y: -1 }, { x: -1, y: 1 }, vec2_4.Vec2.RIGHT);
                    this.up = new Edge({ x: -1, y: 1 }, { x: 1, y: 1 }, vec2_4.Vec2.DOWN);
                    this.right = new Edge({ x: 1, y: 1 }, { x: 1, y: -1 }, vec2_4.Vec2.LEFT);
                    this.down = new Edge({ x: 1, y: -1 }, { x: -1, y: -1 }, vec2_4.Vec2.UP);
                }
                *[Symbol.iterator]() {
                    yield this.left;
                    yield this.up;
                    yield this.right;
                    yield this.down;
                }
                ;
            };
            ;
            exports_16("GRID_EDGES", GRID_EDGES = new GridEdges());
        }
    };
});
System.register("objects/rectangle", ["objects/vec2", "objects/mat2", "objects/shape-2d", "objects/polygon", "objects/collision-gjk", "objects/grid-edges"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var vec2_5, mat2_2, shape_2d_1, polygon_1, collision_gjk_2, grid_edges_1, Rectangle;
    return {
        setters: [
            function (vec2_5_1) {
                vec2_5 = vec2_5_1;
            },
            function (mat2_2_1) {
                mat2_2 = mat2_2_1;
            },
            function (shape_2d_1_1) {
                shape_2d_1 = shape_2d_1_1;
            },
            function (polygon_1_1) {
                polygon_1 = polygon_1_1;
            },
            function (collision_gjk_2_1) {
                collision_gjk_2 = collision_gjk_2_1;
            },
            function (grid_edges_1_1) {
                grid_edges_1 = grid_edges_1_1;
            }
        ],
        execute: function () {
            Rectangle = class Rectangle extends polygon_1.Polygon {
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
                        new vec2_5.Vec2({ x: -half_w, y: +half_h }),
                        new vec2_5.Vec2({ x: +half_w, y: +half_h }),
                        new vec2_5.Vec2({ x: +half_w, y: -half_h }),
                        new vec2_5.Vec2({ x: -half_w, y: -half_h })
                    ];
                    this.updateWorldVertices();
                    this.collision_sphere = vec2_5.Vec2.length(this.local_vertices[0]) + 0.1;
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
                        if (vec2_5.Vec2.dot(this.position_, edge.direction) < this.collision_sphere) {
                            let result = collision_gjk_2.CollisionGJK.isCollision(this, edge);
                            if (result.is_collision) {
                                let displace = collision_gjk_2.CollisionGJK.getDisplacement(this, edge, result.simplex);
                                if (!vec2_5.Vec2.isZero(displace)) {
                                    displacements.push(displace);
                                }
                            }
                        }
                    }
                    if (displacements.length !== 0) {
                        let displace = displacements.reduce((prev, curr) => {
                            return vec2_5.Vec2.add(prev, curr);
                        });
                        vec2_5.Vec2.add(this.position_, displace, this.position_);
                        this.updateWorldVertices();
                    }
                }
                ;
                checkPolygonCollisions(polygon) {
                    let result = collision_gjk_2.CollisionGJK.isCollision(this, polygon);
                    if (result.is_collision) {
                        let displace = collision_gjk_2.CollisionGJK.getDisplacement(this, polygon, result.simplex);
                        if (!vec2_5.Vec2.isZero(displace)) {
                            vec2_5.Vec2.add(this.position_, displace, this.position_);
                            this.updateWorldVertices();
                        }
                    }
                }
                ;
                isPointInRect(point) {
                    let AB = vec2_5.Vec2.subtract(this.world_vertices[1], this.world_vertices[0]);
                    let AP = vec2_5.Vec2.subtract(point, this.world_vertices[0]);
                    let BC = vec2_5.Vec2.subtract(this.world_vertices[2], this.world_vertices[1]);
                    let BP = vec2_5.Vec2.subtract(point, this.world_vertices[1]);
                    let AB_AP = vec2_5.Vec2.dot(AB, AP);
                    let BC_BP = vec2_5.Vec2.dot(BC, BP);
                    return (0 <= AB_AP) && (AB_AP <= vec2_5.Vec2.dot(AB, AB)) && (0 <= BC_BP) && (BC_BP <= vec2_5.Vec2.dot(BC, BC));
                }
                ;
                translate(dt, direction) {
                    vec2_5.Vec2.add(this.position_, vec2_5.Vec2.scale(direction, this.velocity * dt), this.position_);
                    this.updateWorldVertices();
                }
                ;
                rotate(dt, angle) {
                    let theta = angle * this.turn_speed * dt;
                    let rotation = mat2_2.Mat2.fromAngle(theta);
                    mat2_2.Mat2.multiply(rotation, this.orientation_, this.orientation_);
                }
                ;
                drawShape(buffer_width, buffer_height) {
                    return shape_2d_1.Shape2d.drawPolygon(this, buffer_width, buffer_height);
                }
                ;
            };
            exports_17("Rectangle", Rectangle);
            ;
        }
    };
});
System.register("objects/arrow-2d", ["objects/vec2", "objects/shape-2d"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var vec2_6, shape_2d_2, Arrow2d;
    return {
        setters: [
            function (vec2_6_1) {
                vec2_6 = vec2_6_1;
            },
            function (shape_2d_2_1) {
                shape_2d_2 = shape_2d_2_1;
            }
        ],
        execute: function () {
            /**
             * Given a start and end position, returns a Path2D object that draws an arrow.
             */
            Arrow2d = class Arrow2d {
                constructor(half_angle, arrow_length) {
                    let angle = half_angle || Math.PI / 6;
                    let length = arrow_length || 0.05;
                    this.calculateArrowWidth(angle, length);
                }
                ;
                calculateArrowWidth(half_angle, length) {
                    this.arrow_half_angle = half_angle;
                    this.arrow_length = length;
                    this.arrow_half_width = length * Math.tan(half_angle);
                }
                ;
                getArrowhead(A, B, width, height, closed = false) {
                    let U = vec2_6.Vec2.subtract(B, A);
                    let u_length = vec2_6.Vec2.length(U);
                    let V = vec2_6.Vec2.perLeft(U);
                    let h = vec2_6.Vec2.scale(U, this.arrow_length / u_length);
                    let w = vec2_6.Vec2.scale(V, this.arrow_half_width / u_length);
                    let v1 = vec2_6.Vec2.add(vec2_6.Vec2.subtract(B, h), w);
                    let v2 = vec2_6.Vec2.subtract(vec2_6.Vec2.subtract(B, h), w);
                    let arrow = new Path2D();
                    let p1 = shape_2d_2.Shape2d.toPixels(v1, width, height);
                    let pb = shape_2d_2.Shape2d.toPixels(B, width, height);
                    let p2 = shape_2d_2.Shape2d.toPixels(v2, width, height);
                    arrow.moveTo(p1.x, p1.y);
                    arrow.lineTo(pb.x, pb.y);
                    arrow.lineTo(p2.x, p2.y);
                    if (closed) {
                        arrow.closePath();
                    }
                    return arrow;
                }
                ;
            };
            exports_18("Arrow2d", Arrow2d);
            ;
        }
    };
});
System.register("objects/active-state", ["@angular/core", "objects/vec2", "objects/input-manager", "objects/rectangle", "objects/collision-gjk", "objects/colors/color-rgba", "objects/shape-2d", "objects/arrow-2d"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_9, vec2_7, input_manager_3, rectangle_1, collision_gjk_3, color_rgba_1, shape_2d_3, arrow_2d_1, ActiveState;
    return {
        setters: [
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (vec2_7_1) {
                vec2_7 = vec2_7_1;
            },
            function (input_manager_3_1) {
                input_manager_3 = input_manager_3_1;
            },
            function (rectangle_1_1) {
                rectangle_1 = rectangle_1_1;
            },
            function (collision_gjk_3_1) {
                collision_gjk_3 = collision_gjk_3_1;
            },
            function (color_rgba_1_1) {
                color_rgba_1 = color_rgba_1_1;
            },
            function (shape_2d_3_1) {
                shape_2d_3 = shape_2d_3_1;
            },
            function (arrow_2d_1_1) {
                arrow_2d_1 = arrow_2d_1_1;
            }
        ],
        execute: function () {
            ActiveState = class ActiveState {
                constructor(input_manager) {
                    this.input_manager = input_manager;
                    this.current_index = 0;
                    this.collision_state = [];
                    this.handle_collisions_ = true;
                    this.active_polygon = 0;
                    this.points = [];
                    this.polygons = [];
                    this.polygons.push(new rectangle_1.Rectangle(new vec2_7.Vec2({ x: 0.2, y: 0.6 }), color_rgba_1.ColorRGBA.fromHex("#3cd112"), 0, 0.2, 0.3, this));
                    this.polygons.push(new rectangle_1.Rectangle(new vec2_7.Vec2({ x: 0.6, y: 0.2 }), color_rgba_1.ColorRGBA.fromHex("#ed8f04"), 1, 0.2, 0.2, this));
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
                        this.collision_state = [...collision_gjk_3.CollisionGJK.getCollisionResults(this.active, this.inactive)];
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
                            this.points.push(vec2_7.Vec2.subtract(i, j));
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
                                simplex_path = shape_2d_3.Shape2d.drawPoint(simplex[0], width, height, 8);
                                break;
                            case 2:
                                simplex_path = shape_2d_3.Shape2d.drawPolygon(simplex, width, height);
                                break;
                            default:
                                simplex_path = shape_2d_3.Shape2d.drawPolygon(simplex, width, height, true);
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
                            let end = vec2_7.Vec2.scale(vec2_7.Vec2.normalise(direction), 0.5);
                            let arrow_path = shape_2d_3.Shape2d.drawPolygon([vec2_7.Vec2.ZERO, end], width, height, false);
                            let arrow_head = arrow.getArrowhead(vec2_7.Vec2.ZERO, end, width, height, true);
                            context.strokeStyle = "rgb(18, 84, 150)";
                            context.stroke(arrow_path);
                            context.fillStyle = "rgb(18, 84, 150)";
                            context.fill(arrow_head);
                        }
                        else if (status === "Displacement!") {
                            let arrow = new arrow_2d_1.Arrow2d();
                            //let end = Vec2.scale(Vec2.normalise(direction), 0.5);
                            let arrow_path = shape_2d_3.Shape2d.drawPolygon([vec2_7.Vec2.ZERO, direction], width, height, false);
                            let arrow_head = arrow.getArrowhead(vec2_7.Vec2.ZERO, direction, width, height, true);
                            context.strokeStyle = "rgb(0, 210, 229)";
                            context.stroke(arrow_path);
                            context.fillStyle = "rgb(0, 210, 229)";
                            context.fill(arrow_head);
                        }
                    }
                    // Draw points for minkowski difference
                    for (let p of this.points) {
                        context.fillStyle = "black";
                        let point = shape_2d_3.Shape2d.drawPoint(p, width, height, 4);
                        context.fill(point);
                    }
                }
                ;
            };
            ActiveState = __decorate([
                core_9.Injectable(),
                __metadata("design:paramtypes", [input_manager_3.InputManager])
            ], ActiveState);
            exports_19("ActiveState", ActiveState);
            ;
        }
    };
});
System.register("canvas/active-canvas.component", ["@angular/core", "canvas/canvas-2d", "objects/render-loop", "objects/input-manager", "objects/active-state", "canvas/canvas-controller.component"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_10, canvas_2d_2, render_loop_2, input_manager_4, active_state_1, canvas_controller_component_1, ActiveCanvas, ActiveCanvas_1;
    return {
        setters: [
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (canvas_2d_2_1) {
                canvas_2d_2 = canvas_2d_2_1;
            },
            function (render_loop_2_1) {
                render_loop_2 = render_loop_2_1;
            },
            function (input_manager_4_1) {
                input_manager_4 = input_manager_4_1;
            },
            function (active_state_1_1) {
                active_state_1 = active_state_1_1;
            },
            function (canvas_controller_component_1_1) {
                canvas_controller_component_1 = canvas_controller_component_1_1;
            }
        ],
        execute: function () {
            ActiveCanvas = ActiveCanvas_1 = class ActiveCanvas extends canvas_2d_2.Canvas2D {
                constructor(controller, render_loop, input_manager, active_state) {
                    super();
                    this.controller = controller;
                    this.render_loop = render_loop;
                    this.input_manager = input_manager;
                    this.active_state = active_state;
                    this.buffer_width = 800;
                    this.buffer_height = 800;
                }
                ;
                afterCanvasInit() {
                    this.buffer = document.createElement("canvas");
                    this.context = this.buffer.getContext("2d");
                    this.resizeBackBuffer();
                    this.render_loop.render$.subscribe((status) => {
                        this.drawBuffer(status);
                    });
                    this.render_loop.update$.subscribe((dt) => {
                        this.updateBuffer(dt);
                    });
                }
                ;
                resizeBackBuffer() {
                    this.buffer.width = this.buffer_width;
                    this.buffer.height = this.buffer_height;
                }
                ;
                updateBuffer(dt) {
                    this.active_state.updateState(dt);
                }
                ;
                drawBuffer(factor) {
                    this.clearBuffer();
                    this.active_state.renderState(factor, this.context, this.buffer_width, this.buffer_height);
                }
                ;
                clearBuffer() {
                    this.context.clearRect(0, 0, this.buffer_width, this.buffer_height);
                }
                ;
            };
            ActiveCanvas = ActiveCanvas_1 = __decorate([
                core_10.Component({
                    selector: 'active-canvas',
                    template: `
    <canvas #canvas id="active-canvas" active-context
        [client-width]="canvas.offsetWidth" 
        [client-height]="canvas.offsetHeight"
        [client-top]="canvas.offsetTop" 
        [client-left]="canvas.offsetLeft"
        [style.z-index]="zIndex"
        [back-buffer]="buffer"
        (selectstart)="false"          
    ></canvas>
    `,
                    styles: [`
    #active-canvas {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
    }
    `],
                    providers: [{ provide: canvas_2d_2.Canvas2D, useExisting: core_10.forwardRef(() => ActiveCanvas_1) }]
                }),
                __metadata("design:paramtypes", [canvas_controller_component_1.CanvasController,
                    render_loop_2.RenderLoop,
                    input_manager_4.InputManager,
                    active_state_1.ActiveState])
            ], ActiveCanvas);
            exports_20("ActiveCanvas", ActiveCanvas);
            ;
        }
    };
});
System.register("canvas/active-context.directive", ["@angular/core", "canvas/context-2d", "objects/render-loop", "objects/input-manager", "canvas/canvas-controller.component"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var core_11, context_2d_3, render_loop_3, input_manager_5, canvas_controller_component_2, ActiveContext, ActiveContext_1;
    return {
        setters: [
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (context_2d_3_1) {
                context_2d_3 = context_2d_3_1;
            },
            function (render_loop_3_1) {
                render_loop_3 = render_loop_3_1;
            },
            function (input_manager_5_1) {
                input_manager_5 = input_manager_5_1;
            },
            function (canvas_controller_component_2_1) {
                canvas_controller_component_2 = canvas_controller_component_2_1;
            }
        ],
        execute: function () {
            ActiveContext = ActiveContext_1 = class ActiveContext extends context_2d_3.Context2D {
                constructor(controller, canvas_ref, render_loop, input_manager) {
                    super(canvas_ref);
                    this.controller = controller;
                    this.render_loop = render_loop;
                    this.input_manager = input_manager;
                }
                ;
                afterContextInit() {
                    this.render_loop.render$.subscribe((status) => {
                        this.drawContext();
                    });
                }
                ;
                updateContext() { }
                ;
                drawContext() {
                    this.clearContext();
                    // Destination
                    let dx = 0;
                    let dy = 0;
                    let dw = this.client_width;
                    let dh = this.client_height;
                    //Source
                    let sx = 0;
                    let sy = 0;
                    let sw = this.client_width;
                    let sh = this.client_height;
                    let width = this.buffer.width - this.client_width;
                    if (width < 0) {
                        dx = Math.trunc(Math.abs(width) * 0.5);
                        dw = this.buffer.width;
                        sw = this.buffer.width;
                    }
                    else if (width > 0) {
                        sx = Math.trunc(width * 0.5);
                    }
                    let height = this.buffer.height - this.client_height;
                    if (height < 0) {
                        dy = Math.trunc(Math.abs(height) * 0.5);
                        dh = this.buffer.height;
                        sh = this.buffer.height;
                    }
                    else if (height > 0) {
                        sy = Math.trunc(height * 0.5);
                    }
                    this.c2d.drawImage(this.buffer, sx, sy, sw, sh, dx, dy, dw, dh);
                    this.input_manager.setBoundaries(width, height, this.buffer.width, this.buffer.height);
                }
                ;
            };
            __decorate([
                core_11.Input("back-buffer"),
                __metadata("design:type", HTMLCanvasElement)
            ], ActiveContext.prototype, "buffer", void 0);
            ActiveContext = ActiveContext_1 = __decorate([
                core_11.Directive({
                    selector: "[active-context]",
                    providers: [{ provide: context_2d_3.Context2D, useExisting: core_11.forwardRef(() => ActiveContext_1) }]
                }),
                __metadata("design:paramtypes", [canvas_controller_component_2.CanvasController,
                    core_11.ElementRef, render_loop_3.RenderLoop,
                    input_manager_5.InputManager])
            ], ActiveContext);
            exports_21("ActiveContext", ActiveContext);
            ;
        }
    };
});
System.register("canvas/canvas.module", ["@angular/core", "@angular/common", "canvas/grid-canvas.component", "canvas/grid-context.directive", "canvas/active-canvas.component", "canvas/active-context.directive", "canvas/canvas-controller.component", "objects/render-loop", "objects/input-manager", "objects/active-state"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var core_12, common_1, grid_canvas_component_1, grid_context_directive_1, active_canvas_component_1, active_context_directive_1, canvas_controller_component_3, render_loop_4, input_manager_6, active_state_2, CanvasModule;
    return {
        setters: [
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (grid_canvas_component_1_1) {
                grid_canvas_component_1 = grid_canvas_component_1_1;
            },
            function (grid_context_directive_1_1) {
                grid_context_directive_1 = grid_context_directive_1_1;
            },
            function (active_canvas_component_1_1) {
                active_canvas_component_1 = active_canvas_component_1_1;
            },
            function (active_context_directive_1_1) {
                active_context_directive_1 = active_context_directive_1_1;
            },
            function (canvas_controller_component_3_1) {
                canvas_controller_component_3 = canvas_controller_component_3_1;
            },
            function (render_loop_4_1) {
                render_loop_4 = render_loop_4_1;
            },
            function (input_manager_6_1) {
                input_manager_6 = input_manager_6_1;
            },
            function (active_state_2_1) {
                active_state_2 = active_state_2_1;
            }
        ],
        execute: function () {
            CanvasModule = class CanvasModule {
            };
            CanvasModule = __decorate([
                core_12.NgModule({
                    imports: [common_1.CommonModule],
                    declarations: [canvas_controller_component_3.CanvasController, grid_canvas_component_1.GridCanvas, grid_context_directive_1.GridContext, active_canvas_component_1.ActiveCanvas, active_context_directive_1.ActiveContext],
                    providers: [render_loop_4.RenderLoop, input_manager_6.InputManager, active_state_2.ActiveState],
                    exports: [canvas_controller_component_3.CanvasController, grid_canvas_component_1.GridCanvas, active_canvas_component_1.ActiveCanvas]
                }),
                __metadata("design:paramtypes", [])
            ], CanvasModule);
            exports_22("CanvasModule", CanvasModule);
            ;
        }
    };
});
System.register("demo/arrow-icon.directive", ["@angular/core"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var core_13, ArrowIcon;
    return {
        setters: [
            function (core_13_1) {
                core_13 = core_13_1;
            }
        ],
        execute: function () {
            ArrowIcon = class ArrowIcon {
                constructor() {
                    this.border_left = 0;
                    this.border_right = " 16px solid aliceblue";
                    this.border_top = "12px solid transparent";
                    this.border_bottom = "12px solid transparent";
                }
                ;
                ngOnChanges(changes) { }
                ;
            };
            __decorate([
                core_13.Input(),
                __metadata("design:type", String)
            ], ArrowIcon.prototype, "arrow_color", void 0);
            __decorate([
                core_13.Input(),
                __metadata("design:type", String)
            ], ArrowIcon.prototype, "arrow_direction", void 0);
            __decorate([
                core_13.Input(),
                __metadata("design:type", String)
            ], ArrowIcon.prototype, "arrow_size", void 0);
            __decorate([
                core_13.HostBinding("style.border-left"),
                __metadata("design:type", Object)
            ], ArrowIcon.prototype, "border_left", void 0);
            __decorate([
                core_13.HostBinding("style.border-right"),
                __metadata("design:type", Object)
            ], ArrowIcon.prototype, "border_right", void 0);
            __decorate([
                core_13.HostBinding("style.border-top"),
                __metadata("design:type", Object)
            ], ArrowIcon.prototype, "border_top", void 0);
            __decorate([
                core_13.HostBinding("style.border-bottom"),
                __metadata("design:type", Object)
            ], ArrowIcon.prototype, "border_bottom", void 0);
            ArrowIcon = __decorate([
                core_13.Component({
                    selector: "arrow-icon",
                    template: "",
                    styles: [
                        `:host {
        margin: auto;
        display: inline-block;
        width: 0;
        height: 0;
    }
    `
                    ]
                }),
                __metadata("design:paramtypes", [])
            ], ArrowIcon);
            exports_23("ArrowIcon", ArrowIcon);
            ;
        }
    };
});
System.register("demo/demo.component", ["@angular/core", "canvas/canvas-2d", "objects/render-loop", "objects/active-state"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var core_14, canvas_2d_3, render_loop_5, active_state_3, Demo;
    return {
        setters: [
            function (core_14_1) {
                core_14 = core_14_1;
            },
            function (canvas_2d_3_1) {
                canvas_2d_3 = canvas_2d_3_1;
            },
            function (render_loop_5_1) {
                render_loop_5 = render_loop_5_1;
            },
            function (active_state_3_1) {
                active_state_3 = active_state_3_1;
            }
        ],
        execute: function () {
            Demo = class Demo {
                constructor(render_loop, active_state) {
                    this.render_loop = render_loop;
                    this.active_state = active_state;
                }
                ;
                ngAfterViewInit() {
                    let initPromises = this.canvas_list.map(canvas => {
                        return canvas.initialise();
                    });
                    Promise.all(initPromises).then((all) => {
                        this.render_loop.beginLoop();
                    });
                }
                ;
                ngOnDestroy() {
                    this.render_loop.stopLoop();
                }
                ;
            };
            __decorate([
                core_14.ViewChildren(canvas_2d_3.Canvas2D),
                __metadata("design:type", core_14.QueryList)
            ], Demo.prototype, "canvas_list", void 0);
            Demo = __decorate([
                core_14.Component({
                    selector: "demo",
                    template: `
    <header id="title-bar"><p>2D Collisions - GJK - EPA</p></header>
    <div id="control-panel">
        <button id="collision-toggle" (click)="active_state.toggleCollisions()">Collisions: <span [class.is-collision]="active_state.is_collisions">On</span> | <span [class.is-collision]="!active_state.is_collisions">Off</span></button>
        <p id="status-text">Step: {{ active_state.current_index }}<br>Status: {{ active_state.getStatus() }}</p>
        <button id="previous-btn" class="sim-btn" (click)="active_state.previous()" [disabled]="active_state.current_index === 0"><arrow-icon></arrow-icon>
        </button><button id="next-btn" class="sim-btn" (click)="active_state.next()">{{ active_state.current_index === 0 ? "Start" : "Next" }}
        </button><button id="exit-btn" class="sim-btn" (click)="active_state.exit()" [disabled]="active_state.current_index === 0">&#x2716;</button>
    </div>
    <grid-canvas [z-index]="0"></grid-canvas>
    <active-canvas [z-index]="1" canvas-controller></active-canvas>
    <footer>Source Code: <a href="https://github.com/dppower/gjk-demo">dppower/gjk-demo</a></footer>
    `,
                    styles: [`
    :host {
        background-color: #f6f7ee;
        width: 100%;
        height: 100%;
        display: block;
    }
    `]
                }),
                __metadata("design:paramtypes", [render_loop_5.RenderLoop, active_state_3.ActiveState])
            ], Demo);
            exports_24("Demo", Demo);
        }
    };
});
System.register("demo/demo.module", ["@angular/core", "@angular/common", "canvas/canvas.module", "demo/arrow-icon.directive", "demo/demo.component"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var core_15, common_2, canvas_module_1, arrow_icon_directive_1, demo_component_1, DemoModule;
    return {
        setters: [
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            },
            function (canvas_module_1_1) {
                canvas_module_1 = canvas_module_1_1;
            },
            function (arrow_icon_directive_1_1) {
                arrow_icon_directive_1 = arrow_icon_directive_1_1;
            },
            function (demo_component_1_1) {
                demo_component_1 = demo_component_1_1;
            }
        ],
        execute: function () {
            DemoModule = class DemoModule {
            };
            DemoModule = __decorate([
                core_15.NgModule({
                    imports: [common_2.CommonModule, canvas_module_1.CanvasModule],
                    declarations: [demo_component_1.Demo, arrow_icon_directive_1.ArrowIcon],
                    exports: [demo_component_1.Demo]
                }),
                __metadata("design:paramtypes", [])
            ], DemoModule);
            exports_25("DemoModule", DemoModule);
            ;
        }
    };
});
System.register("app.module", ["@angular/core", "@angular/platform-browser", "app-main.component", "demo/demo.module"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var core_16, platform_browser_1, app_main_component_1, demo_module_1, AppModule;
    return {
        setters: [
            function (core_16_1) {
                core_16 = core_16_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (app_main_component_1_1) {
                app_main_component_1 = app_main_component_1_1;
            },
            function (demo_module_1_1) {
                demo_module_1 = demo_module_1_1;
            }
        ],
        execute: function () {
            AppModule = class AppModule {
            };
            AppModule = __decorate([
                core_16.NgModule({
                    imports: [platform_browser_1.BrowserModule, demo_module_1.DemoModule],
                    declarations: [app_main_component_1.AppMain],
                    bootstrap: [app_main_component_1.AppMain]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_26("AppModule", AppModule);
            ;
        }
    };
});
System.register("main", ["@angular/core", "@angular/platform-browser-dynamic", "app.module"], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var core_17, platform_browser_dynamic_1, app_module_1;
    return {
        setters: [
            function (core_17_1) {
                core_17 = core_17_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            }
        ],
        execute: function () {
            core_17.enableProdMode();
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
        }
    };
});
