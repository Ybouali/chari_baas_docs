import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename="/chari_baas_docs">
        <App />
    </BrowserRouter>
);
