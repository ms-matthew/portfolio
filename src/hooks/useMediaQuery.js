import { useMediaQuery as useRR } from "react-responsive";

const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
};

export function useBelow(breakpoint) {
    return useRR({ maxWidth: BREAKPOINTS[breakpoint] - 1 });
}

export function useAbove(breakpoint) {
    return useRR({ minWidth: BREAKPOINTS[breakpoint] });
}

export function useCoarsePointer() {
    return useRR({ query: "(pointer: coarse)" });
}

export function useIsMobile() {
    const narrow = useBelow("md");
    const coarse = useCoarsePointer();
    return narrow || coarse;
}
