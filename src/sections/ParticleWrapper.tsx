import type { ReactElement, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const ParticleWrapper = ({ children }: Props): ReactElement => {
    return <div className="particle-wrapper">{children}</div>;
};

export default ParticleWrapper;
