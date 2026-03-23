import {logout, getAuth} from "../authFunction/getAuth.js";

export function renderNavBar() {
    const navbar = document.getElementById("navbar");
    const navList = document.getElementById("nav-list");

    let isUserLoggedIn = localStorage.getItem("loggedInUser");

    if (isUserLoggedIn) {
        //make feed link
        const feedLink = document.createElement("a");
        feedLink.href = "./feed.html";
        feedLink.setAttribute("href", "./feed.html");
        feedLink.classList.add("nav-item");

        const feedLinkText = document.createElement("p");
        feedLinkText.innerHTML = "Feed"

        feedLink.appendChild(feedLinkText);

        //make users link
        const usersLink = document.createElement("a");
        usersLink.href = "./users.html";
        usersLink.setAttribute("href", "./users.html");
        usersLink.classList.add("nav-item");

        const usersLinkText = document.createElement("p");
        usersLinkText.innerHTML = "Users"

        usersLink.appendChild(usersLinkText);

        //make userInfoClick
        const loggedInUser = document.createElement("p");
        loggedInUser.classList.add("nav-item");

        const user = getAuth()

        loggedInUser.innerHTML = `Hello ${user.first_name} ${user.last_name}!`;

        //logout button
        const logoutLink = document.createElement("p");
        logoutLink.classList.add("nav-item");
        logoutLink.innerHTML = "Logout";

        navList.appendChild(loggedInUser);
        navList.appendChild(usersLink);
        navList.appendChild(feedLink);
        navList.appendChild(logoutLink);

        logoutLink.addEventListener("click",logout )
    }

}