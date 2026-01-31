import { Application } from "pixi.js";

export const createPixiApp = async (mount: HTMLDivElement): Promise<Application> => {
    const app = new Application();

    await app.init({
        width: mount.clientWidth,
        height: mount.clientHeight,
        backgroundAlpha: 0,
    });

    mount.prepend(app.canvas);
    app.canvas.style.display = "block";
    app.canvas.style.pointerEvents = "none";

    return app;
};