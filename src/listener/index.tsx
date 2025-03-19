import { useEffect, useRef, useState } from "react";

interface MobileListenerProps {
    milliseconds?: number;
    size?: number;
}

export const useIsMobileListener = (options?: MobileListenerProps) => {
    const { milliseconds = 100, size = 700 } = options ?? {};
    const timerRef = useRef<any>(null);

    const [isMobile, setIsMobile] = useState(window.innerWidth < size);

    const handleUpdateMobile = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setIsMobile(window.innerWidth < size);
        }, milliseconds);
    };
    useEventListenerWindow("resize", () => {
        handleUpdateMobile();
    });

    return isMobile;
};


export function useEventListenerWindow(eventName: string, handler: (value: any) => void) {
    // Create a ref that stores handler
    const savedHandler = useRef<any>(null);
    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            // Make sure element supports addEventListener
            // On
            const isSupported = window.addEventListener;
            if (!isSupported) return;
            // Create event listener that calls handler function stored in ref
            const eventListener = (event: any) => savedHandler.current(event);
            // Add event listener
            window.addEventListener(eventName, eventListener);
            // Remove event listener on cleanup
            return () => {
                window.removeEventListener(eventName, eventListener);
            };
        },
        [eventName] // Re-run if eventName or element changes
    );
}