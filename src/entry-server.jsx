import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Used only by scripts/prerender.mjs to put real HTML into dist/index.html.
export function render(){ return renderToString(<App/>); }
