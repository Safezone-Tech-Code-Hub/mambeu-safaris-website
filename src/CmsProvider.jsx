import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCatalog, staticCatalog } from './lib/cms.js';

const CmsContext = createContext({ ...staticCatalog, live: false });

/** `initial` lets tests and server renders start from a fetched catalog. */
export function CmsProvider({ children, initial }) {
  const [catalog, setCatalog] = useState(initial || staticCatalog);

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
