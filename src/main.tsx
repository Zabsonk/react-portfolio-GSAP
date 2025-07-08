import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap';
import App from './App.tsx';
import "./styles/index.css";
import "./styles/navbar.css";
import "./styles/skills.css";
import "./styles/about.css";
import "./styles/hero.css";
import "./styles/particleScene.css";
import "./styles/contact.css";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {SplitText} from "gsap/SplitText";


const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Nie znaleziono elementu z id 'root'.");
}
gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollTrigger);

createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>
);
