import Hero from "./sections/Hero";
import NavBar from "./sections/NavBar.tsx";
import About from './sections/About.tsx';
import Skills from "./sections/Skills.tsx";

const App = () => (
    <>
          <div className="hero-background">
                <NavBar/>
                <Hero/>
          </div>
          <Skills/>
          <About/>
    </>
);

export default App;
