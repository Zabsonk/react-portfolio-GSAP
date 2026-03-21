import {type ReactElement, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import { aboutImgs, aboutInfo } from '../constants';

const About = (): ReactElement => {

    gsap.registerPlugin(ScrollTrigger);
    const currentIndexRef = useRef(0);
    const imgRef = useRef<HTMLImageElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
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
                start: "center center",
                end: "bottom center",

                onToggle: self => {
                    if (self.isActive) {
                        el.classList.add("with-effects");
                        changeImage(index);
                    } else {
                        el.classList.remove("with-effects");
                    }

                }
            });
        });
        ScrollTrigger.refresh();
        tlRef.current = gsap.timeline({ paused: true });
    });

    const changeImage = (index: number) => {

    if (!imgRef.current) return;

    if (index === currentIndexRef.current) return;

    const img = imgRef.current;

    gsap.killTweensOf(img);

    gsap.timeline()
        .to(img, {
            opacity: 0,
            duration: 0.2,
            ease: "power1.out"
        })
        .add(() => {
            currentIndexRef.current = index; 
            img.src = aboutImgs[index];
        }, "+=0.15")
        .to(img, {
            opacity: 1,
            duration: 0.2,
            ease: "power3.in",
        });
};


    return (
        <section id={'about'} className={'about'}>
            <div className={'about-title'}>
                <h1>About me</h1>
            </div>
            <div className={'about-info'}>
                <div className={'info-wrapper'}>
                    {[...aboutInfo].map((info, index) => (
                        <div key={index} className={'info-text-wrapper'}>
                            <div className={'info-text'}>
                                <span>{info}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={'illustration'}>
                    <img
                        ref={imgRef}
                        src={aboutImgs[ currentIndexRef.current]}
                        alt="Illustration"
                    />
                </div>
            </div>
        </section>
    );
};

export default About;