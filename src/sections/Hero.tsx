import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {words} from "../constants";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1, .hero-text p",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
      <section className="hero">
          <div className="hero-text">
              <h1>
                  Turning
                  <span className="slide">
                    <span className="wrapper">
                      {words.map((word: { text: string; imgPath: string }, index: number) => (
                          <span key={index} className="icon-text">
                          <span className="img-wrapper">
                            <img src={word.imgPath} alt="person"/>
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
                  Hi, I'm App developer from Poland.
              </p>
          </div>
      </section>
  );
};

export default Hero;
