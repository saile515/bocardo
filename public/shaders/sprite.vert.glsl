attribute vec2 vertex_position;
attribute vec2 texture_position;

varying highp vec2 _texture_position;

void main(void) {
    gl_Position = vec4(vertex_position, 0.0, 1.0);
    _texture_position = texture_position;
}
