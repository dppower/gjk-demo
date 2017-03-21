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
const Rx_1 = require("rxjs/Rx");
const input_manager_1 = require("./input-manager");
let RenderLoop = class RenderLoop {
    constructor(input_manager) {
        this.input_manager = input_manager;
        this.previous_time = 0;
        this.time_step = 1000 / 60.0;
        this.accumulated_time = 0;
        // fps
        this.frames_per_second = 60;
        this.frames_this_second = 0;
        this.render$ = new Rx_1.Subject();
        this.update$ = new Rx_1.Subject();
        this.renderUpdateList = new Map();
    }
    get fps() {
        return this.frames_per_second;
    }
    ;
    ;
    beginLoop() {
        console.log(`render loop begins.`);
        this.cancel_token = requestAnimationFrame((time) => {
            this.last_fps_update = performance.now();
            this.updateLoop(time);
        });
    }
    ;
    fixedUpdate(interval) {
        this.update$.next(interval);
    }
    ;
    renderUpdate(factor) {
        //this.renderUpdateList.forEach((fn) => fn(factor));
        this.render$.next(factor);
    }
    ;
    updateLoop(time_now) {
        this.cancel_token = requestAnimationFrame((time) => {
            this.updateLoop(time);
        });
        if (time_now > this.last_fps_update + 1000) {
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
    }
    ;
    stopLoop() {
        cancelAnimationFrame(this.cancel_token);
    }
    ;
};
RenderLoop = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [input_manager_1.InputManager])
], RenderLoop);
exports.RenderLoop = RenderLoop;
;
