'use client';

import { useEffect, useMemo, useState } from 'react';

export default function useActiveSection(sectionIds, options) {
  const idsKey = useMemo(() => sectionIds.join('|'), [sectionIds]);
  const [active, setActive] = useState(sectionIds?.[0] ?? '');

  useEffect(() => {
    const navOffset = options?.navOffset ?? 110;

    const compute = () => {
      const line = navOffset + 1;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        if (top <= line) current = id;
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [idsKey, options?.navOffset]);

  return active;
}
