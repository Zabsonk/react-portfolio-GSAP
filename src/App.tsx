import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Hero from './sections/Hero';
import NavBar from './sections/NavBar.tsx';
import About from './sections/About.tsx';
import Skills from './sections/Skills.tsx';
import Contact from './sections/Contact.tsx';
import Footer from './sections/Footer.tsx';
import ParticleWrapper from './sections/ParticleWrapper.tsx';
import MainScene from './animation/MainScene.tsx';
import LoadingScreen from './sections/LoadingScreen.tsx';
import Experience from './sections/Experience.tsx';
import Joystick from './components/Joystick.tsx';

const App = () => {
    const homeContainerRef = useRef<HTMLDivElement>(null);
    const contactContainerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [shaderVisible, setShaderVisible] = useState(true);

    const handleSlide = () => {
        document.body.style.overflowY = 'hidden';
        gsap.to(sliderRef.current, {
            x: '-100vw',
            duration: 1,
            ease: 'power3.inOut',
            onComplete: () => setShaderVisible(false),
        });
    };

    const handleSlideBack = () => {
        document.body.style.overflowY = 'auto';
        setShaderVisible(true);
        gsap.to(sliderRef.current, {
            x: '0vw',
            duration: 1,
            ease: 'power3.inOut',
        });
    };

    useEffect(() => {
        sessionStorage.removeItem('onContact');
        if (sliderRef.current) {
            sliderRef.current.style.cssText = 'transform: translateX(0px) !important';
            gsap.set(sliderRef.current, { x: 0 });
        }
    }, []);

    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    return (
        <div className="main">
            <LoadingScreen visible={loading} />
            {isMobile && <Joystick />}
            <div className={'slider'} ref={sliderRef}>
                <div ref={homeContainerRef} className="home">
                    <div className="w-screen h-full overflow-y-auto">
                        <ParticleWrapper>
                            <MainScene
                                onReady={() => setLoading(false)}
                                isVisible={shaderVisible}
                            />
                        </ParticleWrapper>
                        <NavBar onButtonClick={handleSlide} />
                        <div className="hero-background">
                            <Hero />
                        </div>
                        <Skills />
                        <Experience />
                        <About />
                        <Footer />
                    </div>
                </div>
                <div ref={contactContainerRef} className="contact-wrapper">
                    <Contact onButtonClick={handleSlideBack} />
                </div>
            </div>
        </div>
    );
};

export default App;
