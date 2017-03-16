import { Component, HostBinding, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: "arrow-icon",
    template: "",
    styles: [
    `:host {
        margin: auto;
        display: inline-block;
        width: 0;
        height: 0;
    }
    `]
})
export class ArrowIcon implements OnChanges {

    @Input() arrow_color: string;
    @Input() arrow_direction: "left" | "right" | "up" | "down";
    @Input() arrow_size: "small" | "medium" | "large";
    
    @HostBinding("style.border-left") border_left = 0;
    @HostBinding("style.border-right") border_right =" 16px solid aliceblue";
    @HostBinding("style.border-top") border_top = "12px solid transparent";
    @HostBinding("style.border-bottom") border_bottom = "12px solid transparent";

    constructor() { };

    ngOnChanges(changes: SimpleChanges) { };
};