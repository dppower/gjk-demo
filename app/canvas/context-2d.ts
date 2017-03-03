import { ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from "@angular/core";

export abstract class Context2D implements OnChanges {

    @HostBinding("width") canvas_width;
    @HostBinding("height") canvas_height;

    @Input("client-width") client_width: number;
    @Input("client-height") client_height: number;
    @Input("client-top") client_top: number;
    @Input("client-left") client_left: number;

    protected c2d: CanvasRenderingContext2D;
    protected is_resizing = false;
    protected has_resized = false;

    constructor(protected canvas_ref: ElementRef) {
    };

    ngOnChanges(changes: SimpleChanges) {
        if (changes["client_width"] || changes["client_height"]) {
            this.canvas_width = this.client_width;
            this.canvas_height = this.client_height;
            this.is_resizing = true;
        }
    };

    isContextResizing() {
        return this.is_resizing;
    };

    hasContextResized() {
        return this.has_resized && !this.is_resizing;
    };

    createContext() {
        this.c2d = (<HTMLCanvasElement>this.canvas_ref.nativeElement).getContext("2d");
        if (this.c2d) {
            this.afterContextInit();
            return true;
        }
        return false;
    };

    abstract afterContextInit(): void;

    abstract updateContext(): void;

    abstract drawContext(): void;

    clearContext() {
        this.c2d.clearRect(0, 0, this.canvas_width, this.canvas_height);
    };
};