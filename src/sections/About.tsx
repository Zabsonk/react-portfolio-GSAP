import type {ReactElement} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

const About = (): ReactElement => {

    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        gsap.utils.toArray<HTMLElement>(".info").forEach((el, index) => {
            gsap.from(el, {
                x:  (index % 2) ? 100 : -100,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: el,
                    toggleActions: "restart none none none",
                },
            });
        });

    });


    return (
        <section id={'about'} className={'about'}>
            <h1>
                About Me
            </h1>
            <div className={'info'} id={'education'}>
                <div className={'info-text'}>
                    <p>
                        I'm a Computer Science graduate with an engineering degree, specializing in IT Systems
                        Infrastructure.
                    </p>
                </div>

                <img src={'./public/images/logos/git.svg'} alt="skill"/>
            </div>
            <div className={'info'} id={'freetime'}>
                <img src={'./public/images/logos/git.svg'} alt="skill"/>
                <div className={'info-text'}>
                    <p>
                        In my free time, I focus on staying active through sports and maintaining a healthy lifestyle.
                    </p>
                </div>

            </div>
            <div className={'info'} id={'education'}>
                <div className={'info-text'}>
                <p>
                        Currently, I work on building interactive applications and browser-based games using
                        PixiJS. I enjoy working in a team environment and take particular interest in developing
                        engaging
                        and visually rich casino games.
                    </p>
                </div>
                <img src={'./public/images/logos/git.svg'} alt="skill"/>

            </div>
        </section>
    );
};

export default About;