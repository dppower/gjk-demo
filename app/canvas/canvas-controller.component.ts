import { Directive, HostListener, HostBinding } from "@angular/core";

import { InputManager } from "../objects/input-manager";
import { Vec2 } from "../objects/vec2";

@Directive({
    selector: "[canvas-controller]"
})
export class CanvasController {

    constructor(private input_manager_: InputManager) { };

    @HostListener("contextmenu", ["$event"])
    disableContext(event: MouseEvent) {
        return false;
    };

    @HostListener("mousemove", ["$event"])
    setMousePosition(event: MouseEvent) {
        this.input_manager_.setMousePosition({ x: event.clientX, y: event.clientY });
    };

    @HostListener("wheel", ["$event"])
    setMouseWheel(event: WheelEvent) {
        let scroll: 1 | -1 = (event.deltaY > 0) ? 1 : -1;

        this.input_manager_.setWheelDirection(scroll);
    };

    @HostListener("mouseup", ["$event"])
    setMouseUp(event: MouseEvent) {
        event.stopPropagation();
        if (event.button == 0) {
            this.input_manager_.setMouseButton("left", false);
        }
        else if (event.button == 2) {
            this.input_manager_.setMouseButton("right", false);
        }
    };

    @HostListener("mousedown", ["$event"])
    setMouseDown(event: MouseEvent) {
        event.stopPropagation();
        if (event.button == 0) {
            this.input_manager_.setMouseButton("left", true);
        }
        else if (event.button == 2) {
            this.input_manager_.setMouseButton("right", true);
        }
    };

    @HostListener("document:keydown", ["$event"])
    setKeyDown(event: KeyboardEvent) {
        this.input_manager_.setKeyDown(event.code);

        return false;
    };

    @HostListener("document:keyup", ["$event"])
    setKeyUp(event: KeyboardEvent) {
        this.input_manager_.setKeyUp(event.code);

        return false;
    };

    //@HostListener("selectstart", ["$event"])
    //selectStarted(event: Event) {
    //    console.log("canvas selected");
    //    //event.stopPropagation();
    //    //return false;
    //};

    @HostListener("document:selectionchange", ["$event"])
    selectionChanged(event: Event) {

        let selection = document.getSelection();
        let focus_node = selection.focusNode && selection.focusNode.parentNode;
        let anchor_node = selection.anchorNode && selection.anchorNode.parentNode;

        if (focus_node !== anchor_node) {
            let range = new Range();
            range.selectNodeContents(focus_node);

            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
}