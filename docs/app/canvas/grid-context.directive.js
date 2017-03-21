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
let GridContext = GridContext_1 = class GridContext extends context_2d_1.Context2D {
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
    core_1.Input("back-buffer"),
    __metadata("design:type", HTMLCanvasElement)
], GridContext.prototype, "buffer", void 0);
GridContext = GridContext_1 = __decorate([
    core_1.Directive({
        selector: "[grid-context]",
        providers: [{ provide: context_2d_1.Context2D, useExisting: core_1.forwardRef(() => GridContext_1) }]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, render_loop_1.RenderLoop])
], GridContext);
exports.GridContext = GridContext;
;
var GridContext_1;
