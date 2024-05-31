import { useCallback, useMemo } from "react";
import screenfull from "screenfull";

export const useFullScreen = (element?: HTMLElement) => {
  const isFullscreen = useMemo(() => {
    return screenfull.isFullscreen;
  }, [screenfull]);

  const handleToggle = useCallback(() => {
    if (screenfull.isEnabled) {
      screenfull.toggle(element);
    }
  }, [screenfull, element]);

  return {
    isFullscreen,
    handleToggle,
  };
};
