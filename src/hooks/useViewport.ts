import { useState } from "react"
import useMount from "./useMount";

export default function useViewport() {
    const [viewport, setViewport] = useState<{
        width: number;
        height: number;
        devicePixelRatio: number;
        isLandscape: boolean;
        isPortrait: boolean;
        isMobile: boolean;
        isTablet: boolean;
        isDesktop: boolean;
    }>({
        width: 0,
        height: 0,
        devicePixelRatio: 1,
        isLandscape: true,
        isPortrait: false,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
    });
    useMount(() => {
        setViewport({
            width: (typeof window === "undefined" ? 0 : window.innerWidth),
            height: (typeof window === "undefined" ? 0 : window.innerHeight),
            devicePixelRatio: (typeof window === "undefined" ? 1 : window.devicePixelRatio),
            isLandscape: (typeof window === "undefined" ? 0 : window.innerWidth) > (typeof window === "undefined" ? 0 : window.innerHeight),
            isPortrait: (typeof window === "undefined" ? 0 : window.innerWidth) < (typeof window === "undefined" ? 0 : window.innerHeight),
            isMobile: (typeof window === "undefined" ? 0 : window.innerWidth) < 768,
            isTablet: (typeof window === "undefined" ? 0 : window.innerWidth) < 1024,
            isDesktop: (typeof window === "undefined" ? 0 : window.innerWidth) > 1024,
        })
    })
    return viewport
}