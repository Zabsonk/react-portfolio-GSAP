import {type ReactElement, useEffect, useRef} from "react";
import {Application, Container, type ContainerChild, Graphics, Rectangle} from 'pixi.js';

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

                //  globalThis.__PIXI_APP__ = appRef.current;


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

    const initStars = () => {
        if(appRef.current && mountRef.current) {
            const maxStars: number = 1000;
            const containerWidth = 25;
            const containerHeight = 25;
            for (let i: number = 0; i < maxStars; i++) {
                const container: Container = new Container();
            }
        }
    }

    return <div ref={mountRef} className={'stars-container'} style={{width: "100%", height: "100%" }} />;
};

export default StarsScene;
