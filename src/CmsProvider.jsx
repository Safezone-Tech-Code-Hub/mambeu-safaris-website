import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCatalog, staticCatalog } from './lib/cms.js';

const CmsContext = createContext({ ...staticCatalog, live: false });

export function CmsProvider({ children }) {
  const [catalog, setCatalog] = useState(staticCatalog);

  useEffect(() => {
    let ignore = false;
    fetchCatalog()
      .then((next) => {
        if (!ignore) setCatalog(next);
      })
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, []);

  return <CmsContext.Provider value={catalog}>{children}</CmsContext.Provider>;
}

export function useCms() {
  return useContext(CmsContext);
}
