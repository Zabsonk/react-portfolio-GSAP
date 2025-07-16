import type {ReactElement} from "react";
import {type ImgTexts, myLinks} from "../constants";

const Footer = (): ReactElement => {

    return (
        <footer>
            <div className={'footer-top'}>
                <div className={'links'}>
                    {myLinks.map((link: (ImgTexts & { link: string })) => (
                        <a href={link.link} className={'my-links'}>
                            <img src={link.imgPath} alt={link.text}/>
                        </a>
                    ))}
                </div>
                <div className="footer-separator"></div>

                <div className={'resume-button'}>
                    <a href="/files/resume.pdf" target="_blank" rel="noopener noreferrer" className="resume">
                        <img src={'images/new-window.svg'} alt={'new-window'} className={'img-new-window'}/>
                        <div className={'resume-title'}>
                            <img src={'images/resume.svg'} alt={'resume'}/>
                            <h3>Open Resume</h3>
                        </div>

                    </a>
                </div>
            </div>
            <span>Created by Kacper Żabiński</span>
        </footer>
)
}

export default Footer;