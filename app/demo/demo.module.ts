import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CanvasModule } from "../canvas/canvas.module";
import { ArrowIcon } from "./arrow-icon.directive";
import { Demo } from "./demo.component";

@NgModule({
    imports: [ CommonModule, CanvasModule ],
    declarations: [ Demo, ArrowIcon ],
    exports: [ Demo ]
})
export class DemoModule { };