import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GridCanvas } from "./grid-canvas.component";
import { GridContext } from "./grid-context.directive";
import { ActiveCanvas } from "./active-canvas.component";
import { ActiveContext } from "./active-context.directive";
import { CanvasController } from "./canvas-controller.component";

import { RenderLoop } from "../objects/render-loop";
import { InputManager } from "../objects/input-manager";
import { ActiveState } from "../objects/active-state";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ CanvasController, GridCanvas, GridContext, ActiveCanvas, ActiveContext ],
    providers: [ RenderLoop, InputManager, ActiveState ],
    exports: [ CanvasController, GridCanvas, ActiveCanvas ]
})
export class CanvasModule { };