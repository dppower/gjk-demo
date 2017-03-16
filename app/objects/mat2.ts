import { Vec2, Vec2_T } from "./vec2";

export class Mat2 {
    
    constructor(private m_00 = 1, private m_01 = 0,
        private m_10 = 0, private m_11 = 1
    ) { };

    static fromAngle(angle: number) {
        let c = Math.cos(angle);
        let s = Math.sin(angle);

        return new Mat2(c, -s, s, c);
    };

    static multiply(m1: Mat2, m2: Mat2, out?: Mat2) {
        let m_00 = m1.m_00 * m2.m_00 + m1.m_01 * m2.m_10;
        let m_01 = m1.m_00 * m2.m_01 + m1.m_01 * m2.m_11;
        let m_10 = m1.m_10 * m2.m_00 + m1.m_11 * m2.m_10;
        let m_11 = m1.m_10 * m2.m_01 + m1.m_11 * m2.m_11;

        if (out) {
            out.m_00 = m_00;
            out.m_01 = m_01;
            out.m_10 = m_10;
            out.m_11 = m_11;
        } else {
            return new Mat2(m_00, m_01, m_10, m_11);
        }
    };

    rotatePoint(point: Vec2_T): Vec2_T {
        return { x: this.m_00 * point.x + this.m_01 * point.y, y: this.m_10 * point.x + this.m_11 * point.y };
    };   
};