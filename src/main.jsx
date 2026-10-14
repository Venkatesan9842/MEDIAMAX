import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/reference.css';
import './styles/pages.css';
import './styles/motion.css';
import './styles/hero-match.css';
import './styles/promo-height.css';
import './styles/brand-marquee.css';

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
);
