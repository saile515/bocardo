#version 300 es

uniform highp mat3 vp_matrix;
<<<<<<< HEAD
uniform highp mat3 model_matrix;
=======
>>>>>>> 7662b0c0904f72665c7d4fdf8e6152260d149452

out highp vec2 texture_position;

void main(void) {
    vec2 vertex_position = vec2(0.0);
    vertex_position.x = floor(float(gl_VertexID / 2)) - 0.5;
    vertex_position.y = mod(float(gl_VertexID), 2.0) - 0.5;

<<<<<<< HEAD
    gl_Position = vec4((vp_matrix * model_matrix * vec3(vertex_position, 1.0)).xy, 0.0, 1.0);
=======
    gl_Position = vec4(vp_matrix * vec3(vertex_position, 0.0), 1.0);
>>>>>>> 7662b0c0904f72665c7d4fdf8e6152260d149452
    texture_position = vertex_position + vec2(0.5);
}
