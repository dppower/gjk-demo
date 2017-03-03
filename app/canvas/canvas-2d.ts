import { ViewChild, Input } from "@angular/core";

import { CanvasController } from "./canvas-controller.component";
import { Context2D } from "./context-2d";

export abstract class Canvas2D {

    @Input("z-index") z_index: number;

    @ViewChild(Context2D) context_2d: Context2D;

    constructor() { };

    initialise() {
        return new Promise<boolean>((resolve, reject) => {
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
    };

    abstract afterCanvasInit();
}