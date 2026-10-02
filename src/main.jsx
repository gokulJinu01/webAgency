import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import App from './App.jsx';

inject();

// The HTML is pre-rendered at build time (scripts/prerender.mjs), so hydrate it rather than rebuilding it.
const root = document.getElementById('root');
if (root.hasChildNodes()) hydrateRoot(root, <App/>);
else createRoot(root).render(<App/>);
