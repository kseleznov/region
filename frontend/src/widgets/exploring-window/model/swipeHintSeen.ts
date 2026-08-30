const STORAGE_KEY = "exploring:swipe-hint-seen";

/** Whether the swipe onboarding hint has already been shown to this visitor. */
export function hasSeenSwipeHint(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // SSR, private mode, or storage disabled — treat as "not seen".
    return false;
  }
}

export function markSwipeHintSeen(): void {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // storage unavailable — the hint just shows again next time, no crash.
  }
}

/** For `useSyncExternalStore` — reacts to the flag being set in another tab. */
export function subscribeSwipeHintSeen(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}
