// ParticleScene.tsx
import { useEffect, useRef } from "react";
import {Application} from 'pixi.js';

const ParticleScene = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<Application>(null);

    useEffect(() => {
        const initApp = async () => {
            if (!mountRef.current) return;

            const app = new Application();
            await app.init({
                width: mountRef.current.clientWidth,
                height: mountRef.current.clientHeight,
            });

            mountRef.current.prepend(app.canvas);

            appRef.current = app;

        };

        initApp();

        return () => {
            appRef.current?.destroy(true, { children: true });
            appRef.current = null;

        };
    }, []);

    return <div ref={mountRef} style={{ width: "100%", height: "500px" }} />;
};

export default ParticleScene;
