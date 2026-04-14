import type { IRocketControlls } from '../animation/Rocket';
import { RocketController } from './RocketController';

export default class JoystickController extends RocketController {
    constructor(controlls: IRocketControlls) {
        super(controlls);
    }

    onMove(ndx: number, ndy: number) {
        const threshold = 0.3;
        this.controlls.accelerate = ndy < -threshold;
        this.controlls.rotateLeft = ndx < -threshold;
        this.controlls.rotateRight = ndx > threshold;
    }
}
