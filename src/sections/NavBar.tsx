import type {ReactElement} from "react";
import {navLinks} from "../constants";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const NavBar = (): ReactElement => {
    useGSAP(() => {
        gsap.from(
            ".nav-center li",
            { y: 50, opacity: 0, stagger: 0.3, duration: 1, ease: "power2.inOut" }
        );
        gsap.from(
            ".nav-left, .nav-right",
            { y: 50, opacity: 0,  duration: 1, ease: "power2.inOut" }
        );
    });
    return (
        <nav className="navbar">
            <div className="nav-left">
                <h1 className="author">Kacper Żabiński</h1>
            </div>
            <div className="nav-center">
                <ul className="nav-links">
                    {navLinks.map(link => (
                        <li key={link.text}>
                            <a href={link.link} className="nav-link">
                                <span>{link.text}</span>
                                <span className="underline"></span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={'nav-right'}>
                <button className={'contact-button'}>
                    <h3>Contact Me</h3>
                </button>
            </div>


        </nav>
    )
}
export default NavBar;