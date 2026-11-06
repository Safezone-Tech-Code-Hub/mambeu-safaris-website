import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import { CmsProvider } from './CmsProvider.jsx';
import { FavouritesProvider } from './FavouritesProvider.jsx';
import { getPageMeta } from './meta.js';

export function render(url) {
  const html = renderToString(
    <StaticRouter location={url}>
      <CmsProvider>
        <FavouritesProvider>
          <App />
        </FavouritesProvider>
      </CmsProvider>
    </StaticRouter>,
  );
  const meta = getPageMeta(url);
  return { html, ...meta };
}
