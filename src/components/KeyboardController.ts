import type { IRocketControlls } from '../animation/Rocket';
import { RocketController } from './RocketController';

export default class KeyboardController extends RocketController {
    constructor(controller: IRocketControlls) {
        super(controller);

        window.addEventListener('keydown', (e) => {
            if (e.key === 'w' || e.key === 'W') this.onMove('up');
            if (e.key === 'a' || e.key === 'A') this.onMove('left');
            if (e.key === 'd' || e.key === 'D') this.onMove('right');
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'w' || e.key === 'W') this.onEnd('up');
            if (e.key === 'a' || e.key === 'A') this.onEnd('left');
            if (e.key === 'd' || e.key === 'D') this.onEnd('right');
        });
    }

    onMove(direction: 'up' | 'left' | 'right') {
        if (direction === 'up') {
            this.controlls.accelerate = true;
        } else if (direction === 'left') {
            this.controlls.rotateLeft = true;
        } else if (direction === 'right') {
            this.controlls.rotateRight = true;
        }
    }
}
