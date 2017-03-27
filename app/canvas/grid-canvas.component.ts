import { Component, forwardRef } from "@angular/core";

import { Canvas2D } from "./canvas-2d";

@Component({
    selector: "grid-canvas",
    template: `
    <canvas #canvas id="grid-canvas" grid-context
        [client-width]="canvas.offsetWidth" 
        [client-height]="canvas.offsetHeight"
        [client-top]="canvas.offsetTop" 
        [client-left]="canvas.offsetLeft"
        [style.z-index]="z_index"
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
    providers: [{ provide: Canvas2D, useExisting: forwardRef(() => GridCanvas) }]
})
export class GridCanvas extends Canvas2D {

    buffer: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    readonly buffer_width = 800;
    readonly buffer_height = 800;

    afterCanvasInit() {
        this.buffer = document.createElement("canvas");
        this.context = this.buffer.getContext("2d");
        
        this.resizeBuffer();
        this.drawBuffer();
    };

    resizeBuffer() {
        this.buffer.width = this.buffer_width;
        this.buffer.height = this.buffer_height;
    };

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
    };
};