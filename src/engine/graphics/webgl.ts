export default function init_webgl(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl2");

    if (!gl) {
        alert("This browser does not support WebGL2.");
        return 1;
    }

    const global = globalThis || window;

    global.gl = gl;
}
