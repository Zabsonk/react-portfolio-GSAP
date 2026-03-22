import { useEffect, useRef } from "react";
import {
    Application,
    Geometry,
    Mesh,
    Shader
} from "pixi.js";

import { createPixiApp } from "./PixiApp";
import { initRocket } from "./Rocket";
import { vertex, fragment } from "./shaders";

interface Props {
    onReady?: () => void;
    isVisible: boolean;
}

const MainScene = ({ onReady, isVisible }: Props) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<Application | null>(null);
    const quadRef = useRef<Mesh<Geometry, Shader> | null>(null);
    const hintRef = useRef<HTMLDivElement>(null);
    const shaderRef = useRef<Shader | null>(null);
    const initialized = useRef(false);

        useEffect(() => {
        if (!appRef.current) return;
        if (isVisible) {
            appRef.current.ticker.start();
        } else {
            appRef.current.ticker.stop();
        }
    }, [isVisible]);


    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const init = async () => {
            if (!mountRef.current) return;

            const app = await createPixiApp(mountRef.current);
            appRef.current = app;
            const stage = app.stage;

            const rocket = await initRocket({width: app.renderer.width, height: app.renderer.height}, alphaOutHint);
            app.ticker.add(rocket.movementTick, rocket)

            initStars();
            stage.addChild(rocket);
            requestAnimationFrame(() => {
                rocket.position.set(app.screen.width / 2, app.screen.height /4);
            });
            onReady?.(); 
        };

        init();

        return () => {

            appRef.current?.destroy(true);
            appRef.current = null;
        };
    }, []);

    const alphaOutHint = () => {
        if (hintRef.current) {
            hintRef.current.style.transition = 'opacity 0.5s ease';
            hintRef.current.style.opacity = '0';
        }
    }

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
            >
                <div ref={hintRef} className={"rocket-hint"}>
                    Use <span className="hint-key">W</span> <span className="hint-key">A</span> <span className="hint-key">D</span> to move the rocket
                </div>
            </div>
      
    );
};

export default MainScene;