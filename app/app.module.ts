import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppMain } from "./app-main.component";
import { DemoModule } from "./demo/demo.module";

@NgModule({
    imports: [ BrowserModule, DemoModule ],
    declarations: [ AppMain ],
    bootstrap: [ AppMain ]
})
export class AppModule { };