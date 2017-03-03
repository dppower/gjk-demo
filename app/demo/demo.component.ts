import { Component, ViewChildren, QueryList, AfterViewInit, OnDestroy } from "@angular/core";

import { Canvas2D } from "../canvas/canvas-2d";
import { RenderLoop } from "../objects/render-loop";

@Component({
    selector: "demo",
    template: `
    <header id="title-bar"><p>2D Collisions - GJK - EPA</p></header>
    <grid-canvas [z-index]="0"></grid-canvas>
    <active-canvas [z-index]="1" canvas-controller></active-canvas>
    `,
    styles: [`
    #title-bar {
    }
    `]
})
export class Demo implements AfterViewInit, OnDestroy {
    
    @ViewChildren(Canvas2D) canvas_list: QueryList<Canvas2D>;

    constructor(private render_loop: RenderLoop) { };

    ngAfterViewInit() {
        let initPromises = this.canvas_list.map(canvas => {
            return canvas.initialise();
        });

        Promise.all(initPromises).then((all) => {
            this.render_loop.beginLoop();
        });
    };

    ngOnDestroy() {
        this.render_loop.stopLoop();
    };
}