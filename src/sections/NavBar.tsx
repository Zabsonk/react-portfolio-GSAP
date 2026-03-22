import { type ReactElement, useRef, useState } from "react";
import { navLinks } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

type Props = {
    onButtonClick: () => void;
};

const NavBar = ({ onButtonClick }: Props): ReactElement => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const animatedOnce = useRef(false);

    useGSAP(() => {
        if (animatedOnce.current) return;
        animatedOnce.current = true;

        gsap.from(".nav-center li", {
            y: 50, opacity: 0, stagger: 0.3, duration: 1, ease: "power2.inOut"
        });
        gsap.from(".nav-left, .nav-right", {
            y: 50, opacity: 0, duration: 1, ease: "power2.inOut"
        });
    });

    useGSAP(() => {
        if (!isMobileMenuOpen) return;
        gsap.from(".nav-links li", {
            y: 20, opacity: 0, stagger: 0.1, duration: 0.5, ease: "power2.out"
        });
    }, [isMobileMenuOpen]);

    useGSAP(() => {
        const nav = navRef.current;
        if (!nav) return;

        ScrollTrigger.create({
            trigger: ".home",
            scroller: ".home",
            start: "top top",
            onUpdate: (self) => {
                if (self.direction === 1 && self.scroll() > 50) {
                    gsap.to(nav, { y: -100, duration: 0.3, ease: "power2.out" });
                } else {
                    gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out" });
                }
            }
        });
    });

    return (
        <nav className="navbar" ref={navRef}>
            <div className="nav-left">
                <h1 className="author">Kacper Żabiński</h1>
            </div>

            <div className={`nav-center ${isMobileMenuOpen ? "show-mobile-menu" : ""}`}>
                <ul className="nav-links">
                {navLinks.map(link => (
                        <li key={link.text}>
                            <a href={link.link} className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                <span>{link.text}</span>
                                <span className="underline"></span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`nav-right ${isMobileMenuOpen ? "show-mobile-menu" : ""}`}>
                <button className="contact-button" onClick={onButtonClick}>
                    <img src="images/message.svg" alt="contact" />
                    <h3>Contact Me</h3>
                </button>
            </div>

            <div
                className="hamburger"
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                aria-label="Toggle menu"
            >
                <img
                    src={isMobileMenuOpen ? "./images/close.svg" : "./images/menu.svg"}
                    alt="menu"
                    width={24}
                    height={24}
                />
            </div>
        </nav>
    );
};

export default NavBar;