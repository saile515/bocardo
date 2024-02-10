import * as Twodo from "twodo";

export async function init_game() {
    const canvas = document.getElementById("game_canvas") as HTMLCanvasElement;

    const scene = new Twodo.Scene(canvas);
    const camera = scene.ecs.create_entity<Twodo.CameraBundle>([
        new Twodo.Camera(canvas.width, canvas.height),
        new Twodo.Transform(),
    ]);

    scene.set_active_camera(camera);

    scene.ecs.create_entity([new Twodo.Sprite("/images/amogus.png"), new Twodo.Transform()]);

    function render() {
        scene.draw();

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
