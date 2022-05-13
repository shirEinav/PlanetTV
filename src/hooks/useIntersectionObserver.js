import { useEffect } from 'react';

const useIntersectionObserver = ({
  root = null,
  target,
  onIntersect,
  threshold = 0,
  rootMargin = '0px',
  enabled = true,
}) => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        entry.isIntersecting && onIntersect();
      },
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const element = target && target.current;

    if (!element) return;

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [root, target, onIntersect, threshold, rootMargin, enabled]);
};

export default useIntersectionObserver;
