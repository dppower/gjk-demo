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
class Context2D {
    constructor(canvas_ref) {
        this.canvas_ref = canvas_ref;
        this.is_resizing = false;
        this.has_resized = false;
    }
    ;
    ngOnChanges(changes) {
        if (changes["client_width"] || changes["client_height"]) {
            this.canvas_width = this.client_width;
            this.canvas_height = this.client_height;
            this.is_resizing = true;
        }
    }
    ;
    isContextResizing() {
        return this.is_resizing;
    }
    ;
    hasContextResized() {
        return this.has_resized && !this.is_resizing;
    }
    ;
    createContext() {
        this.c2d = this.canvas_ref.nativeElement.getContext("2d");
        if (this.c2d) {
            this.afterContextInit();
            return true;
        }
        return false;
    }
    ;
    clearContext() {
        this.c2d.clearRect(0, 0, this.canvas_width, this.canvas_height);
    }
    ;
}
__decorate([
    core_1.HostBinding("width"),
    __metadata("design:type", Number)
], Context2D.prototype, "canvas_width", void 0);
__decorate([
    core_1.HostBinding("height"),
    __metadata("design:type", Number)
], Context2D.prototype, "canvas_height", void 0);
__decorate([
    core_1.Input("client-width"),
    __metadata("design:type", Number)
], Context2D.prototype, "client_width", void 0);
__decorate([
    core_1.Input("client-height"),
    __metadata("design:type", Number)
], Context2D.prototype, "client_height", void 0);
__decorate([
    core_1.Input("client-top"),
    __metadata("design:type", Number)
], Context2D.prototype, "client_top", void 0);
__decorate([
    core_1.Input("client-left"),
    __metadata("design:type", Number)
], Context2D.prototype, "client_left", void 0);
exports.Context2D = Context2D;
;
