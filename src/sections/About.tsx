import type {ReactElement} from 'react';

const About = (): ReactElement => {


    return (
        <section id={'about'} className={'about'}>
            <h1>
                About Me
            </h1>
            <div className={'info'} id={'education'}>
                <h3>
                    I'm a Computer Science graduate with an engineering degree, specializing in IT Systems
                    Infrastructure.
                </h3>
                <img src={'./public/images/logos/git.svg'} alt="skill"/>
            </div>
            <div className={'info'} id={'freetime'}>
                <img src={'./public/images/logos/git.svg'} alt="skill"/>

                <h3>
                    In my free time, I focus on staying active through sports and maintaining a healthy lifestyle.
                </h3>

            </div>
            <div className={'info'} id={'education'}>
                <h3>
                    Currently, I work on building interactive applications and browser-based games using
                    PixiJS. I enjoy working in a team environment and take particular interest in developing engaging
                    and visually rich casino games.
                </h3>
                <img src={'./public/images/logos/git.svg'} alt="skill"/>

            </div>
        </section>
    );
};

export default About;