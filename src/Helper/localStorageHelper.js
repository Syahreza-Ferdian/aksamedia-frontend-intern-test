export const getFromLocalStorage = (key, defaultValue = []) => {
    try {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : defaultValue;
    } catch (error) {
        console.error(`Error reading key "${key}" from localStorage:`, error);
        return defaultValue;
    }
};

export const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving key "${key}" to localStorage:`, error);
    }
};

export const removeFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing key "${key}" from localStorage:`, error);
    }
};

export const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user')) || null;
};

export const saveUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};