import { createContext, useContext } from "react";

const LockContext = createContext({
    unlocked: false,
    hasPartner: false,
    progress: 0,
    unlock: () => {},
    relock: () => {},
});

export function LockProvider({ value, children }) {
    return <LockContext.Provider value={value}>{children}</LockContext.Provider>;
}

export function useLock() {
    return useContext(LockContext);
}
