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
class Canvas2D {
    constructor() { }
    ;
    initialise() {
        return new Promise((resolve, reject) => {
            if (this.context_2d.createContext()) {
                setTimeout(() => {
                    this.afterCanvasInit();
                    resolve(true);
                }, 0);
            }
            else {
                reject();
            }
        });
    }
    ;
}
__decorate([
    core_1.Input("z-index"),
    __metadata("design:type", Number)
], Canvas2D.prototype, "z_index", void 0);
__decorate([
    core_1.ViewChild(context_2d_1.Context2D),
    __metadata("design:type", context_2d_1.Context2D)
], Canvas2D.prototype, "context_2d", void 0);
exports.Canvas2D = Canvas2D;
