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
const context_2d_1 = require("./context-2d");
const render_loop_1 = require("../objects/render-loop");
const input_manager_1 = require("../objects/input-manager");
const canvas_controller_component_1 = require("./canvas-controller.component");
let ActiveContext = ActiveContext_1 = class ActiveContext extends context_2d_1.Context2D {
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
    core_1.Input("back-buffer"),
    __metadata("design:type", HTMLCanvasElement)
], ActiveContext.prototype, "buffer", void 0);
ActiveContext = ActiveContext_1 = __decorate([
    core_1.Directive({
        selector: "[active-context]",
        providers: [{ provide: context_2d_1.Context2D, useExisting: core_1.forwardRef(() => ActiveContext_1) }]
    }),
    __metadata("design:paramtypes", [canvas_controller_component_1.CanvasController,
        core_1.ElementRef, render_loop_1.RenderLoop,
        input_manager_1.InputManager])
], ActiveContext);
exports.ActiveContext = ActiveContext;
;
var ActiveContext_1;
//# sourceMappingURL=active-context.directive.js.map