export default class Texture {
    private _texture: WebGLTexture;
    private _image = new Image();
    private _errored = false;

    constructor(image_source: string) {
        this._image.src = image_source;
        this._texture = gl.createTexture()!;

        this._image.addEventListener("onerror", () => (this._errored = true));
    }

    private handle_loaded_image() {
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }

    async init() {
        if (this._image.complete && !this._errored) {
            // Image has loaded
            this.handle_loaded_image();
            return Promise.resolve();
        } else if (this._errored) {
            // Image has errored
            return Promise.reject("Image could not be loaded.");
        } else {
            // Image has not loaded
            this._image.addEventListener("onload", () => {
                this.handle_loaded_image();
                return Promise.resolve();
            });

            this._image.addEventListener("onerror", () => {
                return Promise.reject("Image could not be loaded");
            });
        }
    }
}
