"use strict";
const vec2_1 = require("./vec2");
class CollisionGJK {
    static *getCollisionResults(a, b) {
        const create_result = (status) => {
            return { direction: direction.object, simplex: simplex.slice(), status };
        };
        let is_collision = false;
        let direction = new vec2_1.Vec2(vec2_1.Vec2.UP);
        let simplex_vertex = this.getSupportPoint(a, b, direction);
        let simplex = [simplex_vertex];
        yield create_result("GJK...");
        vec2_1.Vec2.inverse(simplex_vertex, direction);
        let iter = 0;
        while (!is_collision) {
            simplex_vertex = this.getSupportPoint(a, b, direction);
            if (vec2_1.Vec2.dot(simplex_vertex, direction) < 0.0000001)
                break;
            simplex.push(simplex_vertex);
            yield create_result("GJK...");
            switch (simplex.length) {
                case 2:
                    CollisionGJK.checkSimplex1(simplex, direction);
                    break;
                case 3:
                    if (CollisionGJK.checkSimplex2(simplex, direction)) {
                        is_collision = true;
                    }
                    break;
            }
            iter++;
            if (iter === 10) {
                console.error("GJK: REACHED MAX ITERATIONS!!!");
                break;
            }
        }
        if (is_collision) {
            yield create_result("Collision!");
            yield* this.getDisplacementStepwise(a, b, simplex);
        }
        else {
            yield create_result("No collision");
        }
    }
    ;
    static isCollision(a, b) {
        let dir = new vec2_1.Vec2(vec2_1.Vec2.UP);
        let simplex_vertex = this.getSupportPoint(a, b, dir);
        let simplex = [simplex_vertex];
        vec2_1.Vec2.inverse(simplex_vertex, dir);
        let is_collision = false;
        let iter = 0;
        while (!is_collision) {
            simplex_vertex = this.getSupportPoint(a, b, dir);
            if (vec2_1.Vec2.dot(simplex_vertex, dir) < 0.0000001)
                break;
            simplex.push(simplex_vertex);
            switch (simplex.length) {
                case 2:
                    CollisionGJK.checkSimplex1(simplex, dir);
                    break;
                case 3:
                    if (CollisionGJK.checkSimplex2(simplex, dir)) {
                        is_collision = true;
                    }
                    break;
            }
            iter++;
            if (iter === 10) {
                console.error("GJK: REACHED MAX ITERATIONS!!!");
                break;
            }
        }
        return { is_collision, simplex };
    }
    ;
    static getSupportPoint(a, b, dir) {
        let support_a = this.getFarthestPoint(a, dir);
        let support_b = this.getFarthestPoint(b, vec2_1.Vec2.inverse(dir));
        return vec2_1.Vec2.subtract(support_a, support_b);
    }
    ;
    static getFarthestPoint(points, dir) {
        let iter = (points[Symbol.iterator]());
        let max_point = iter.next().value;
        let max = vec2_1.Vec2.dot(max_point, dir);
        for (let p of iter) {
            let dp = vec2_1.Vec2.dot(p, dir);
            if (dp > max) {
                max_point = p;
                max = dp;
            }
        }
        return max_point;
    }
    ;
    static checkSimplex1(simplex, dir) {
        let a = simplex[0];
        let b = simplex[1];
        let ba = vec2_1.Vec2.subtract(a, b);
        let bo = vec2_1.Vec2.inverse(b);
        let dp = vec2_1.Vec2.dot(ba, bo);
        if (dp > 0) {
            let right = vec2_1.Vec2.perRight(ba);
            if (vec2_1.Vec2.dot(right, bo) < 0) {
                vec2_1.Vec2.inverse(right, dir);
                simplex.splice(0, 2, b, a); // Need to swap to maintain anti-clockwise winding
            }
            else {
                dir.copy(right);
            }
        }
        else {
            simplex.splice(0, 1);
            dir.copy(bo);
        }
    }
    ;
    static checkSimplex2(simplex, dir) {
        let a = simplex[0];
        let b = simplex[1];
        let c = simplex[2];
        let co = vec2_1.Vec2.inverse(c);
        let ca = vec2_1.Vec2.subtract(a, c);
        let cb = vec2_1.Vec2.subtract(b, c);
        let cb_en = vec2_1.Vec2.perLeft(cb);
        let ca_en = vec2_1.Vec2.perRight(ca);
        if (vec2_1.Vec2.dot(ca_en, co) > 0) {
            if (vec2_1.Vec2.dot(ca, co) > 0) {
                simplex.splice(1, 1);
                dir.copy(ca_en);
            }
            else {
                simplex.splice(0, 2);
                dir.copy(co);
            }
        }
        else {
            if (vec2_1.Vec2.dot(cb_en, co) > 0) {
                if (vec2_1.Vec2.dot(cb, co) > 0) {
                    simplex.splice(0, 2);
                    simplex.push(b);
                    dir.copy(cb_en);
                }
                else {
                    simplex.splice(0, 2);
                    dir.copy(co);
                }
            }
            else {
                // Triangle contains origin - collision!
                return true;
            }
        }
        return false;
    }
    ;
    static getDisplacementAARect(a, b) {
        let directions = [vec2_1.Vec2.LEFT, vec2_1.Vec2.UP, vec2_1.Vec2.RIGHT, vec2_1.Vec2.DOWN];
        let dist = vec2_1.Vec2.dot(this.getSupportPoint(a, b, vec2_1.Vec2.LEFT), vec2_1.Vec2.LEFT);
        let index = 0;
        directions.forEach((dir, i) => {
            let d = vec2_1.Vec2.dot(this.getSupportPoint(a, b, dir), dir);
            if (d < dist) {
                dist = d;
                index = i;
            }
        });
        return vec2_1.Vec2.inverse(vec2_1.Vec2.scale(directions[index], dist));
    }
    ;
    static distanceSquared(a, b) {
        let ao = vec2_1.Vec2.inverse(a);
        let ab = vec2_1.Vec2.subtract(b, a);
        return vec2_1.Vec2.squaredLength(ao) - ((Math.pow(vec2_1.Vec2.dot(ao, ab), 2)) / vec2_1.Vec2.squaredLength(ab));
    }
    ;
    static getClosestEdge(simplex) {
        let length = simplex.length;
        let index = 0;
        let dist = this.distanceSquared(simplex[0], simplex[1]);
        for (let i = 1; i < length; i++) {
            let j = (i + 1) % length;
            let d = this.distanceSquared(simplex[i], simplex[j]);
            if (d < dist) {
                index = i;
                dist = d;
            }
        }
        return [dist, index];
    }
    ;
    // Calculate the shortest vector from origin to polygon edge
    static getDisplacement(a, b, simplex) {
        for (let vertex of simplex) {
            if (vec2_1.Vec2.isZero(vertex))
                return vec2_1.Vec2.ZERO;
        }
        ;
        let [dist, index] = this.getClosestEdge(simplex);
        let next = (index + 1) % simplex.length;
        let closest_edge = new vec2_1.Vec2(vec2_1.Vec2.subtract(simplex[next], simplex[index]));
        let edge_normal = new vec2_1.Vec2(vec2_1.Vec2.perRight(closest_edge));
        let iter = 1;
        while (iter <= 10) {
            if (dist <= 0)
                break;
            let vertex = this.getSupportPoint(a, b, edge_normal);
            let d = Math.pow(vec2_1.Vec2.dot(vertex, edge_normal), 2) / vec2_1.Vec2.squaredLength(edge_normal);
            if (Math.abs(d - dist) < 0.0000001)
                break;
            // Update simplex with new point
            simplex.splice(next, 0, vertex);
            [dist, index] = this.getClosestEdge(simplex);
            next = (index + 1) % simplex.length;
            vec2_1.Vec2.subtract(simplex[next], simplex[index], closest_edge);
            vec2_1.Vec2.perRight(closest_edge, edge_normal);
            iter++;
            if (iter === 10) {
                console.error("EPA: REACHED MAX ITERATIONS!!!");
                break;
            }
        }
        let displace;
        if (dist > 0) {
            displace = vec2_1.Vec2.inverse(vec2_1.Vec2.scale(vec2_1.Vec2.normalise(edge_normal), Math.sqrt(dist)));
        }
        else {
            displace = vec2_1.Vec2.ZERO;
        }
        return displace;
    }
    ;
    static *getDisplacementStepwise(a, b, simplex) {
        for (let vertex of simplex) {
            if (vec2_1.Vec2.isZero(vertex))
                return;
        }
        ;
        let [dist, index] = this.getClosestEdge(simplex);
        let next = (index + 1) % simplex.length;
        let closest_edge = new vec2_1.Vec2(vec2_1.Vec2.subtract(simplex[next], simplex[index]));
        let edge_normal = new vec2_1.Vec2(vec2_1.Vec2.perRight(closest_edge));
        yield { direction: edge_normal.object, simplex: simplex.slice(), status: "EPA..." };
        let iter = 1;
        while (iter <= 10) {
            if (dist <= 0)
                break;
            let vertex = this.getSupportPoint(a, b, edge_normal);
            let d = Math.pow(vec2_1.Vec2.dot(vertex, edge_normal), 2) / vec2_1.Vec2.squaredLength(edge_normal);
            if (Math.abs(d - dist) < 0.0000001)
                break;
            simplex.splice(next, 0, vertex);
            [dist, index] = this.getClosestEdge(simplex);
            next = (index + 1) % simplex.length;
            vec2_1.Vec2.subtract(simplex[next], simplex[index], closest_edge);
            vec2_1.Vec2.perRight(closest_edge, edge_normal);
            yield { direction: edge_normal.object, simplex: simplex.slice(), status: "EPA..." };
            iter++;
            if (iter === 10) {
                console.error("EPA: REACHED MAX ITERATIONS!!!");
            }
        }
        if (dist > 0) {
            let displace = vec2_1.Vec2.inverse(vec2_1.Vec2.scale(vec2_1.Vec2.normalise(edge_normal), Math.sqrt(dist)));
            yield { direction: displace, simplex: simplex.slice(), status: "Displacement!" };
        }
        else {
            yield { direction: vec2_1.Vec2.ZERO, simplex: simplex.slice(), status: "No displacement" };
        }
    }
    ;
}
exports.CollisionGJK = CollisionGJK;
;
