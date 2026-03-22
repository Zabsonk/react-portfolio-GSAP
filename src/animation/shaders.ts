export const vertex = `
in vec2 aPosition;
in vec2 aUV;

out vec2 vTextureCoord;

void main() {
    vTextureCoord = aUV;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const fragment = `
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform vec3 iResolution;
uniform float iTime;

#define STEPS   22
#define ITER    16
#define STEP_SZ 0.14
#define FOLD    0.48
#define ZOOM    0.75
#define SPEED   0.0009
#define GLOW    0.0012
#define SCATTER 0.4
#define FALLOFF 0.72
#define SAT     0.80

void main() {
    vec2 fragCoord = vTextureCoord * iResolution.xy;

    vec2 uv = fragCoord / iResolution.xy - 0.5;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime * SPEED;

    vec3 dir = normalize(vec3(uv * ZOOM, 1.0));

    float b1 = t * 1.3;
    float b2 = t * 0.7;

    mat2 rx = mat2(cos(b1), -sin(b1),  sin(b1), cos(b1));
    mat2 ry = mat2(cos(b2), -sin(b2),  sin(b2), cos(b2));

    dir.xy = rx * dir.xy;
    dir.yz = ry * dir.yz;

    vec3 ro = vec3(0.3, 0.1, t * 2.0);
    ro.xy = rx * ro.xy;
    ro.yz = ry * ro.yz;

    float march = 0.05;
    float alpha = 1.0;
    vec3 col = vec3(0.0);

    for (int i = 0; i < STEPS; i++) {
        vec3 p = ro + dir * march;
        vec3 q = mod(p, 2.0) - 1.0;

        float prev = 0.0;
        float acc  = 0.0;

        for (int j = 0; j < ITER; j++) {
            q = abs(q) / max(dot(q, q), 0.0001) - FOLD;
            float l = length(q);
            acc += abs(l - prev);
            prev = l;
        }

        float cloud = max(0.0, SCATTER - acc * acc * 0.0008);
        acc = acc * acc * acc;

        vec3 hue = vec3(
            0.5 + 0.5 * sin(march * 1.1 + 2.0),
            0.3 + 0.5 * sin(march * 0.7 + 3.5),
            0.8 + 0.5 * sin(march * 0.4 + 0.0)
        );

        if (i > 5) alpha *= 1.0 - cloud;

        col += alpha * hue * acc * GLOW * vec3(march, march * march, march * march * march * march);
        col += alpha * vec3(0.01);

        alpha *= FALLOFF;
        march += STEP_SZ;
    }

    col = mix(vec3(length(col)), col, SAT);
    col = col * 0.012;
    col = pow(max(col, vec3(0.0)), vec3(0.85));

    finalColor = vec4(col, 1.0);
}
`;