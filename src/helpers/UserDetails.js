export function saveUserDetailsInLocalStorage(user) {
    localStorage.setItem("restro__user", JSON.stringify(user));
}

export function getUserDetailsInLocalStorage() {
    const userStr = localStorage.getItem("restro__user");
    return JSON.parse(userStr);
}

export function clearUserDetailsInLocalStorage() {
    localStorage.removeItem("restro__user");
}