precision mediump float;

varying vec2 vUv;
uniform float uTime;
uniform vec3 uColors[4];
uniform float uGridSize;
uniform float uDensity;
uniform float uParticleSize;
uniform float uAspect;
uniform float uSpeed;

float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);
}

void main(){
    vec2 uv = vUv;
    uv.x *= uAspect;
    vec2 grid = uv * uGridSize;
    vec2 cell = floor(grid);
    vec2 fuv = fract(grid);

    float r = rand(cell);
    vec2 offset = vec2(rand(cell + 1.0), rand(cell + 2.0)) - 0.5;
    float t = sin(uTime * uSpeed * 2.0 + r * 6.2831) * 0.5;
    offset += t * 0.2;
    vec2 center = vec2(0.5) + offset * 0.3;

    float dist = length(fuv - center);
    float radius = uParticleSize * (0.75 + 0.25 * sin(uTime + r * 3.0));
    float alpha = smoothstep(radius, radius - 0.02, dist);

    float density = rand(cell * 3.0);
    if (density > uDensity) alpha = 0.0;

    float ci = mod(cell.x + cell.y, 4.0);
    vec3 col = uColors[int(ci)];

    float brightness = 1.0 + 0.5 * sin(uTime * 1.5 + r * 6.0);
    col *= brightness;

    gl_FragColor = vec4(col, alpha);
}
