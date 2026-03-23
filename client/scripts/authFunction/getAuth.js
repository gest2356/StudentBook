
export function getAuth() {
    if (localStorage.getItem("loggedInUser")) {
        return JSON.parse(localStorage.getItem("loggedInUser"));
    } else {
        return false
    }
}

export function logout(){
    if (localStorage.getItem("loggedInUser")) {
        localStorage.removeItem("loggedInUser");
    } else {
        return false;
    }
}