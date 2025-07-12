import {type ReactElement, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

const About = (): ReactElement => {

    gsap.registerPlugin(ScrollTrigger);
    const [currentIndex, setCurrentIndex] = useState(0);

    const illustrations = [
        "/images/abouts/graduate.png",
        "/images/abouts/active.png",
        "/images/abouts/game-dev.png",
    ];

    useGSAP(() => {
        gsap.utils.toArray<HTMLElement>(".info-text-wrapper").forEach((el) => {
            gsap.from(el, {
                x:   -100,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: el,
                },
            });
        });

        gsap.from('.illustration', {
            duration: 1,
            opacity: 0,
            x:   100,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: '.illustration',
            },
        })

        gsap.utils.toArray<HTMLElement>(".info-text-wrapper").forEach((el, index) => {
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
            <div className={'about-title'}>
                <h1>About me</h1>
            </div>
            <div className={'about-info'}>
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
            </div>
        </section>
    );
};

export default About;