import { useEffect, useRef, type ReactElement } from 'react';
import gsap from 'gsap';
import { aboutImgs, aboutInfo } from '../constants';

const About = (): ReactElement => {
    const currentIndexRef = useRef(0);
    const imgRef = useRef<HTMLImageElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const wrappers = sectionRef.current?.querySelectorAll<HTMLElement>('.info-text-wrapper');
        const illustration = sectionRef.current?.querySelector<HTMLElement>('.illustration');

        if (!wrappers) return;

        if (illustration) {
            const illustrationObserver = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        gsap.fromTo(
                            illustration,
                            { opacity: 0, x: 100 },
                            { opacity: 1, x: 0, duration: 1, ease: 'power2.inOut' }
                        );
                        illustrationObserver.disconnect();
                    }
                },
                { threshold: 0.2 }
            );
            illustrationObserver.observe(illustration);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target as HTMLElement;
                    const index = Number(el.dataset.index);

                    if (entry.isIntersecting) {
                        wrappers.forEach((w) => w.classList.remove('with-effects'));
                        el.classList.add('with-effects');
                        changeImage(index);
                    }
                });
            },
            {
                threshold: 0.6,
                rootMargin: '-30% 0px -30% 0px',
            }
        );
        wrappers.forEach((el, index) => {
            el.dataset.index = String(index);
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const changeImage = (index: number) => {
        if (!imgRef.current) return;
        if (index === currentIndexRef.current) return;

        const img = imgRef.current;
        gsap.killTweensOf(img);

        gsap.timeline()
            .to(img, { opacity: 0, duration: 0.2, ease: 'power1.out' })
            .add(() => {
                currentIndexRef.current = index;
                img.style.opacity = '0';
                img.src = aboutImgs[index];
            })
            .to(img, { opacity: 1, duration: 0.2, ease: 'power3.in' });
    };

    return (
        <section id="about" className="about" ref={sectionRef}>
            <div className="about-header">
                <span className="about-tag">ABOUT ME</span>
                <h1 className="about-main-title">Frontend & Game Developer from Poland</h1>
            </div>
            <div className="about-info">
                <div className="info-wrapper">
                    {aboutInfo.map((info, index) => (
                        <div key={index} className="info-text-wrapper">
                            <div className="info-text">
                                <span>{info}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="illustration" style={{ opacity: 0 }}>
                    <img
                        ref={imgRef}
                        wa
                        src={aboutImgs[currentIndexRef.current]}
                        alt="Illustration"
                        style={{ opacity: 1 }}
                    />
                </div>
            </div>{' '}
        </section>
    );
};

export default About;
