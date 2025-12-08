// src/components/ParticleScene.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Ticker, Application } from "pixi.js";
import { createPixiApp } from "./App";
import { clearStars, initStars } from "./Stars";
import { initRocket, Rocket } from "./Rocket";


const MainScene = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<Application | null>(null);
    const initialized = useRef(false);
    const rocketRef = useRef<Rocket | null>(null); // <-- ref do rakiety

    gsap.ticker.add((time) => {
        Ticker.shared.update(time * 1000);
    });

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const init = async () => {
            if (!mountRef.current) return;

            const app = await createPixiApp(mountRef.current);
            appRef.current = app;

            const stage = app.stage;

            initStars(app, mountRef.current.clientWidth, mountRef.current.clientHeight);
            const rocket = await initRocket({width: app.renderer.width, height: app.renderer.height});
            app.ticker.add(rocket.movementTick, rocket)

            stage.addChild(rocket);
            rocket.position.set(stage.width/2, stage.height/2);
        };

        init();

        const handleResize = () => {
            if (!mountRef.current || !appRef.current) return;

            const app = appRef.current;

            app.renderer.resize(mountRef.current.clientWidth, mountRef.current.clientHeight);
            clearStars(app);
            initStars(app, mountRef.current.clientWidth, mountRef.current.clientHeight);
               if (rocketRef.current) {
                rocketRef.current.movementBounds = { width: mountRef.current.clientWidth, height: mountRef.current.clientHeight };
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

    return <div ref={mountRef} className="particle-container" style={{ width: "100%", height: "100%" }} />;
};

export default MainScene;
