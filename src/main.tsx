import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ENV, logger } from './config/env';

if (typeof document !== 'undefined') {
  document.title = ENV.appTitle;
}
logger.debug(`QuickQR Studio initialized in [${ENV.appEnv}] mode`);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
