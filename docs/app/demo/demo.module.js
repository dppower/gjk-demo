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
const canvas_module_1 = require("../canvas/canvas.module");
const arrow_icon_directive_1 = require("./arrow-icon.directive");
const demo_component_1 = require("./demo.component");
let DemoModule = class DemoModule {
};
DemoModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, canvas_module_1.CanvasModule],
        declarations: [demo_component_1.Demo, arrow_icon_directive_1.ArrowIcon],
        exports: [demo_component_1.Demo]
    }),
    __metadata("design:paramtypes", [])
], DemoModule);
exports.DemoModule = DemoModule;
;
