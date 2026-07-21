import { useEffect, useState } from "react";

function useScrollThreshold(threshold = 300) {
    const [showAfterScroll, setShowAfterScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowAfterScroll(window.scrollY > threshold);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [threshold]);

    return showAfterScroll;
}

export default useScrollThreshold;