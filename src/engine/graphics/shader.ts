import type Buffer from "./buffer";

export default class Shader<Attributes extends string[], Uniforms extends string[]> {
    private _vertex_path: string;
    private _fragment_path: string;
    private _attribute_keys: Attributes;
    private _uniform_keys: Uniforms;
    private _program: WebGLProgram;
    private _attributes: { [key in keyof Attributes]: GLint };
    private _uniforms: { [key in keyof Uniforms]: WebGLUniformLocation };

    constructor(vertex_path: string, fragment_path: string, attributes: Attributes, uniforms: Uniforms) {
        this._vertex_path = vertex_path;
        this._fragment_path = fragment_path;
        this._attribute_keys = attributes;
        this._uniform_keys = uniforms;

        this._program = gl.createProgram()!;

        this._attributes = {} as { [key in keyof Attributes]: GLint };
        this._uniforms = {} as { [key in keyof Uniforms]: WebGLUniformLocation };
    }

    async compile() {
        // Compile vertex shader
        const vertex_source = await fetch(this._vertex_path).then((res) => res.text());
        const vertex_shader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertex_shader, vertex_source);
        gl.compileShader(vertex_shader);

        // Verify vertex shader
        if (!gl.getShaderParameter(vertex_shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(vertex_shader);
            throw Error("Vertex shader failed to compile.");
        }

        // Compile fragment shader
        const fragment_source = await fetch(this._fragment_path).then((res) => res.text());
        const fragment_shader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(fragment_shader, fragment_source);
        gl.compileShader(fragment_shader);

        // Verify fragment shader
        if (!gl.getShaderParameter(fragment_shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(fragment_shader);
            throw Error("Fragment shader failed to compile.");
        }

        // Link shader program
        gl.attachShader(this._program, vertex_shader);
        gl.attachShader(this._program, fragment_shader);
        gl.linkProgram(this._program);

        if (!gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
            throw Error("Shader program failed to link.");
        }

        // Initialize attributes and uniforms
        this._attribute_keys.forEach((attribute) => {
            this._attributes[attribute as keyof Attributes] = gl.getAttribLocation(this._program, attribute);
        });

        this._uniform_keys.forEach((uniform) => {
            let uniform_location = gl.getUniformLocation(this._program, uniform);

            if (uniform_location) {
                this._uniforms[uniform as keyof Uniforms] = uniform_location;
            }
        });
    }

    set_attribute(attribute: keyof Attributes, data: Buffer) {
        data.bind();
        gl.vertexAttribPointer(this._attributes[attribute], data.components, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this._attributes[attribute]);
    }

    // Components should be integer betweeen 1 and 4
    set_uniform_scalar(uniform: keyof Uniforms, data: number[], components: number) {
        const setter = gl[("uniform" + components + "f") as keyof WebGL2RenderingContext] as (
            uniform: WebGLUniformLocation,
            ...data: number[]
        ) => void;

        if (setter) {
            setter(this._uniforms[uniform], ...data);
        }
    }

    // Components should be integer betweeen 1 and 4
    set_uniform_vector(uniform: keyof Uniforms, data: number[], components: number) {
        const setter = gl[("uniform" + components + "fv") as keyof WebGL2RenderingContext] as (
            uniform: WebGLUniformLocation,
            data: number[],
        ) => void;

        if (setter) {
            setter(this._uniforms[uniform], data);
        }
    }
}
