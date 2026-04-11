import gsap from 'gsap';
import { AnimatedSprite, Assets, Sprite, Spritesheet, Texture } from 'pixi.js';

interface IRocketPhysics {
    vx: number;
    vy: number;
    acceleration: number;
    rotationSpeed: number;
    maxSpeed: number;
    initRotation: number;
}

export type Bounds = {
    width: number;
    height: number;
};

export type Scale = number;

export type PixelValue = number;

export type RocketSizeBand = Record<PixelValue, Scale>;

export interface RocketConfig {
    texture: Texture;
    flameTexture: Spritesheet;
    movementConfig: IRocketPhysics;
    movementBounds: Bounds;
    onFirstMove?: () => void;
    pixelSizeBands: RocketSizeBand;
}

export class Rocket extends Sprite {
    private readonly pixelSizeBands: RocketSizeBand;

    private onFirstMove?: () => void;
    private hasMoved = false;

    private flame: AnimatedSprite;
    private isFlameOn = false;

    public movementBounds: Bounds;

    private keys: {
        w: boolean;
        a: boolean;
        d: boolean;
    } = { w: false, a: false, d: false };

    private physics: IRocketPhysics;

    constructor({
        texture,
        flameTexture,
        movementConfig,
        movementBounds,
        onFirstMove,
        pixelSizeBands,
    }: RocketConfig) {
        super(texture);

        this.pixelSizeBands = pixelSizeBands;

        const flame = (this.flame = new AnimatedSprite(flameTexture.animations.flame));
        this.addChild(flame);
        flame.pivot.set(flame.width / 2, 0);
        flame.position.set(0, texture.height / 2);
        flame.scale.set(0.3);
        flame.alpha = 0;

        this.physics = movementConfig;
        this.movementBounds = movementBounds;
        this.onFirstMove = onFirstMove;
        this.rotation = movementConfig.initRotation;

        window.addEventListener('keydown', (e) => {
            if (e.key === 'w' || e.key === 'W') this.keys.w = true;
            if (e.key === 'a' || e.key === 'A') this.keys.a = true;
            if (e.key === 'd' || e.key === 'D') this.keys.d = true;
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'w' || e.key === 'W') this.keys.w = false;
            if (e.key === 'a' || e.key === 'A') this.keys.a = false;
            if (e.key === 'd' || e.key === 'D') this.keys.d = false;
        });
    }

    public movementTick() {
        if ((this.keys.w || this.keys.a || this.keys.d) && !this.hasMoved) {
            this.hasMoved = true;
            this.onFirstMove?.();
        }

        if (this.keys.a) this.rotation -= this.physics.rotationSpeed;
        if (this.keys.d) this.rotation += this.physics.rotationSpeed;

        if (this.keys.w) {
            this.physics.vx += Math.cos(this.rotation - Math.PI / 2) * this.physics.acceleration;
            this.physics.vy += Math.sin(this.rotation - Math.PI / 2) * this.physics.acceleration;
            this.turnOnFlame();
        } else {
            this.turnOffFlame();
        }

        const speed = Math.sqrt(this.physics.vx ** 2 + this.physics.vy ** 2);
        if (speed > this.physics.maxSpeed) {
            this.physics.vx *= this.physics.maxSpeed / speed;
            this.physics.vy *= this.physics.maxSpeed / speed;
        }

        this.x += this.physics.vx;
        this.y += this.physics.vy;

        this.keepInsideScreen();
    }

    public updateMovementBounds(bounds: Bounds): void {
        this.movementBounds = bounds;

        this.x = bounds.width / 2;
        this.y = bounds.height / 2;

        let scale = null;

        for (const pixelValue in this.pixelSizeBands) {
            if (bounds.width <= Number(pixelValue)) {
                scale = this.pixelSizeBands[pixelValue];
                break;
            }
        }
        this.scale.set(scale !== null ? scale : 2);
    }

    private turnOffFlame() {
        if (this.isFlameOn === false) return;
        this.isFlameOn = false; // ← od razu

        gsap.to(this.flame.scale, {
            x: 0,
            y: 0,
            duration: 0.4,
        });

        gsap.to(this.flame, {
            alpha: 0,
            duration: 0.5,
            onComplete: () => {
                if (!this.isFlameOn) {
                    this.flame.stop();
                }
            },
        });
    }

    private turnOnFlame() {
        if (this.isFlameOn) return;
        this.isFlameOn = true;
        this.flame.play();

        gsap.to(this.flame.scale, {
            x: 0.3,
            y: 0.3,
            duration: 0.4,
        });
        gsap.to(this.flame, {
            alpha: 1,
            duration: 0.5,
        });
    }

    private keepInsideScreen(): void {
        const w = this.movementBounds.width;
        const h = this.movementBounds.height;

        const margin = 50;

        if (this.x < margin) {
            this.x = margin;
            this.physics.vx = 0;
        }
        if (this.x > w - margin) {
            this.x = w - margin;
            this.physics.vx = 0;
        }

        if (this.y < margin) {
            this.y = margin;
            this.physics.vy = 0;
        }
        if (this.y > h - margin) {
            this.y = h - margin;
            this.physics.vy = 0;
        }
    }
}

export const initRocket = async (appBounds: Bounds, onFirstMove?: () => void): Promise<Rocket> => {
    const rocketTexture = await Assets.load('/assets/rocket.png');
    const flameTexture = await Assets.load('/assets/rocket_flame_spritesheet.json');
    const rocket = new Rocket({
        texture: rocketTexture,
        flameTexture: flameTexture,
        movementConfig: {
            vx: 0,
            vy: -0.1,
            acceleration: 0.01,
            rotationSpeed: 0.01,
            maxSpeed: 2.5,
            initRotation: -Math.PI,
        },
        movementBounds: appBounds,
        onFirstMove: onFirstMove,
        pixelSizeBands: {
            470: 0.7,
            768: 1,
        },
    });

    rocket.anchor.set(0.5);
    rocket.scale.set(2);
    return rocket;
};
