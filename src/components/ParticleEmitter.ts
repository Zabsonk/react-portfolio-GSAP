import { ParticleContainer, Texture, Ticker } from 'pixi.js';
import CustomParticle from './CustomParticle.ts';
import { CommonUtils } from '../utils/CommonUtils.ts';

/**
 * @field texture - Texture used for each particle.
 * @field autoUpdate - Should emitter update itself.
 * @field lifetime - Lifetime of each particle.
 * @field frequency - Frequency of particle spawning.
 * @field moveSpeed - Speed of each particle.
 * @field maxParticles - Max count of particles that can live at one time.
 * @field direction - Direction of particle move (in Degrees).
 * @field rotation - Rotation of particle (in Degrees, if its null then it will match direction).
 * @field fadeOut - Fade out of particle during lifetime.
 * @field spawnShape - Shape of spawn
 * @field initScaleX - Initialization scale X of particle.
 * @field initScaleY - Initialization scale Y of particle.
 * @field initAlpha - Initialization alpha of particle.
 */
export type CustomEmitterConfig = {
    texture: Texture;
    autoUpdate: boolean;
    lifeTime: { min: number; max: number };
    frequency: number;
    moveSpeed: { min: number; max: number };
    maxParticles: number;
    initDirection?: { min: number; max: number };
    initRotation?: { min: number; max: number };
    fadeOut?: boolean;
    spawnShape: { x: number; y: number; width?: number; height?: number };
    initScaleX?: { min: number; max: number };
    initScaleY?: { min: number; max: number };
    initAlpha?: { min: number; max: number };
};

export default class CustomEmitter extends ParticleContainer {
    private animationTicker: (ticker: Ticker) => void;
    private _frequency: number;
    private config: CustomEmitterConfig;
    private _emit: boolean = false;

    private _spawnTimer: number = 0;

    public initScaleX: { min: number; max: number } | undefined;
    public initScaleY: { min: number; max: number } | undefined;
    public initAlpha: { min: number; max: number } | undefined;
    public initRotation: { min: number; max: number } | undefined;
    public initDirection: { min: number; max: number } | undefined;

    constructor(config: CustomEmitterConfig) {
        super({
            texture: config.texture,
            roundPixels: true,
        });

        this.config = config;
        this._frequency = this.config.frequency;
        this.initRotation = this.config.initRotation;
        this.initDirection = this.config.initDirection ?? null;
        this.initAlpha = this.config.initAlpha;
        this.initScaleX = this.config.initScaleX;
        this.initScaleY = this.config.initScaleY;

        this.animationTicker = (ticker: Ticker) => this.updateParticles(ticker);

        this.autoUpdate = this.config.autoUpdate;
    }

    public set emitParticles(value: boolean) {
        this._emit = value;
    }

    public set autoUpdate(value: boolean) {
        const ticker: Ticker = Ticker.shared;

        if (value) {
            ticker.add(this.animationTicker);
            ticker.start();
        } else {
            ticker.remove(this.animationTicker);
        }
    }

    /**
     * Method that should be called each tick.
     * @param ticker
     */
    public updateParticles(ticker: Ticker): void {
        (this.particleChildren as CustomParticle[]).forEach((p: CustomParticle) => {
            p.age += ticker.deltaMS;

            // move particle
            p.x += p.directionX * p.moveSpeed * ticker.deltaTime;
            p.y += p.directionY * p.moveSpeed * ticker.deltaTime;

            // do particle fade out
            if (this.config.fadeOut) {
                p.alpha = 1 - p.age / p.maxLifeTime;
            }

            // if particle is too old -> remove it
            if (!p.isAlive) {
                this.removeParticle(p);
            }
        });

        // new Particles
        if (this._emit) {
            this._spawnTimer -= ticker.deltaTime < 0 ? 0 : ticker.deltaTime;

            while (this._spawnTimer <= 0) {
                // spawn particle only if particles count is smaller the max particles
                if (this.particleChildren.length < this.config.maxParticles) {
                    const lifetime: number = CommonUtils.getRandomValueFromSection(
                        this.config.lifeTime.min,
                        this.config.lifeTime.max
                    );
                    const moveSpeed: number = CommonUtils.getRandomValueFromSection(
                        this.config.moveSpeed.min,
                        this.config.moveSpeed.max
                    );
                    const initScaleX: number = this.initScaleX
                        ? CommonUtils.getRandomValueFromSection(
                              this.initScaleX.min,
                              this.initScaleX.max
                          )
                        : 1;
                    const initScaleY: number = this.initScaleY
                        ? CommonUtils.getRandomValueFromSection(
                              this.initScaleY.min,
                              this.initScaleY.max
                          )
                        : 1;
                    const initAlpha: number = this.initAlpha
                        ? CommonUtils.getRandomValueFromSection(
                              this.initAlpha.min,
                              this.initAlpha.max
                          )
                        : 1;
                    const angleDeg: number = this.initDirection
                        ? CommonUtils.getRandomValueFromSection(
                              this.initDirection.max,
                              this.initDirection.min
                          )
                        : 0;

                    const angleRad: number = angleDeg * (Math.PI / 180);
                    const dirX: number = Math.cos(angleRad);
                    const dirY: number = Math.sin(angleRad);
                    const initRotation: number = angleRad - Math.PI / 2;

                    const p: CustomParticle = new CustomParticle(
                        {
                            texture: this.config.texture,
                            scaleX: initScaleX,
                            scaleY: initScaleY,
                            alpha: initAlpha,
                            rotation: initRotation,
                        },
                        lifetime,
                        moveSpeed,
                        dirX,
                        dirY
                    );

                    const spawn: { x: number; y: number; width?: number; height?: number } =
                        this.config.spawnShape;
                    if (spawn) {
                        let spawnPosX: number = spawn.x;
                        let spawnPosY: number = spawn.y;
                        if (spawn.width && spawn.height) {
                            spawnPosX = spawn.x + Math.random() * spawn.width;
                            spawnPosY = spawn.y + Math.random() * spawn.height;
                        }
                        p.x = spawnPosX;
                        p.y = spawnPosY;
                    }

                    this.addParticle(p);
                }

                this._spawnTimer += this._frequency;
            }
        }
    }
}
