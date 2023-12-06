import Component from "../ecs/component.ts";
import Texture from "../graphics/texture.ts";
import Shader from "../graphics/shader.ts";
import { draw } from "../graphics/webgl.ts";

export default class Sprite extends Component {
    private _texture: Texture;
    private _shader = new Shader<[], ["sampler"]>(
        "/shaders/sprite.vert.glsl",
        "/shaders/sprite.frag.glsl",
        [],
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

        draw();
    }

    get failed() {
        return this._failed;
    }
}
