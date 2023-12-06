#version 300 es

out highp vec2 texture_position;

void main(void) {
    vec2 vertex_position = vec2(0.0);
    vertex_position.x = floor(float(gl_VertexID / 2)) - 0.5;
    vertex_position.y = mod(float(gl_VertexID), 2.0) - 0.5;

    gl_Position = vec4(vertex_position, 0.0, 1.0);
    texture_position = vec2(float(gl_VertexID / 2), mod(float(gl_VertexID), 2.0));
}
