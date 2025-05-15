//Not used
export const getLocalStorage = (key: string) => {
    return localStorage.getItem(key);
};

//Not used
export const setLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
};

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};
