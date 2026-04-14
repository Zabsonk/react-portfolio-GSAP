import type { IRocketControlls } from '../animation/Rocket';

export abstract class RocketController {
    protected controlls: IRocketControlls;

    constructor(controlls: IRocketControlls) {
        this.controlls = controlls;
    }

    public abstract onMove(...args: any[]): void;

    public onEnd(dirrection?: 'up' | 'left' | 'right') {
        if (dirrection) {
            if (dirrection === 'up') this.controlls.accelerate = false;
            if (dirrection === 'left') this.controlls.rotateLeft = false;
            if (dirrection === 'right') this.controlls.rotateRight = false;
        } else {
            this.controlls.accelerate = false;
            this.controlls.rotateLeft = false;
            this.controlls.rotateRight = false;
        }
    }
}
