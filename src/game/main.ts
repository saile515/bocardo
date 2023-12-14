import Sprite from "../engine/components/sprite.ts";
import Camera, { CameraBundle } from "../engine/components/camera.ts";
import Transform from "../engine/components/transform.ts";
import Scene from "../engine/scene.ts";

export async function init_game() {
    const canvas = document.getElementById("game_canvas") as HTMLCanvasElement;

    const scene = new Scene(canvas);
    const camera = scene.ecs.create_entity<CameraBundle>([new Camera(canvas.width, canvas.height), new Transform()]);

    scene.set_active_camera(camera);

    scene.ecs.create_entity([new Sprite("/images/amogus.png"), new Transform()]);

    function render() {
        scene.draw();

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
