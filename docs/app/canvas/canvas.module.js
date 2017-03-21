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
const common_1 = require("@angular/common");
const grid_canvas_component_1 = require("./grid-canvas.component");
const grid_context_directive_1 = require("./grid-context.directive");
const active_canvas_component_1 = require("./active-canvas.component");
const active_context_directive_1 = require("./active-context.directive");
const canvas_controller_component_1 = require("./canvas-controller.component");
const render_loop_1 = require("../objects/render-loop");
const input_manager_1 = require("../objects/input-manager");
const active_state_1 = require("../objects/active-state");
let CanvasModule = class CanvasModule {
};
CanvasModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [canvas_controller_component_1.CanvasController, grid_canvas_component_1.GridCanvas, grid_context_directive_1.GridContext, active_canvas_component_1.ActiveCanvas, active_context_directive_1.ActiveContext],
        providers: [render_loop_1.RenderLoop, input_manager_1.InputManager, active_state_1.ActiveState],
        exports: [canvas_controller_component_1.CanvasController, grid_canvas_component_1.GridCanvas, active_canvas_component_1.ActiveCanvas]
    }),
    __metadata("design:paramtypes", [])
], CanvasModule);
exports.CanvasModule = CanvasModule;
;
