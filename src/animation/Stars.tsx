import { Application, Container, Graphics, Rectangle, type ContainerChild } from 'pixi.js';
import gsap from 'gsap';

export const initStars = (app: Application, width: number, height: number) => {
    const maxStars = 1000;

    for (let i = 0; i < maxStars; i++) {
        const size = 25;
        const container = new Container();
        container.hitArea = new Rectangle(0, 0, size, size);
        container.interactive = true;
        container.eventMode = 'dynamic';

        const star = new Graphics();
        star.circle(0, 0, Math.random() * (1 - 0.5) + 0.5);
        star.fill({ color: 0xffffff });
        star.alpha = Math.random() * (0.8 - 0.2) + 0.2;

        star.position.set(size / 2, size / 2);
        container.addChild(star);
        app.stage.addChild(container);

        container.position.set(Math.random() * width, Math.random() * height);

        const animationTime = 0.2;

        container.on('pointerover', () => {
            const prevAlpha = star.alpha;

            gsap.to(star, { alpha: 1, duration: animationTime });

            gsap.to(star.scale, {
                x: 6,
                y: 6,
                duration: animationTime,
                onComplete() {
                    gsap.to(star.scale, { x: 1, y: 1, duration: 0.4 });
                    gsap.to(star, { alpha: prevAlpha, duration: 0.4 });
                },
            });
        });
    }
};

export const clearStars = (app: Application) => {
    app.stage.children.forEach((child) => {
        const removed: ContainerChild = app.stage.removeChild(child);
        (child as any).destroy?.();
    });
};
