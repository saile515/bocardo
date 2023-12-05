varying highp vec2 _texture_position;

uniform sampler2D sampler;

void main(void) {
    gl_FragColor = texture2D(sampler, _texture_position);
}
