import {type ReactElement, useRef} from "react";
import {skills} from "../constants";

const Skills = (): ReactElement =>{
    const boxRef = useRef(null);


    return(
        <section id={'skills'} className={'skills'}>
            {
                skills.map((s:{text: string, imgPath: string}) => (
                    <div
                        ref={boxRef}
                         className={'skill-frame'}>
                        <img src={s.imgPath} alt="person"/>
                        <span>{s.text}</span>
                    </div>
                ))}
        </section>
    )
}
export default Skills;