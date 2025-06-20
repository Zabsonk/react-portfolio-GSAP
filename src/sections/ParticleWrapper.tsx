import type {ReactElement} from 'react';
import ParticleScene from '../animation/ParticleScene.tsx';

const ParticleWrapper = (): ReactElement => {

    return (
        <div className={'particle-wrapper'}>
            <ParticleScene/>
        </div>
    );
};

export default ParticleWrapper;