import Buffer from "../engine/graphics/buffer.ts";
import Shader from "../engine/graphics/shader.ts";
import { init_webgl, clear, draw } from "../engine/graphics/webgl.ts";

export async function init_game() {
    init_webgl(document.getElementById("game_canvas") as HTMLCanvasElement);

    const vertex_buffer = new Buffer();
    vertex_buffer.set([-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5]);

    const shader = new Shader<["vertex_position"], []>(
        "/shaders/sprite.vert.glsl",
        "/shaders/sprite.frag.glsl",
        ["vertex_position"],
        [],
    );

    await shader.compile();
    shader.set_attribute("vertex_position", vertex_buffer);

    function render() {
        clear();

        shader.use();
        vertex_buffer.bind();

        draw();

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
