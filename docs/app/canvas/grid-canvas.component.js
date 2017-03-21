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
let GridCanvas = GridCanvas_1 = class GridCanvas extends canvas_2d_1.Canvas2D {
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
    core_1.Component({
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
        providers: [{ provide: canvas_2d_1.Canvas2D, useExisting: core_1.forwardRef(() => GridCanvas_1) }]
    }),
    __metadata("design:paramtypes", [])
], GridCanvas);
exports.GridCanvas = GridCanvas;
;
var GridCanvas_1;
