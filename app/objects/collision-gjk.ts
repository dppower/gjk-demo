import { Polygon } from "./polygon";
import { Vec2 } from "./vec2";

export class CollisionGJK {

    static isCollision(a: Polygon, b: Polygon) {
        let dir = new Vec2(0, 1);
        let simplex_vertex = CollisionGJK.getSupport(a, b, dir);
        let simplex = [simplex_vertex];

        dir = simplex_vertex.inverse();
        let iter = 0;
        while (true) {
            simplex_vertex = CollisionGJK.getSupport(a, b, dir);

            if (simplex_vertex.dot(dir) < 0) break;

            simplex.push(simplex_vertex);

            switch (simplex.length) {
                case 2: {
                    CollisionGJK.checkSimplex1(simplex, dir);
                    break;
                }
                case 3: {
                    if (CollisionGJK.checkSimplex2(simplex, dir)) {
                        //console.log(`is collision iterations: ${iter}.`);
                        return CollisionGJK.getPenetration(a, b, simplex);
                    }
                    break;
                }
            }
            iter++;
        }
        return false;

    };

    static getSupport(a: Polygon, b: Polygon, dir: Vec2) {
        let support_a = a.getSupport(dir);
        let support_b = b.getSupport(dir.inverse());

        return support_a.subtract(support_b);
    };

    static checkSimplex1(simplex: Vec2[], dir: Vec2) {
        let a = simplex[0];
        let b = simplex[1];
        let ba = a.subtract(b);
        let bo = b.inverse();
        let dp = ba.dot(bo);
        if (dp > 0) {
            let d = new Vec2(ba.y, -ba.x);
            if (d.dot(bo) < 0) {
                dir.x = -d.x;
                dir.y = -d.y;
            } else {
                dir.copy(d);
            }
        }
        else {
            simplex.splice(0, 1);
            dir = bo;
        }
    };

    static checkSimplex2(simplex: Vec2[], dir: Vec2): boolean {
        let a = simplex[0];
        let b = simplex[1];
        let c = simplex[2];
        let co = c.inverse();

        let ca = a.subtract(c);
        let cb = b.subtract(c);

        let cb_en = new Vec2(-cb.y, cb.x);
        let ca_en = new Vec2(ca.y, -ca.x);

        const distinguish_c_from_cb = () => {
            if (cb.dot(co) > 0) {
                simplex.splice(0, 1);
                dir.x = cb_en.x;
                dir.y = cb_en.y;
            } else {
                simplex.splice(0, 2);
                dir = co;
            }
        };

        if (ca_en.dot(co) > 0) {
            if (ca.dot(co) > 0) {
                simplex.splice(1, 1);
                dir.x = ca_en.x;
                dir.y = ca_en.y;
            }
            else {
                distinguish_c_from_cb();
            }
        } else {
            if (cb_en.dot(co) > 0) {
                distinguish_c_from_cb();
            } else {
                // Triangle contains origin - collision!
                return true;
            }
        }
        return false;
    };

    // Calculate the shortest vector from origin to polygon edge
    static getPenetration(a: Polygon, b: Polygon, simplex: Vec2[]) {
        // Loop through simplex find nearest edge to origin
        //const distOrigin = (a: Vec2, b: Vec2) => {
        //    let n = Math.abs(b.x * a.y - b.y * a.x);
        //    let d = b.subtract(a).length;
        //    return n / d;
        //};
        for (let vertex of simplex) {
            if (vertex.isZero()) return;
        };

        const dist_squared = (a: Vec2, b: Vec2) => {
            let ao = a.inverse();
            let ab = b.subtract(a);
            return a.squared_length - (ao.dot(ab) ** 2);
        };

        const get_closest_edge = (simplex: Vec2[]) => {
            let length = simplex.length;
            let index = 0;
            let dist = dist_squared(simplex[0], simplex[1]);

            for (let i = 1; i < length; i++) {
                let j = (i + 1) % length;
                let d = dist_squared(simplex[i], simplex[j]);

                if (d < dist) {
                    index = i;
                    dist = d;
                }
            }
            return [dist, index];
        };

        let [dist, index] = get_closest_edge(simplex);
        //console.log(`dist: ${dist}, index: ${index}.`);
        let next = (index + 1) % simplex.length;
        let closest_edge = simplex[next].subtract(simplex[index]);
        let edge_normal = new Vec2(closest_edge.y, -closest_edge.x);
        //console.log(`edge: ${closest_edge}, normal: ${edge_normal}.`);

        let iter = 0;
        while (true) {
            let vertex = CollisionGJK.getSupport(a, b, edge_normal);
            //console.log(`dist: ${dist}, index: ${index}, edge: ${closest_edge}, normal: ${edge_normal}, vertex: ${vertex}.`);
            //console.log(`simplex before:`);
            //for (let v of simplex) {
            //    console.log(v.toString());
            //};

            //console.log(`dot product: ${vertex.dot(edge_normal)}.`);
            if ((vertex.dot(edge_normal) ** 2) <= dist) break;
            simplex.splice(next, 0, vertex);

            //console.log(`simplex after:`);
            //for (let v of simplex) {
            //    console.log(v.toString());
            //};

            [dist, index] = get_closest_edge(simplex);
            next = (index + 1) % simplex.length;
            closest_edge = simplex[next].subtract(simplex[index]);
            edge_normal = new Vec2(closest_edge.y, -closest_edge.x);
            //console.log(`dist: ${dist}, index: ${index}, edge: ${closest_edge}, normal: ${edge_normal}.`);
            //console.log(`stuck in while loop...`);

            iter++;
            if (iter === 10) {
                console.log("REACHED MAX ITERATIONS!!!");
                break;
            }
        }
        console.log(`get penetration vector: ${iter}.`);
        // Calculate vector from origin to closest edge:
        let displace = edge_normal.normalise().scale(dist);
        console.log(`displace ${displace.inverse().toString()}.`);
        return displace.inverse();
    };
};