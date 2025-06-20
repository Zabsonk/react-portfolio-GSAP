import Hero from "./sections/Hero";
import NavBar from "./sections/NavBar.tsx";
import About from './sections/About.tsx';
import Skills from "./sections/Skills.tsx";
import ParticleWrapper from './sections/ParticleWrapper.tsx';

const App = () => (
  <>
      <ParticleWrapper/>
      <NavBar />
      <Hero />
      <Skills />
      <About />
  </>
);

export default App;
