import { Particle, type ParticleOptions, Texture } from 'pixi.js';

export default class CustomParticle extends Particle {
    public age: number;
    public moveSpeed: number;
    public maxLifeTime: number;
    public directionX: number;
    public directionY: number;

    constructor(
        config: ParticleOptions | Texture,
        maxLife: number,
        moveSpeed: number,
        directionX: number,
        directionY: number
    ) {
        super(config);

        this.moveSpeed = moveSpeed;
        this.maxLifeTime = maxLife * 1000;
        this.age = 0;
        this.directionX = directionX;
        this.directionY = directionY;
    }

    public get isAlive(): boolean {
        return this.age < this.maxLifeTime;
    }
}
