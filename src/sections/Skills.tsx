import {type ReactElement,  useState} from "react";
import { skills } from "../constants";

const Skills = (): ReactElement =>{

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="skills" className="skills">
            <div className="marquee-wrapper">
                <div className="marquee-inner">
                    {[...skills, ...skills].map((s, index) => (
                        <div
                            className="skill-frame"
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                             style={{
                                    boxShadow: `0 0 18px 4px ${s.color}80, 0 0 40px 8px ${s.color}33, inset 0 0 20px rgba(255,255,255,0.03)`
                                }}
                            >
                                <div className="dots-container">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="dot-wrapper">
                                        <div className="dot gray"/>
                                        {i < s.level && (
                                            <div
                                                className={`dot colored ${hoveredIndex === index ? "animate" : ""}`}
                                                style={{
                                                    animationDelay: `${i * 0.3}s`,
                                                    backgroundColor: s.color,
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <img src={s.imgPath} alt="skill"/>
                            <span>{s.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

)
}
export default Skills;