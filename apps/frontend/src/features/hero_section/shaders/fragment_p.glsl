precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec3 uColors[4];
uniform vec2 uPressure;
uniform float uBlending;
uniform float uYOffset;
uniform float uFlowScale;
uniform float uFlowEase;
uniform float uFlowDistA;
uniform float uFlowDistB;
uniform float uAspect;
uniform float uShadows;
uniform float uBrightness;
uniform float uSaturation;
uniform float uGrainScale;
uniform float uGrainIntensity;
uniform float uGrainSparsity;
uniform float uGrainSpeed;

uniform float uDensity;
uniform float uParticleSize;
uniform float uGlowStrength;
uniform float uGridSize;

vec2 hash2(vec2 p) {
	return vec2(fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453), fract(sin(dot(p, vec2(269.5, 183.3))) * 43758.5453));
}

vec4 permute(vec4 x) {
	return floor(fract(sin(x) * 43758.5453123) * 289.0);
}
vec4 taylorInvSqrt(vec4 r) {
	return 1.79284291400159 - 0.85373472095314 * r;
}
float snoise(vec3 v) {
	const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
	const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
	vec3 i = floor(v + dot(v, C.yyy));
	vec3 x0 = v - i + dot(i, C.xxx);
	vec3 g = step(x0.yzx, x0.xyz);
	vec3 l = 1.0 - g;
	vec3 i1 = min(g.xyz, l.zxy);
	vec3 i2 = max(g.xyz, l.zxy);
	vec3 x1 = x0 - i1 + C.xxx;
	vec3 x2 = x0 - i2 + C.yyy;
	vec3 x3 = x0 - D.yyy;
	vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
	float n_ = 0.142857142857;
	vec3 ns = n_ * D.wyz - D.xzx;
	vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
	vec4 x_ = floor(j * ns.z);
	vec4 y_ = floor(j - 7.0 * x_);
	vec4 x = x_ * ns.x + ns.yyyy;
	vec4 y = y_ * ns.x + ns.yyyy;
	vec4 h = 1.0 - abs(x) - abs(y);
	vec4 b0 = vec4(x.xy, y.xy);
	vec4 b1 = vec4(x.zw, y.zw);
	vec4 s0 = floor(b0) * 2.0 + 1.0;
	vec4 s1 = floor(b1) * 2.0 + 1.0;
	vec4 sh = -step(h, vec4(0.0));
	vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
	vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
	vec3 p0 = vec3(a0.xy, h.x);
	vec3 p1 = vec3(a0.zw, h.y);
	vec3 p2 = vec3(a1.xy, h.z);
	vec3 p3 = vec3(a1.zw, h.w);
	vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
	p0 *= norm.x;
	p1 *= norm.y;
	p2 *= norm.z;
	p3 *= norm.w;
	vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
	m = m * m;
	return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 x) {
	float v = 0.0;
	float a = 0.5;
	float f = 1.0;
	for(int i = 0; i < 4; i++) {
		v += a * snoise(x * f);
		f *= 2.0;
		a *= 0.5;
	}
	return v;
}

vec3 applySaturation(vec3 rgb, float adj) {
	const vec3 W = vec3(0.2125, 0.7154, 0.0721);
	return mix(vec3(dot(rgb, W)), rgb, adj);
}

