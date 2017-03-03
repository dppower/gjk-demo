import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CanvasModule } from "../canvas/canvas.module";
import { Demo } from "./demo.component";

@NgModule({
    imports: [ CommonModule, CanvasModule ],
    declarations: [ Demo ],
    exports: [ Demo ]
})
export class DemoModule { };