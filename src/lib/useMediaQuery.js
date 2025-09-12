'use client';

import { useState, useEffect, useCallback } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    let timeoutId;
    const debouncedListener = (e) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setMatches(e.matches), 150); // 150ms delay
    };

    media.addEventListener('change', debouncedListener);

    return () => {
      media.removeEventListener('change', debouncedListener);
      clearTimeout(timeoutId);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
