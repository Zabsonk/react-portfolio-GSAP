import type { ReactElement } from 'react';
import { asset, myLinks, type IconLink } from '../constants';
import { LuFileUser } from 'react-icons/lu';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

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
                    <a
                        href={asset(`/files/resume.pdf`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume"
                    >
                        <FaArrowUpRightFromSquare className={'img-new-window'} />
                        <div className={'resume-title'}>
                            {<LuFileUser className="resume-icon" />}
                            <h3>Open Resume</h3>
                        </div>
                    </a>
                </div>
            </div>
            <span>© 2026 Kacper Żabiński. All rights reserved.</span>
        </footer>
    );
};

export default Footer;
