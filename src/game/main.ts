import Sprite from "../engine/components/sprite.ts";
import Camera from "../engine/components/camera.ts";
import Scene from "../engine/scene.ts";

export async function init_game() {
    const canvas = document.getElementById("game_canvas") as HTMLCanvasElement;
    const scene = new Scene(canvas);
    const [camera] = scene.ecs.create_entity([new Camera(canvas.width, canvas.height)]);

    scene.set_active_camera(camera);

    scene.ecs.create_entity([new Sprite("/images/amogus.png")]);

    function render() {
        scene.draw();

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
