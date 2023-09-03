export function saveToLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key: string) {
  const value = localStorage.getItem(key) || undefined;
  return value;
}

export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}
