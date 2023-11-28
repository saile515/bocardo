export default class Shader<Attributes extends string[], Uniforms extends string[]> {
    private _vertex_path: string;
    private _fragment_path: string;
    private _program: WebGLProgram;
    private _attributes: { [key: string]: number };
    private _uniforms: { [key: string]: number };

    constructor(vertex_path: string, fragment_path: string, attributes: Attributes, uniforms: Uniforms) {
        this._vertex_path = vertex_path;
        this._fragment_path = fragment_path;

        this._program = gl.createProgram()!;
        this._attributes = {};
        this._uniforms = {};

        attributes.forEach((attribute) => {
            this._attributes[attribute] = gl.getAttribLocation(this._program, attribute);
        });

        uniforms.forEach((uniform) => {
            this._uniforms[uniform] = gl.getAttribLocation(this._program, uniform);
        });
    }
}
