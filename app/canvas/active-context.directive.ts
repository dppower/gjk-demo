import { Directive, ElementRef, Input, forwardRef } from "@angular/core";

import { Context2D } from "./context-2d";
import { RenderLoop } from "../objects/render-loop";
import { InputManager } from "../objects/input-manager";
import { CanvasController } from "./canvas-controller.component";

@Directive({
    selector: "[active-context]",
    providers: [{ provide: Context2D, useExisting: forwardRef(() => ActiveContext) }]
})
export class ActiveContext extends Context2D {

    @Input("back-buffer") buffer: HTMLCanvasElement;

    constructor(
        private controller: CanvasController,
        canvas_ref: ElementRef, private render_loop: RenderLoop,
        private input_manager: InputManager
    ) { 
        super(canvas_ref);
    };

    afterContextInit() {
        this.render_loop.render$.subscribe((status) => {
            this.drawContext();
        });
    };

    updateContext() { };

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
    };
};