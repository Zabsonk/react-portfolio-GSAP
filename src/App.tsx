import {useEffect, useRef} from "react";
import { gsap } from "gsap";
import Hero from "./sections/Hero";
import NavBar from "./sections/NavBar.tsx";
import About from './sections/About.tsx';
import Skills from "./sections/Skills.tsx";
import Contact from "./sections/Contact.tsx";
import Footer from "./sections/Footer.tsx";
import ParticleWrapper from "./sections/ParticleWrapper.tsx";
import StarsScene from "./sections/StarsScene.tsx";
import MainScene from "./animation/MainScene.tsx";

const App = () => {
    const homeContainerRef = useRef<HTMLDivElement>(null);
    const contactContainerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleSlide = () => {
        document.body.style.overflowY = 'hidden';
        gsap.to(sliderRef.current, {
            x: "-100vw",
            duration: 1,
            ease: "power3.inOut"
        });
    };

    const handleSlideBack = () => {
        document.body.style.overflowY = 'auto';
        gsap.to(sliderRef.current, {
            x: "0vw",
            duration: 1,
            ease: "power3.inOut"
        });
    };

    useEffect(() => {
        if (sliderRef.current) {
            gsap.set(sliderRef.current, { x: "0vw" });
        }
    }, []);



    return (
        <div className="main">
            <div className={'slider'} ref={sliderRef}>
                <div ref={homeContainerRef} className="home">
                    <div className="w-screen h-full overflow-y-auto">
                        <ParticleWrapper>
                            <MainScene />
                        </ParticleWrapper>
                        <NavBar onButtonClick={handleSlide}/>
                        <div className="hero-background">
                            <Hero/>
                        </div>
                        <Skills/>
                        <About/>
                        <Footer/>
                    </div>
                </div>
                <div ref={contactContainerRef} className="contact-wrapper">
                    <ParticleWrapper>
                        <StarsScene />
                    </ParticleWrapper>
                    <Contact onButtonClick={handleSlideBack}/>
                </div>
            </div>
        </div>
    );
};

export default App;
