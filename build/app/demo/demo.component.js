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
const canvas_2d_1 = require("../canvas/canvas-2d");
const render_loop_1 = require("../objects/render-loop");
const active_state_1 = require("../objects/active-state");
let Demo = class Demo {
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
    core_1.ViewChildren(canvas_2d_1.Canvas2D),
    __metadata("design:type", core_1.QueryList)
], Demo.prototype, "canvas_list", void 0);
Demo = __decorate([
    core_1.Component({
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
    __metadata("design:paramtypes", [render_loop_1.RenderLoop, active_state_1.ActiveState])
], Demo);
exports.Demo = Demo;
//# sourceMappingURL=demo.component.js.map