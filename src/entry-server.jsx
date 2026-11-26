import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import { CmsProvider } from './CmsProvider.jsx';
import { FavouritesProvider } from './FavouritesProvider.jsx';
import { getPageMeta } from './meta.js';

/** `catalog` (optional) renders with fetched CMS content instead of the built-in files. */
export function render(url, catalog) {
  const html = renderToString(
    <StaticRouter location={url}>
      <CmsProvider initial={catalog}>
        <FavouritesProvider>
          <App />
        </FavouritesProvider>
      </CmsProvider>
    </StaticRouter>,
  );
  const meta = getPageMeta(url);
  return { html, ...meta };
}
