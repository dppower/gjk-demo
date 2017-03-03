import { Component, Input, forwardRef } from "@angular/core";

import { Canvas2D } from "./canvas-2d";
import { RenderLoop } from "../objects/render-loop";
import { InputManager } from "../objects/input-manager";
import { ActiveState } from "../objects/active-state";
import { CanvasController } from "./canvas-controller.component";

@Component({
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
    providers: [{ provide: Canvas2D, useExisting: forwardRef(() => ActiveCanvas) }]
})
export class ActiveCanvas extends Canvas2D {

    constructor(
        private controller: CanvasController,
        private render_loop: RenderLoop,
        private input_manager: InputManager,
        private active_state: ActiveState
    ) {
        super();
    };

    buffer: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    readonly buffer_width = 800;
    readonly buffer_height = 800;

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
    };

    resizeBackBuffer() {
        this.buffer.width = this.buffer_width;
        this.buffer.height = this.buffer_height;
    };

    updateBuffer(dt: number) {
        this.active_state.updateState(dt);
    };

    drawBuffer(factor: number) {
        this.clearBuffer();
        this.active_state.renderState(factor, this.context, this.buffer_width, this.buffer_height)
    };

    clearBuffer() {
        this.context.clearRect(0, 0, this.buffer_width, this.buffer_height);
    };
};