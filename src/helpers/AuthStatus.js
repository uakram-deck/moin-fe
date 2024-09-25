export function isRestroUserAuthenticated() {
    const restroAuthenticated = localStorage.getItem("restro__user") !== null;
    return restroAuthenticated;
}