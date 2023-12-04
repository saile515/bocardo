import ECS from "./ecs/ecs";
import { init_webgl } from "./graphics/webgl.ts";

export default class Scene {
    readonly ecs = new ECS();

    constructor(canvas: HTMLCanvasElement) {
        init_webgl(canvas);
    }
}
