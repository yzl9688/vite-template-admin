import { RefObject, useCallback, useEffect, useState } from "react";
import screenfull from "screenfull";

export const useFullScreen = (element?: RefObject<HTMLElement>) => {
  const [isFullscreen, setIsFullScreen] = useState(false);

  const handleChange = () => {
    if (screenfull.isEnabled) {
      setIsFullScreen(screenfull.isFullscreen);
    }
  };

  const handleToggle = useCallback(() => {
    if (screenfull.isEnabled) {
      screenfull.toggle(element?.current || undefined);
    }
  }, [element]);

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", handleChange);

      return () => {
        screenfull.off("change", handleChange);
      };
    }
  }, []);

  return {
    isFullscreen,
    handleToggle,
  };
};
