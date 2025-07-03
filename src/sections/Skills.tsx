import {type ReactElement, type RefObject, useEffect, useRef, useState} from 'react';
import {skills} from "../constants";

const Skills = (): ReactElement =>{
    const boxRefs: React.RefObject<(HTMLDivElement | null)[]> = useRef([]);
    const sectionRef: React.RefObject<HTMLDivElement | null> = useRef(null);
    const paused = useRef<boolean>(false);
    const animationId = useRef<number | null>(null);


    const addRef = (ref: HTMLDivElement | null) => {
        if (ref && !boxRefs.current.includes(ref)) {
            boxRefs.current.push(ref);
        }
    }

    useEffect(() => {
        if (!boxRefs.current.length) return;

        const pos: number[] = boxRefs.current.map((el, i) => i * 20);

        const speeds = boxRefs.current.map(() => 2);

        const animate = () => {
            if (!paused.current) {
                boxRefs.current.forEach((el, i) => {
                    if (el) {
                        pos[i] -= speeds[i];
                        el.style.transform = `translateX(${pos[i]}px)`;
                    }
                });
            }

            animationId.current = requestAnimationFrame(animate);
        };

        animate();
    }, []);


    const handleMouseEnter = () => {
        paused.current = true;
    };

    const handleMouseLeave = () => {
        paused.current = false;
    };

    return(
        <section id={'skills'} className={'skills'} ref={sectionRef}>
            {
                skills.map((s:{text: string, imgPath: string}) => (
                    <div
                        ref={addRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                         className={'skill-frame'}>
                        <img src={s.imgPath} alt="person"/>
                        <span>{s.text}</span>
                    </div>

                ))

            }
        </section>
    )
}
export default Skills;