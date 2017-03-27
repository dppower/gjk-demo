// Extend CanvasRenderingContext2D
interface CanvasRenderingContext2D {
    fill(path: Path2D, fillRule?: string): void;
    clip(path: Path2D, fillRule?: string): void;
}