import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx';
import "./styles/index.css";
import "./styles/navbar.css";
import "./styles/skills.css";
import "./styles/about.css";
import "./styles/hero.css";
import "./styles/particleScene.css";
import "./styles/contact.css";


const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Nie znaleziono elementu z id 'root'.");
}

createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>
);
