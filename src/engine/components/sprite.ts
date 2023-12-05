import Component from "../ecs/component.ts";
import Texture from "../graphics/texture.ts";
import Buffer from "../graphics/buffer.ts";
import Shader from "../graphics/shader.ts";

export default class Sprite extends Component {
    private _texture: Texture;
    private _vertex_buffer = new Buffer();
    private _texture_buffer = new Buffer();
    private _shader = new Shader<["vertex_position", "texture_position"], ["sampler"]>(
        "/shaders/sprite.vert.glsl",
        "/shaders/sprite.frag.glsl",
        ["vertex_position", "texture_position"],
        ["sampler"],
    );
    private _ready = false;
    private _failed = false;

    constructor(image_source: string) {
        super();

        let shader_ready: boolean, texture_ready: boolean;
        this._shader.compile().then(() => {
            shader_ready = true;
            if (texture_ready) {
                this._ready = true;
            }
        });

        this._vertex_buffer.set([-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5]);
        this._texture_buffer.set([0, 1, 0, 0, 1, 1, 1, 0]);

        this._texture = new Texture(image_source);
        this._texture
            .init()
            .then(() => {
                texture_ready = true;
                if (shader_ready) {
                    this._ready = true;
                }
            })
            .catch(() => {
                this._failed = true;
            });
    }

    draw() {
        if (!this._ready) {
            return;
        }

        this._shader.use();

        this._shader.set_uniform_int("sampler", [0], 1);

        this._shader.set_attribute("vertex_position", this._vertex_buffer);
        this._shader.set_attribute("texture_position", this._texture_buffer);
    }

    get failed() {
        return this._failed;
    }
}
