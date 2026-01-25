'use client';

import { useEffect, useMemo, useState } from 'react';

export default function useActiveSection(sectionIds, options) {
  const idsKey = useMemo(() => sectionIds.join('|'), [sectionIds]);
  const [active, setActive] = useState(sectionIds?.[0] ?? '');

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!els.length) return;

    const navOffset = options?.navOffset ?? 110;
    const rootMargin = options?.rootMargin ?? `-${navOffset}px 0px -70% 0px`;
    const threshold = options?.threshold ?? [0, 0.1, 0.2, 0.3];

    let raf = 0;

    const io = new IntersectionObserver(
      (entries) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort(
              (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
            );

          if (!visible.length) return;

          const id = visible[0]?.target?.id;
          if (id) setActive(id);
        });
      },
      { root: null, rootMargin, threshold },
    );

    els.forEach((el) => io.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [idsKey, options?.rootMargin, options?.threshold, options?.navOffset]);

  return active;
}
