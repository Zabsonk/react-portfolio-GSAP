import { useEffect, useRef } from "react";
import {
    Application,
    Geometry,
    Mesh,
    Shader
} from "pixi.js";

import { createPixiApp } from "./PixiApp";
import { initRocket } from "./Rocket";

const vertex = `
in vec2 aPosition;
in vec2 aUV;

out vec2 vTextureCoord;

void main() {
    vTextureCoord = aUV;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const fragment = `
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

interface Props {
    onReady?: () => void;
}

const MainScene = ({ onReady }: Props) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<Application | null>(null);
    const quadRef = useRef<Mesh<Geometry, Shader> | null>(null);
    const shaderRef = useRef<Shader | null>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const init = async () => {
            if (!mountRef.current) return;

            const app = await createPixiApp(mountRef.current);
            appRef.current = app;
            const stage = app.stage;

            const rocket = await initRocket({width: app.renderer.width, height: app.renderer.height});
            app.ticker.add(rocket.movementTick, rocket)

            initStars();
            rocket.position.set(stage.width/2, stage.height/2);
            stage.addChild(rocket);
            onReady?.(); 
        };

        init();

        return () => {

            appRef.current?.destroy(true);
            appRef.current = null;
        };
    }, []);

    const initStars = () => {
        if (!appRef.current) return;

        const app = appRef.current;

        const geometry = new Geometry({
            attributes: {
                aPosition: [
                    -1, -1,
                     1, -1,
                     1,  1,
                    -1,  1
                ],
                aUV: [
                    0, 0,
                    1, 0,
                    1, 1,
                    0, 1
                ]
            },
            indexBuffer: [0, 1, 2, 0, 2, 3]
        });

        const shader = Shader.from({
            gl: {
                vertex,
                fragment
            },
            resources: {
                shaderToyUniforms: {
                    iResolution: {
                        value: [app.screen.width, app.screen.height, 1],
                        type: "vec3<f32>"
                    },
                    iTime: {
                        value: 0,
                        type: "f32"
                    },
                    iMouse: {
                        value: [0, 0],
                        type: "vec2<f32>"
                    }
                }
            }
        });

        shaderRef.current = shader;

        const quad = new Mesh({
            geometry,
            shader
        });

        quadRef.current = quad;

        app.stage.addChild(quad);

        app.ticker.add((ticker) => {
            const uniforms = shader.resources.shaderToyUniforms.uniforms;
            uniforms.iTime += ticker.deltaMS / 1000;
        });
    };

    return (
        <div
            ref={mountRef}
            className="particle-container"
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default MainScene;