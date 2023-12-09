import ECS from "./ecs/ecs";
import Sprite from "./components/sprite.ts";
import Camera from "./components/camera.ts";
import { init_webgl, clear } from "./graphics/webgl.ts";

export default class Scene {
    private _active_camera: Camera | null = null;
    readonly ecs = new ECS();

    constructor(canvas: HTMLCanvasElement) {
        init_webgl(canvas);
    }

    set_active_camera(camera: Camera) {
        this._active_camera = camera;
    }

    draw() {
        clear();

        if (!this._active_camera || !Sprite.shader) {
            return;
        }

        Sprite.shader.use();

        Sprite.shader.set_uniform_matrix("vp_matrix", this._active_camera.projection_matrix as Float32Array, 3);

        this.ecs.query<[Sprite]>([Sprite]).forEach(([sprite]) => {
            sprite.draw();
        });
    }
}
