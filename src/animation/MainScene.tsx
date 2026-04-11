import { useEffect, useRef } from 'react';
import { Geometry, Mesh, Shader } from 'pixi.js';

import { initRocket, Rocket } from './Rocket';
import { vertex, fragment } from './shaders';
import type BrowserApplication from '../app/BrowserApplication';
import { createPixiApp } from '../app/PixiApp';

interface Props {
    onReady?: () => void;
    isVisible: boolean;
}

const MainScene = ({ onReady, isVisible }: Props) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<BrowserApplication | null>(null);
    const quadRef = useRef<Mesh<Geometry, Shader> | null>(null);
    const hintRef = useRef<HTMLDivElement>(null);
    const shaderRef = useRef<Shader | null>(null);
    const rocketRef = useRef<Rocket | null>(null);

    const initialized = useRef(false);

    useEffect(() => {
        if (!appRef.current) return;
        if (isVisible) {
            appRef.current.resume();
        } else {
            appRef.current.stop();
        }
    }, [isVisible]);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const init = async () => {
            if (!mountRef.current) return;

            const { app } = await createPixiApp(mountRef.current);
            appRef.current = app;

            app.on('onResize', handlePixiSceneResize, this);

            const rocket = await initRocket({ width: app.width, height: app.height }, alphaOutHint);
            rocketRef.current = rocket;

            app.addToTicker(rocket.movementTick, rocket);
            initStars();
            app.addChild(rocket);
            requestAnimationFrame(() => {
                rocket.position.set(app.width / 2, app.height / 4);
            });
            onReady?.();
        };

        init();

        return () => {
            appRef.current = null;
        };
    }, []);

    const alphaOutHint = () => {
        if (hintRef.current) {
            hintRef.current.style.transition = 'opacity 0.5s ease';
            hintRef.current.style.opacity = '0';
        }
    };

    const initStars = () => {
        if (!appRef.current) return;

        const app = appRef.current;

        const geometry = new Geometry({
            attributes: {
                aPosition: [-1, -1, 1, -1, 1, 1, -1, 1],
                aUV: [0, 0, 1, 0, 1, 1, 0, 1],
            },
            indexBuffer: [0, 1, 2, 0, 2, 3],
        });

        const shader = Shader.from({
            gl: {
                vertex,
                fragment,
            },
            resources: {
                shaderToyUniforms: {
                    iResolution: {
                        value: [app.width, app.height, 1],
                        type: 'vec3<f32>',
                    },
                    iTime: {
                        value: 0,
                        type: 'f32',
                    },
                    iMouse: {
                        value: [0, 0],
                        type: 'vec2<f32>',
                    },
                },
            },
        });

        shaderRef.current = shader;

        const quad = new Mesh({
            geometry,
            shader,
        });

        quadRef.current = quad;

        app.addChild(quad);

        app.addToTicker((ticker) => {
            const uniforms = shader.resources.shaderToyUniforms.uniforms;
            uniforms.iTime += ticker.deltaMS / 1000;
        });
    };

    const handlePixiSceneResize = (width: number, height: number) => {
        if (rocketRef.current) {
            rocketRef.current.updateMovementBounds({ width, height });
        }
    };
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    return (
        <div
            ref={mountRef}
            className="particle-container"
            style={{ width: '100%', height: '100%' }}
        >
            {isMobile ? (
                <div ref={hintRef} className={'rocket-hint-mobile'}>
                    Use Joystick to move the rocket
                </div>
            ) : (
                <div ref={hintRef} className={'rocket-hint'}>
                    Use <span className="hint-key">W</span> <span className="hint-key">A</span>{' '}
                    <span className="hint-key">D</span> to move the rocket
                </div>
            )}
        </div>
    );
};

export default MainScene;
