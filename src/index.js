import React from 'react';
import ReactDOM from 'react-dom/client';
// NEU: Import des Providers für SEO-Tags
import { HelmetProvider } from 'react-helmet-async'; 
import './index.css'; // Oder der korrekte Pfad zu Ihrer CSS-Datei
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Der HelmetProvider muss die gesamte App umschliessen */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
