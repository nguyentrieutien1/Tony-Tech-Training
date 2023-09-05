export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
  const value = localStorage.getItem(key) || undefined;
  return value;
}

export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}
