import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'mambeu-favourites';

/** @typedef {{
 *   ids: number[];
 *   toggle: (id: number) => void;
 *   has: (id: number) => boolean;
 *   clear: () => void;
 * }} FavouritesContextValue */

const FavouritesContext = createContext(
  /** @type {FavouritesContextValue | null} */ (null),
);

function readStoredIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === 'number') : [];
  } catch {
    return [];
  }
}

export function FavouritesProvider({ children }) {
  const [ids, setIds] = useState(() => (typeof window === 'undefined' ? [] : readStoredIds()));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const toggle = useCallback((id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const has = useCallback((id) => ids.includes(id), [ids]);

  const clear = useCallback(() => setIds([]), []);

  const value = useMemo(() => ({ ids, toggle, has, clear }), [ids, toggle, has, clear]);

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) {
    throw new Error('useFavourites must be used within FavouritesProvider');
  }
  return ctx;
}