void main() {
	vec2 baseUv = vUv;
	baseUv -= 0.5;
	baseUv.x *= uAspect;
	baseUv += 0.5;
	baseUv.y -= uYOffset / 80.0;

	vec2 ppp = -1.0 + 2.0 * baseUv;
	ppp += 0.1 * cos(1.5 * uFlowScale * ppp.yx + 1.1 * uTime + vec2(0.1, 1.1));
	ppp += 0.1 * cos(2.3 * uFlowScale * ppp.yx + 1.3 * uTime + vec2(3.2, 3.4));
	ppp += 0.1 * cos(2.2 * uFlowScale * ppp.yx + 1.7 * uTime + vec2(1.8, 5.2));
	ppp += uFlowDistA * cos(uFlowDistB * uFlowScale * ppp.yx + 1.4 * uTime + vec2(6.3, 3.9));
	float r = length(ppp);
	vec2 flowUv = mix(baseUv, vec2(baseUv.x * (1.0 - uFlowEase) + r * uFlowEase, baseUv.y), uFlowEase);

	vec3 color = uColors[0];
	vec2 noiseCord = flowUv * uPressure;
	float noiseVal = 0.0;

	for(int i = 1; i < 4; i++) {
		float fi = float(i);
		float noiseFlow = (1.0 + fi) / 30.0;
		float noiseSpeed = (1.0 + fi) * 0.11;
		float noiseSeed = 13.0 + fi * 7.0;

		float n = snoise(vec3(noiseCord.x * uPressure.x + uTime * noiseFlow * 2.0, noiseCord.y * uPressure.y, uTime * noiseSpeed) + noiseSeed) - (0.1 * fi) + (0.5 * uBlending);

		n = clamp(0.0, 0.9 + fi * 0.02, n);
		color = mix(color, uColors[i], smoothstep(0.0, uBlending, n));
		noiseVal = n;
	}

	color -= pow(1.0 - 0.0, 2.0) * uShadows;
	color = applySaturation(color, 1.0 + uSaturation);
	color = color * uBrightness;

	vec2 aspectUv = vUv;
	aspectUv.x *= uAspect;

	vec2 gridUv = aspectUv * uGridSize;
	vec2 cellId = floor(gridUv);
	vec2 cellUv = fract(gridUv);

	vec2 rnd = hash2(cellId);

	vec2 cellWorldUv = (cellId + rnd) / uGridSize;
	cellWorldUv.x /= uAspect;

	vec2 cellBase = cellWorldUv;
	cellBase -= 0.5;
	cellBase.x *= uAspect;
	cellBase += 0.5;
	cellBase.y -= uYOffset / 80.0;

	vec2 cp = -1.0 + 2.0 * cellBase;
	cp += 0.1 * cos(1.5 * uFlowScale * cp.yx + 1.1 * uTime + vec2(0.1, 1.1));
	cp += 0.1 * cos(2.3 * uFlowScale * cp.yx + 1.3 * uTime + vec2(3.2, 3.4));
	cp += 0.1 * cos(2.2 * uFlowScale * cp.yx + 1.7 * uTime + vec2(1.8, 5.2));
	cp += uFlowDistA * cos(uFlowDistB * uFlowScale * cp.yx + 1.4 * uTime + vec2(6.3, 3.9));
	float cr = length(cp);
	vec2 cellFlow = mix(cellBase, vec2(cellBase.x * (1.0 - uFlowEase) + cr * uFlowEase, cellBase.y), uFlowEase);

	float cellNoise = snoise(vec3(cellFlow * uPressure * 0.5, uTime * 0.05));
	cellNoise = cellNoise * 0.5 + 0.5;

	float particleActive = step(1.0 - uDensity, cellNoise);


	float radius = uParticleSize * (0.1 + 1.4 * cellNoise);


	float dist = length(cellUv - rnd);

	float core = 1.0 - smoothstep(0.0, radius * 0.5, dist);
	float innerGlow = exp(-dist * uGlowStrength / radius);
	float outerGlow = exp(-dist * (uGlowStrength * 0.2) / radius);

	float particle = core + innerGlow * 0.8 + outerGlow * 0.3;
	particle = clamp(particle, 0.0, 1.0);


	color = mix(color * 2.5, color, smoothstep(0.0, radius, dist));
	color += outerGlow * 0.15 * color;

	particle *= particleActive;

	vec2 nc = gl_FragCoord.xy / uGrainScale;
	float grain = fbm(vec3(nc, 0.0));
	grain = grain * 0.5 + 0.5;
	grain -= 0.5;
	grain = (grain > uGrainSparsity) ? grain : 0.0;
	grain *= uGrainIntensity;

	color += vec3(grain);
	color = clamp(color, 0.0, 1.0);

	gl_FragColor = vec4(color * particle, particle);
}
