const NAV_TYPE_KEY = "agriwow:nav-type";
const LISTING_PAGE_PREFIX = "agriwow:listing-page:";

export function markRouteNavType(isPop) {
  try {
    sessionStorage.setItem(NAV_TYPE_KEY, isPop ? "pop" : "push");
  } catch {
    // ignore quota / private-mode errors
  }
}

export function isPopNavigation() {
  try {
    if (sessionStorage.getItem(NAV_TYPE_KEY) === "pop") return true;
    const navEntry = performance.getEntriesByType?.("navigation")?.[0];
    if (navEntry?.type === "back_forward") return true;
    return performance.navigation?.type === 2;
  } catch {
    return false;
  }
}

export function listingPageStorageKey(pathname) {
  return `${LISTING_PAGE_PREFIX}${pathname}`;
}

export function saveListingPage(pathname, page) {
  if (!pathname) return;
  try {
    sessionStorage.setItem(listingPageStorageKey(pathname), String(page));
  } catch {
    // ignore quota / private-mode errors
  }
}

export function readListingPage(pathname) {
  if (!pathname) return null;
  try {
    const parsed = Number.parseInt(
      sessionStorage.getItem(listingPageStorageKey(pathname)),
      10,
    );
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  } catch {
    return null;
  }
}

export function getPathnameFromAsPath(asPath) {
  return (asPath || "").split("?")[0] || "";
}
