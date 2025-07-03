import {type ReactElement, useRef} from "react";
import {skills} from "../constants";

const Skills = (): ReactElement =>{
    const boxRef = useRef(null);

    const [isHovered, setIsHovered] = useState(false);

    return (
        <section id={'skills'} className={'skills'}>
            {skills.map((s: { text: string; imgPath: string; level: number, color: string }, index: number) => (
                <div ref={boxRef} className={'skill-frame'} key={index}   onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}>
                    <img src={s.imgPath} alt="person"/>
                    <span>{s.text}</span>
                    <div className="dots-container">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="dot-wrapper">
                                <div className="dot gray"/>
                                {i < s.level && (
                                    <div
                                        className={`dot colored ${isHovered ? 'animate' : ''}`}
                                        style={{
                                            animationDelay: `${i * 0.3}s`,
                                            backgroundColor: s.color
                                        }}                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}
export default Skills;