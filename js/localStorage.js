export const addToLocalStorage = function (cityName, cityObject) {
  localStorage.setItem(cityName, JSON.stringify(cityObject));
};

export const getItemFromLocalStorage = function (cityName) {
  return JSON.parse(localStorage.getItem(cityName));
};

export const removeItemFromLocalStorage = function (cityName) {
  localStorage.removeItem(cityName);
};
