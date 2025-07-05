import React, { useRef } from "react";
import { gsap } from "gsap";

import Hero from "./sections/Hero";
import NavBar from "./sections/NavBar.tsx";
import About from './sections/About.tsx';
import Skills from "./sections/Skills.tsx";
import Contact from "./sections/Contact.tsx";

const App = () => {
    const homeContainerRef = useRef<HTMLDivElement>(null);
    const contactContainerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleSlide = () => {
        gsap.to(sliderRef.current, {
            x: "-100vw",
            duration: 1,
            ease: "power3.inOut"
        });
        // gsap.to(contactContainerRef.current, {
        //     x: "-100vw",
        //     duration: 1,
        //     ease: "power3.inOut"
        // });
    };

    const handleSlideBack = () => {
        gsap.to(sliderRef.current, {
            x: "0vw",
            duration: 1,
            ease: "power3.inOut"
        });
    };

    return (
        <div className="main">
            <div className={'slider'} ref={sliderRef}>
                <div ref={homeContainerRef} className="home">
                    <div className="w-screen h-full overflow-y-auto">
                        <NavBar onButtonClick={handleSlide}/>
                        <div className="hero-background">
                            <Hero/>
                        </div>
                        <Skills/>
                        <About/>

                    </div>
                </div>
                <div ref={contactContainerRef} className="contact-wrapper">
                    <Contact onButtonClick={handleSlideBack}/>
                </div>
            </div>
        </div>
    );
};

export default App;
