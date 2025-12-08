import { Assets, Sprite, Texture } from "pixi.js";

interface IRocketPhysics {
    vx: number; 
    vy: number; 
    acceleration: number;
    rotationSpeed: number;
    maxSpeed: number;
}

export type Bounds = {
    width: number,
    height: number,
}

export class Rocket extends Sprite
{
    public movementBounds: Bounds;

    private keys: {
        w: boolean,
        a: boolean,
        d: boolean
    } = {w: false, a: false, d: false}

    private physics :IRocketPhysics;

    constructor(texture: Texture, movementConfig: IRocketPhysics, movementBounds: Bounds){
        super(texture);

        this.physics = movementConfig;
        this.movementBounds = movementBounds;

        window.addEventListener("keydown", (e) => {
            if (e.key === "w" || e.key === "W") this.keys.w = true;
            if (e.key === "a" || e.key === "A") this.keys.a = true;
            if (e.key === "d" || e.key === "D") this.keys.d = true;
        });

        window.addEventListener("keyup", (e) => {
            if (e.key === "w" || e.key === "W") this.keys.w = false;
            if (e.key === "a" || e.key === "A") this.keys.a = false;
            if (e.key === "d" || e.key === "D") this.keys.d = false;
    });
    }

    public movementTick(){
        if (this.keys.a) this.rotation -= this.physics.rotationSpeed;
        if (this.keys.d) this.rotation += this.physics.rotationSpeed;

        if (this.keys.w) {
            this.physics.vx += Math.cos(this.rotation - Math.PI / 2) * this.physics.acceleration;
            this.physics.vy += Math.sin(this.rotation - Math.PI / 2) * this.physics.acceleration;
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

    private keepInsideScreen(): void{
        const w = this.movementBounds.width;
        const h = this.movementBounds.height;

        const margin = 50; 

        if (this.x < margin) this.x = margin;
        if (this.x > w - margin) this.x = w - margin;

        if (this.y < margin) this.y = margin;
        if (this.y > h - margin) this.y = h - margin;
    }
}




export const initRocket = async (appBounds: Bounds): Promise<Rocket> => {
    const texture = await Assets.load("/assets/rocket.png");
    const rocket = new Rocket(texture,{
        vx: 0,
        vy: -0.1,
        acceleration: 0.01 ,
        rotationSpeed: 0.01,
        maxSpeed: 1.5
    },appBounds);  wa

    rocket.anchor.set(0.5);
    rocket.scale.set(2);
    return rocket;
};
