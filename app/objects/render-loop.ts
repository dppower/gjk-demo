import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Rx";

import { InputManager } from "./input-manager";

type updateFunction = (alpha: number) => void;

@Injectable()
export class RenderLoop {
    get fps() {
        return this.frames_per_second;
    };

    private cancel_token: number;
    private previous_time = 0;
    private time_step = 1000 / 60.0;
    private accumulated_time = 0;

    // fps
    private frames_per_second = 60;
    private last_fps_update: number;
    private frames_this_second = 0;

    readonly render$ = new Subject<number>();
    readonly update$ = new Subject<number>();

    private renderUpdateList = new Map<string, updateFunction>();

    constructor(private input_manager: InputManager) { };

    beginLoop() {
        console.log(`render loop begins.`);
        this.cancel_token = requestAnimationFrame((time: number) => {
            this.last_fps_update = performance.now();
            this.updateLoop(time);
        });
    };
    
    fixedUpdate(interval: number) {
        this.update$.next(interval);
    };

    renderUpdate(factor: number) {
        //this.renderUpdateList.forEach((fn) => fn(factor));
        this.render$.next(factor);
    };

    updateLoop(time_now: number) {

        this.cancel_token = requestAnimationFrame((time: number) => {
            this.updateLoop(time);
        });

        if (time_now > this.last_fps_update + 1000) { // update every second
            this.frames_per_second = 0.25 * this.frames_this_second + (1 - 0.25) * this.frames_per_second;
            // Reset
            this.last_fps_update = time_now;
            this.frames_this_second = 0;
        }
        this.frames_this_second++;

        let delta_time = time_now - this.previous_time;
        this.accumulated_time += delta_time;
        while (this.accumulated_time > this.time_step) {
            // Update
            this.fixedUpdate(this.time_step);
            this.accumulated_time -= this.time_step;
        }
        
        this.previous_time = time_now;

        let alpha = this.accumulated_time / this.time_step;
        this.renderUpdate(alpha);

        this.input_manager.update();
    };

    stopLoop() {
        cancelAnimationFrame(this.cancel_token);
    };
};