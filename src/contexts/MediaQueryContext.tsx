import React, { useState, useEffect } from "react";
import { DeviceType } from "./device";

const queries: Record<DeviceType, string> = {
  [DeviceType.Mobile]: "(max-width: 767px)",
  [DeviceType.Tablet]: "(min-width: 768px)",
  [DeviceType.Desktop]: "(min-width: 960px)",
  [DeviceType.DesktopWide]: "(min-width: 1248px)",
};

/**
 * @category Props
 */
export interface MediaQueryContextProps {
  children: React.ReactNode;
}

/**
 * @category Context state
 */
export interface MediaQueryContextState {
  matchedDevice: DeviceType;
}

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return windowWidth;
};

const MediaQueryContext = React.createContext<MediaQueryContextState>({
  matchedDevice: DeviceType.Mobile,
});

export const useMediaQuery = () => React.useContext(MediaQueryContext);

/**
 * @category Context
 */

const MediaQueryProvider = ({ children }: MediaQueryContextProps) => {
  const [value, setValue] = useState<MediaQueryContextState>({
    matchedDevice: DeviceType.Mobile,
  });
  const windowWidth = useWindowWidth();

  useEffect(() => {
    let newMatch = DeviceType.Mobile;
    for (const device in queries) {
      const match = window.matchMedia(queries[device as DeviceType]);
      if (match.matches) {
        newMatch = device as DeviceType;
      }
    }
    if (newMatch != value.matchedDevice) {
      setValue({ matchedDevice: newMatch });
    }
  }, [windowWidth]);

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
};

export default MediaQueryProvider;
