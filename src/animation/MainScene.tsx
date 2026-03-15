// src/components/ParticleScene.tsx
import { useEffect, useRef } from "react";
import {
    Application,
    Geometry,
    Mesh,
    Shader
} from "pixi.js";

import { createPixiApp } from "./PixiApp";

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
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform vec3 iResolution;
uniform float iTime;

#define iterations 17
#define formuparam 0.53

#define volsteps 20
#define stepsize 0.1

#define zoom   0.800
#define tile   0.850
#define speed  0.010 

#define brightness 0.0015
#define darkmatter 0.300
#define distfading 0.730
#define saturation 0.850

void main() {
    vec2 fragCoord = vTextureCoord * iResolution.xy;

    vec2 uv = fragCoord / iResolution.xy - 0.5;
    uv.y *= iResolution.y / iResolution.x;

    vec3 dir = vec3(uv * zoom, 1.0);
    float time = iTime * speed + 0.25;

    float a1 = 0.5 / iResolution.x * 2.0;
    float a2 = 0.8  / iResolution.y * 2.0;

    mat2 rot1 = mat2(cos(a1), sin(a1), -sin(a1), cos(a1));
    mat2 rot2 = mat2(cos(a2), sin(a2), -sin(a2), cos(a2));

    dir.xz *= rot1;
    dir.xy *= rot2;

    vec3 from = vec3(1.0, 0.5, 0.5);
    from += vec3(time * 2.0, time, -2.0);
    from.xz *= rot1;
    from.xy *= rot2;

    float s = 0.1;
    float fade = 1.0;
    vec3 v = vec3(0.0);

    for (int r = 0; r < volsteps; r++) {
        vec3 p = from + s * dir * 0.5;
        p = abs(vec3(tile) - mod(p, vec3(tile * 2.0)));

        float pa = 0.0;
        float a = 0.0;

        for (int i = 0; i < iterations; i++) {
            p = abs(p) / dot(p, p) - formuparam;
            a += abs(length(p) - pa);
            pa = length(p);
        }

        float dm = max(0.0, darkmatter - a * a * 0.001);
        a *= a * a;

        if (r > 6) fade *= 1.0 - dm;

        v += fade;
        v += vec3(s, s * s, s * s * s * s) * a * brightness * fade;

        fade *= distfading;
        s += stepsize;
    }

    v = mix(vec3(length(v)), v, saturation);

    finalColor = vec4(v * 0.01, 1.0);
}
`;

const MainScene = () => {
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

            initStars();
        };

        init();

        const handleResize = () => {
            if (!mountRef.current || !appRef.current) return;

            const app = appRef.current;

            app.renderer.resize(
                mountRef.current.clientWidth,
                mountRef.current.clientHeight
            );

            if (quadRef.current) {
                quadRef.current.width = app.screen.width;
                quadRef.current.height = app.screen.height;
                quadRef.current.x = app.screen.width / 2;
                quadRef.current.y = app.screen.height / 2;
            }

            if (shaderRef.current) {
                shaderRef.current.resources.shaderToyUniforms.uniforms.iResolution = [
                    app.screen.width,
                    app.screen.height,
                    1
                ];
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);

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
                    0,0,
                    1,0,
                    1,1,
                    0,1
                ]
            },
            indexBuffer: [0,1,2,0,2,3]
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

        quad.width = app.screen.width;
        quad.height = app.screen.height;
        quad.x = app.screen.width / 2;
        quad.y = app.screen.height / 2;

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
