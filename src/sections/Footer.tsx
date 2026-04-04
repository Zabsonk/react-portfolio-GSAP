import type {ReactElement} from "react";
import {myLinks, type IconLink} from "../constants";

const Footer = (): ReactElement => {

    return (
        <footer>
            <div className={'footer-top'}>
                <div className={'my-links'}>
                    {myLinks.map((link: IconLink) => (
                        <a href={link.link} className={'my-links'}>
                            {<link.icon />}
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
            <span>© 2026 Kacper Żabiński. All rights reserved.</span>
        </footer>
)
}

export default Footer;