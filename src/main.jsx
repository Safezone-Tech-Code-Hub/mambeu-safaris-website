import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CmsProvider } from './CmsProvider.jsx';
import './fonts.css';
import './style.css';

const el = document.getElementById('root');
const app = (
  <BrowserRouter>
    <CmsProvider>
      <App />
    </CmsProvider>
  </BrowserRouter>
);

if (el.hasChildNodes()) {
  hydrateRoot(el, app);
} else {
  createRoot(el).render(app);
}
