import type {ReactElement} from "react";
import {type ImgTexts, myLinks} from "../constants";

const Footer = (): ReactElement => {

    return (
    <footer>
        {myLinks.map((link :(ImgTexts & { link: string })) => (
            <a href={link.link} className={'my-links'}>
                <img src={link.imgPath} alt={link.text}/>
            </a>
        ))}
    </footer>
    )
}

export default Footer;