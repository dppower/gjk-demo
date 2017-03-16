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
let ArrowIcon = class ArrowIcon {
    constructor() {
        this.border_left = 0;
        this.border_right = " 16px solid aliceblue";
        this.border_top = "12px solid transparent";
        this.border_bottom = "12px solid transparent";
    }
    ;
    ngOnChanges(changes) { }
    ;
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ArrowIcon.prototype, "arrow_color", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ArrowIcon.prototype, "arrow_direction", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ArrowIcon.prototype, "arrow_size", void 0);
__decorate([
    core_1.HostBinding("style.border-left"),
    __metadata("design:type", Object)
], ArrowIcon.prototype, "border_left", void 0);
__decorate([
    core_1.HostBinding("style.border-right"),
    __metadata("design:type", Object)
], ArrowIcon.prototype, "border_right", void 0);
__decorate([
    core_1.HostBinding("style.border-top"),
    __metadata("design:type", Object)
], ArrowIcon.prototype, "border_top", void 0);
__decorate([
    core_1.HostBinding("style.border-bottom"),
    __metadata("design:type", Object)
], ArrowIcon.prototype, "border_bottom", void 0);
ArrowIcon = __decorate([
    core_1.Component({
        selector: "arrow-icon",
        template: "",
        styles: [
            `:host {
        margin: auto;
        display: inline-block;
        width: 0;
        height: 0;
    }
    `
        ]
    }),
    __metadata("design:paramtypes", [])
], ArrowIcon);
exports.ArrowIcon = ArrowIcon;
;
//# sourceMappingURL=arrow-icon.directive.js.map