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
const canvas_2d_1 = require("./canvas-2d");
const render_loop_1 = require("../objects/render-loop");
const input_manager_1 = require("../objects/input-manager");
const active_state_1 = require("../objects/active-state");
const canvas_controller_component_1 = require("./canvas-controller.component");
let ActiveCanvas = ActiveCanvas_1 = class ActiveCanvas extends canvas_2d_1.Canvas2D {
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
    core_1.Component({
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
        providers: [{ provide: canvas_2d_1.Canvas2D, useExisting: core_1.forwardRef(() => ActiveCanvas_1) }]
    }),
    __metadata("design:paramtypes", [canvas_controller_component_1.CanvasController,
        render_loop_1.RenderLoop,
        input_manager_1.InputManager,
        active_state_1.ActiveState])
], ActiveCanvas);
exports.ActiveCanvas = ActiveCanvas;
;
var ActiveCanvas_1;
