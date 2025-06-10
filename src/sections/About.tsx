import type {ReactElement} from 'react';

const About = (): ReactElement => {

    return (
        <section id={'about'} className={'about'}>
            <h1>
                About Me
            </h1>
            <p>
                I'm a Computer Science graduate with an engineering degree, specializing in IT Systems Infrastructure. Currently, I work on building interactive applications and browser-based games using PixiJS. I enjoy working in a team environment and take particular interest in developing engaging and visually rich casino games.
                In my free time, I focus on staying active through sports and maintaining a healthy lifestyle.
            </p>
        </section>
    );
};

export default About;