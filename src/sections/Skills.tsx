import {type ReactElement, useRef} from "react";
import {skills} from "../constants";

const Skills = (): ReactElement =>{
    const boxRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(boxRef.current, {
            duration: 0.6,
            borderColor: '#00ffff',
            borderWidth: '6px',
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        });
    };

    const handleMouseLeave = () => {
        gsap.to(boxRef.current, {
            duration: 0.4,
            borderColor: '#494949',
            borderWidth: '3px',
            repeat: 0,
            ease: 'power1.out',
        });
    };

    return(
        <section id={'skills'} className={'skills'}>
            {
                skills.map((s:{text: string, imgPath: string}) => (
                    <div
                        ref={boxRef}
                         className={'skill-frame'}
                         onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}>
                        <img src={s.imgPath} alt="person"/>
                        <span>{s.text}</span>
                    </div>
                ))}
        </section>
    )
}
export default Skills;