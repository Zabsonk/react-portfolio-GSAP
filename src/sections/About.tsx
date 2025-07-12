import {type ReactElement, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

const About = (): ReactElement => {

    gsap.registerPlugin(ScrollTrigger);
    const [currentIndex, setCurrentIndex] = useState(0);

    const illustrations = [
        "/images/abouts/active.png",
        "/images/abouts/graduate.png",
        "/images/abouts/game-dev.png",
    ];

    useGSAP(() => {
        gsap.utils.toArray<HTMLElement>(".info-text").forEach((el, index) => {
            gsap.from(el, {
                x:  (index % 2) ? 100 : -100,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: el,
                },
            });
        });
        gsap.utils.toArray<HTMLElement>(".info-text").forEach((el, index) => {
            ScrollTrigger.create({
                trigger: el,
                start: "top bottom",
                onEnter: () => setCurrentIndex(index),
                onEnterBack: () => setCurrentIndex(index),
            });
        });
    });


    return (
        <section id={'about'} className={'about'}>
            <div className={'info-wrapper'}>
                <div className={'info-text-wrapper'}>
                <div className={'info-text'}>
                    <span>
                        I'm a Computer Science graduate with an engineering degree, specializing in IT Systems
                        Infrastructure.
                    </span>
                </div>
                </div>
                <div className={'info-text-wrapper'}>
                <div className={'info-text'}>
                    <span>
                        In my free time, I focus on staying active through sports and maintaining a healthy lifestyle.
                    </span>
                </div>
                </div>
                <div className={'info-text-wrapper'}>
                <div className={'info-text'}>
                    <span>
                        Currently, I work on building interactive applications and browser-based games using
                        PixiJS. I enjoy working in a team environment and take particular interest in developing
                        engaging
                        and visually rich casino games.
                    </span>
                </div>
                </div>
            </div>
            <div className={'illustration'}>
                <img
                    src={illustrations[currentIndex]}
                    alt="Illustration"
                />
            </div>
        </section>
    );
};

export default About;