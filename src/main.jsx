import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CmsProvider } from './CmsProvider.jsx';
import { FavouritesProvider } from './FavouritesProvider.jsx';
import './fonts.css';
import './style.css';

const el = document.getElementById('root');
const app = (
  <BrowserRouter>
    <CmsProvider>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </CmsProvider>
  </BrowserRouter>
);

if (el.hasChildNodes()) {
  hydrateRoot(el, app);
} else {
  createRoot(el).render(app);
}
