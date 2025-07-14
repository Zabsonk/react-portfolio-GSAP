import {type ReactElement, useEffect, useRef} from "react";
import {Application, Assets, Container, type ContainerChild, Graphics, Rectangle} from 'pixi.js';
import CustomEmitter from '../components/ParticleEmitter.ts';

const StarsScene = (): ReactElement => {
    const mountRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<Application>(null);
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;
        const initApp = async () => {
            if (!mountRef.current) {
                return;
            }
            if (appRef.current) {
                return;
            }
            const app: Application = new Application();
            await app.init({
                width: mountRef.current.clientWidth,
                height: mountRef.current.clientHeight,
                backgroundAlpha: 0,
            });

            mountRef.current.prepend(app.canvas);
            appRef.current = app;

        };

        initApp().then(() =>{
            if(appRef.current) {
                appRef.current.canvas.style.display = 'block';
                appRef.current.canvas.style.pointerEvents = 'none';

                globalThis.__PIXI_APP__ = appRef.current;
                initStars();

                window.addEventListener('resize', () => {
                    if(appRef.current && mountRef.current) {
                        appRef.current.canvas.width = mountRef.current.clientWidth
                        appRef.current.canvas.height = mountRef.current.clientHeight

                        appRef.current.stage.children.forEach(child => {
                            if(appRef.current){
                                const childRemoved: ContainerChild = appRef.current.stage.removeChild(child);
                                child.removeAllListeners();
                                child.off('pointerover')
                                childRemoved.destroy()
                            }
                        })
                    }
                });
                window.addEventListener('orientationchange', () => {
                    if(appRef.current && mountRef.current) {
                        appRef.current.canvas.width = mountRef.current.clientWidth
                        appRef.current.canvas.height = mountRef.current.clientHeight

                        appRef.current.stage.children.forEach(child => {
                            if(appRef.current){
                                const childRemoved: ContainerChild = appRef.current.stage.removeChild(child);
                                child.removeAllListeners();
                                child.off('pointerover')
                                childRemoved.destroy()
                            }
                        })
                    }
                });
            }

        });

        return () => {
            appRef.current?.destroy(true, { children: true });
            appRef.current = null;

        };
    }, []);

    const initStars = async () => {
        if (appRef.current && mountRef.current) {
            const texture = await Assets.load('/images/star.png');
            const starsEmitter: CustomEmitter = new CustomEmitter({
                frequency: 100,
                autoUpdate: true,
                texture: texture,
                lifeTime: { min: 20, max: 20 },
                fadeOut: true,
                spawnShape: { x: 0, y: -400, width: 100, height: 1200 },
                initAlpha: { min: 0.2, max: 0.6 },
                initScaleX: { min: 0.5, max: 1 },
                initScaleY: { min: 0.5, max: 1 },
                moveSpeed: { min: 1, max: 1 },
                maxParticles: 100
            })
            appRef.current.stage.addChild(starsEmitter);
            starsEmitter.emitParticles = true;
        }
    };

    return <div ref={mountRef} className={'stars-container'} style={{width: "100%", height: "100%" }} />;
};

export default StarsScene;
