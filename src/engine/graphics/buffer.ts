class Buffer {
    private _buffer: WebGLBuffer;
    private _target: GLenum;
    private _usage: GLenum;

    constructor(settings: { target: GLenum; usage: GLenum } = { target: gl.ARRAY_BUFFER, usage: gl.STATIC_DRAW }) {
        this._target = settings.target;
        this._usage = settings.usage;

        this._buffer = gl.createBuffer()!;
    }

    set(data: number[]) {
        gl.bindBuffer(this._target, this._buffer);
        gl.bufferData(this._target, new Float32Array(data), this._usage, 0);
    }

    get() {
        return this._buffer;
    }
}
