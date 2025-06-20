import { useEffect, useRef } from "react";
import {Application, Container, Graphics, Rectangle} from 'pixi.js';
import gsap from "gsap";

const ParticleScene = () => {
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

                const maxStars: number = 500;
                const containerWidth = 100;
                const containerHeight = 100;
                for (let i: number = 0; i < maxStars; i++) {
                    const container :Container = new Container();
                    container.hitArea = new Rectangle(0,0, containerWidth,containerWidth);
                    container.interactive = true;
                    container.eventMode = 'dynamic';
                    container.cursor = 'pointer';

                    const star: Graphics = new Graphics();
                    star.circle(0,0, 2);
                    star.fill({color: 0xFFFFFF});
                    star.alpha = 0.2;

                    star.position.set(containerWidth / 2, containerHeight / 2);
                    container.addChild(star)
                    appRef.current.stage.addChild(container)
                    container.position.x = Math.random() * appRef.current.canvas.width;
                    container.position.y = Math.random() * appRef.current.canvas.height;

                    container.on('pointerover', () => {
                        gsap.to(star,{
                            alpha: 1,
                            duration: 0.5,
                        })
                        gsap.to(star.scale, {
                            x: 3,
                            y: 3,
                            duration: 0.5,
                            onComplete: () =>{
                                gsap.to(star.scale, {
                                    x: 1,
                                    y: 1,
                                    duration: 0.5,
                                })
                                gsap.to(star,{
                                    alpha: 0.2,
                                    duration: 0.5,
                                })
                            }
                        })
                    });
                }
            }

        });

        return () => {
            appRef.current?.destroy(true, { children: true });
            appRef.current = null;

        };
    }, []);

    return <div ref={mountRef} className={'particle-container'} style={{width: "100%", height: "100%" }} />;
};

export default ParticleScene;
