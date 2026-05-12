import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Easter egg
console.log(
  "%c\n" +
  "  __  __       _                          \n" +
  " |  \\/  | __ _| |_ ___ _   _ ___ ____    \n" +
  " | |\\/| |/ _` | __/ _ \\ | | / __|_  /    \n" +
  " | |  | | (_| | ||  __/ |_| \\__ \\/ /     \n" +
  " |_|  |_|\\__,_|\\__\\___|\\__,_|___/___|    \n" +
  "\n",
  "color: #33c2cc; font-size: 12px; font-family: monospace;"
);
console.log(
  "%cHej! Zaglądasz pod maskę? Szanuję. 🔧\n" +
  "%cReact + Vite + three.js + motion\n" +
  "%cNapisz do mnie → mateusz.stachowicz1@wp.pl",
  "color: #7a57db; font-size: 14px; font-weight: bold;",
  "color: #57db96; font-size: 12px;",
  "color: #d6995c; font-size: 12px;"
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
