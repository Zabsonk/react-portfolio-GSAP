import BrowserApplication from './BrowserApplication';

export const createPixiApp = async (mount: HTMLDivElement) => {
    const app = new BrowserApplication({ container: mount });
    await app.init();
    return { app };
};
