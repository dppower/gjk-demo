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
const input_manager_1 = require("../objects/input-manager");
let CanvasController = class CanvasController {
    constructor(input_manager_) {
        this.input_manager_ = input_manager_;
    }
    ;
    disableContext(event) {
        return false;
    }
    ;
    setMousePosition(event) {
        this.input_manager_.setMousePosition({ x: event.clientX, y: event.clientY });
    }
    ;
    setMouseWheel(event) {
        let scroll = (event.deltaY > 0) ? 1 : -1;
        this.input_manager_.setWheelDirection(scroll);
    }
    ;
    setMouseUp(event) {
        event.stopPropagation();
        if (event.button == 0) {
            this.input_manager_.setMouseButton("left", false);
        }
        else if (event.button == 2) {
            this.input_manager_.setMouseButton("right", false);
        }
    }
    ;
    setMouseDown(event) {
        event.stopPropagation();
        if (event.button == 0) {
            this.input_manager_.setMouseButton("left", true);
        }
        else if (event.button == 2) {
            this.input_manager_.setMouseButton("right", true);
        }
    }
    ;
    setKeyDown(event) {
        this.input_manager_.setKeyDown(event.code);
        return false;
    }
    ;
    setKeyUp(event) {
        this.input_manager_.setKeyUp(event.code);
        return false;
    }
    ;
    //@HostListener("selectstart", ["$event"])
    //selectStarted(event: Event) {
    //    console.log("canvas selected");
    //    //event.stopPropagation();
    //    //return false;
    //};
    selectionChanged(event) {
        let selection = document.getSelection();
        let focus_node = selection.focusNode && selection.focusNode.parentNode;
        let anchor_node = selection.anchorNode && selection.anchorNode.parentNode;
        if (focus_node !== anchor_node) {
            let range = new Range();
            range.selectNodeContents(focus_node);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    ;
};
__decorate([
    core_1.HostListener("contextmenu", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], CanvasController.prototype, "disableContext", null);
__decorate([
    core_1.HostListener("mousemove", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], CanvasController.prototype, "setMousePosition", null);
__decorate([
    core_1.HostListener("wheel", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WheelEvent]),
    __metadata("design:returntype", void 0)
], CanvasController.prototype, "setMouseWheel", null);
__decorate([
    core_1.HostListener("mouseup", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], CanvasController.prototype, "setMouseUp", null);
__decorate([
    core_1.HostListener("mousedown", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], CanvasController.prototype, "setMouseDown", null);
__decorate([
    core_1.HostListener("document:keydown", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], CanvasController.prototype, "setKeyDown", null);
__decorate([
    core_1.HostListener("document:keyup", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], CanvasController.prototype, "setKeyUp", null);
__decorate([
    core_1.HostListener("document:selectionchange", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], CanvasController.prototype, "selectionChanged", null);
CanvasController = __decorate([
    core_1.Directive({
        selector: "[canvas-controller]"
    }),
    __metadata("design:paramtypes", [input_manager_1.InputManager])
], CanvasController);
exports.CanvasController = CanvasController;
//# sourceMappingURL=canvas-controller.component.js.map