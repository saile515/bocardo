import Sprite from "../engine/components/sprite.ts";
import { clear, draw } from "../engine/graphics/webgl.ts";
import Scene from "../engine/scene.ts";

export async function init_game() {
    const scene = new Scene(document.getElementById("game_canvas") as HTMLCanvasElement);

    scene.ecs.create_entity([new Sprite("/images/amogus.png")]);

    function render() {
        clear();

        scene.ecs.query<[Sprite]>([Sprite]).forEach((entity) => entity[0].draw());

        draw();

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
