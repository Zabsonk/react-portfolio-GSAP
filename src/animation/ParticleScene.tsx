import {type ReactElement, useEffect, useRef} from "react";
import {Application, Container, type ContainerChild, Graphics, Rectangle, Ticker} from 'pixi.js';
import gsap from "gsap";

const ParticleScene = (): ReactElement => {
    const mountRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<Application>(null);
    const hasInitialized = useRef(false);

    gsap.ticker.add((time) => {
        Ticker.shared.update(time * 1000);
    });

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

              //  globalThis.__PIXI_APP__ = appRef.current;

                initStars()
            }

        });

        const handleResize = () => {
            if(appRef.current && mountRef.current) {
                appRef.current.canvas.width = mountRef.current.clientWidth;
                appRef.current.canvas.height = mountRef.current.clientHeight;

                appRef.current.stage.children.forEach(child => {
                    const childRemoved: ContainerChild = appRef.current.stage.removeChild(child);
                    if ('removeAllListeners' in child) {
                        (child as any).removeAllListeners?.();
                        child.off?.('pointerover');
                    }
                    child.destroy?.();
                });
                initStars();
            }
        };
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            appRef.current?.destroy(true, { children: true });
            appRef.current = null;
        };
    }, []);

    const initStars = () => {
        if(appRef.current && mountRef.current) {
            const maxStars: number = 1000;
            const containerWidth = 25;
            const containerHeight = 25;
            for (let i: number = 0; i < maxStars; i++) {
                const container :Container = new Container();
                container.hitArea = new Rectangle(0,0, containerWidth,containerWidth);
                container.interactive = true;
                container.eventMode = 'dynamic';
                container.cursor = 'pointer';

                const star: Graphics = new Graphics();
                star.circle(0,0,  Math.random() * (1 - 0.5) + 0.5);
                star.fill({color: 0xFFFFFF});
                star.alpha = Math.random() * (0.8 - 0.2) + 0.2;

                star.position.set(containerWidth / 2, containerHeight / 2);
                container.addChild(star)
                appRef.current.stage.addChild(container)
                container.position.x = Math.random() *  mountRef.current.clientWidth;
                container.position.y = Math.random() * mountRef.current.clientHeight;

                const animationTime: number = 0.2;
                container.on('pointerover', () => {
                    const prevAlpha: number = star.alpha;
                    gsap.to(star,{
                        alpha: 1,
                        duration: animationTime,
                    })
                    gsap.to(star.scale, {
                        x: 6,
                        y: 6,
                        duration: animationTime,
                        onComplete: () =>{
                            gsap.to(star.scale, {
                                x: 1,
                                y: 1,
                                duration: 0.4,
                            })
                            gsap.to(star,{
                                alpha: prevAlpha,
                                duration: 0.4,
                            })
                        }
                    })
                });
            }
        }
    }

    return <div ref={mountRef} className={'particle-container'} style={{width: "100%", height: "100%" }} />;
};

export default ParticleScene;
