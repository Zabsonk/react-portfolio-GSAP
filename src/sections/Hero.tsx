import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {type ImgTexts, words} from "../constants";
import type {ReactElement} from "react";

const Hero = (): ReactElement => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1, .hero-text p",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
      gsap.fromTo(
          " .portrait-wrapper",
          { opacity: 0 },
          { y: 0, opacity: 1,  duration: 2, ease: "power2.inOut" }
      );
  });

  return (
      <section className="hero">
          <div className="hero-text">
              <h1>
                  Turning
                  <span className="slide">
                    <span className="wrapper">
                      {words.map((word: ImgTexts, index: number) => (
                          <span key={index} className="icon-text">
                          <span className="img-wrapper">
                            {word.icon && <word.icon  className="hero-icon"/>}
                          </span>
                          <span>{word.text}</span>
                        </span>
                      ))}
                    </span>
                  </span>
              </h1>
              <h1>into Interactive Games</h1>
              <h1>and Applications</h1>
              <p>
                  Hi, I'm Frontend/Game developer from Poland.
              </p>
          </div>
          <div className="portrait-wrapper">
              <img className={'portrait'} src={'/images/portrait.png'} alt={'portrait'}/>
          </div>
      </section>
  );
};

export default Hero;
