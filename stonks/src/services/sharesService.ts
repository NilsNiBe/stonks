import { Share } from "../comps/Shares";

const localStonks = "stonks";

/** Loads Shares from localStorage */
export function loadLocalStorage(): Share[] {
  const localDataSharesString = localStorage.getItem(localStonks);
  return localDataSharesString ? JSON.parse(localDataSharesString) : [];
}
/** Saves Shares to localStorage */
export function saveLocalStorage(shares: Share[]) {
  localStorage.setItem(localStonks, JSON.stringify(shares));
}
