export function isRestroUserAuthenticated() {
    const restroAuthenticated = document.cookie.includes("restro__authenticated=");
    return restroAuthenticated;
}