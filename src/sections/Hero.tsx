import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {words} from "../constants";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
      <section>
        <div className="hero-text">
          <h1>
            Shaping
            <span className="slide">
                  <span className="wrapper">
                     {words.map((word:{text: string, imgPath: string}, index: number) => (
                         <span key={index} className="icon-text">
                            <img src={word.imgPath} alt="person"/>
                            <span>{word.text}</span>
                          </span>
                     ))}
                  </span>
                </span>
          </h1>
          <h1>into Real Projects</h1>
          <h1>that Deliver Results</h1>
        </div>

      </section>
  );
};

export default Hero;
