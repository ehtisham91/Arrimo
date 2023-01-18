export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
  return window.localStorage.getItem(key);
};
