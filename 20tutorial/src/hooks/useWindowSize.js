// Serves as a simple demonstration of custom hooks before creating more advanced hooks

import { useState, useEffect } from 'react';

// Notes:
// Custom hooks should only be called on top level (not in loops, conditions, or subfunctions)
// Can be called within other custom hooks
// "Don't call hooks from regular JS functions:"
// "Instead you can call hooks from React function components"
// "Call hooks from custom Hooks"

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    // Called at runtime once
    useEffect(() => {

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        handleResize();

        // Ensures that handleResize() is called every time the window is resized
        window.addEventListener("resize", handleResize);

        // Ensures prevention of memory leaking by removing event listener at end when a dependency is changed
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}

export default useWindowSize;