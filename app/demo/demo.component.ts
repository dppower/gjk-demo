import { Component, ViewChildren, QueryList, AfterViewInit, OnDestroy } from "@angular/core";

import { Canvas2D } from "../canvas/canvas-2d";
import { RenderLoop } from "../objects/render-loop";
import { ActiveState } from "../objects/active-state";

@Component({
    selector: "demo",
    template: `
    <header id="title-bar"><p>2D Collisions - GJK - EPA</p></header>
    <div id="control-panel">
        <button id="collision-toggle" (click)="active_state.toggleCollisions()">Collisions: <span [class.is-collision]="active_state.is_collisions">On</span> | <span [class.is-collision]="!active_state.is_collisions">Off</span></button>
        <p id="status-text">Step: {{ active_state.current_index }}<br>Status: {{ active_state.getStatus() }}</p>
        <button id="previous-btn" class="sim-btn" (click)="active_state.previous()" [disabled]="active_state.current_index === 0"><arrow-icon></arrow-icon>
        </button><button id="next-btn" class="sim-btn" (click)="active_state.next()">{{ active_state.current_index === 0 ? "Start" : "Next" }}
        </button><button id="exit-btn" class="sim-btn" (click)="active_state.exit()" [disabled]="active_state.current_index === 0">&#x2716;</button>
        <div id="instructions">
            <p>Use left-click to select polygon.</p>
            <p>Use W, A, S, D to move.</p>
            <p>Use Q and E to rotate.</p>
            <p>Collisions can be toggled on and off to overlap polygons.</p>
            <p>Begin stepping through the algorithm by pressing start.</p>
        </div>
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
})
export class Demo implements AfterViewInit, OnDestroy {
    
    @ViewChildren(Canvas2D) canvas_list: QueryList<Canvas2D>;

    constructor(private render_loop: RenderLoop, public active_state: ActiveState) { };

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