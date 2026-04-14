import {getUsersPostLikes} from "../apiModules/posts/getUsersPostLikes.js";

export function getPostToDisplayUserLikes() {
    const allLiked = document.querySelectorAll(".likes-count")
    const likedUsersBox = document.getElementById("likes-users-info");

    allLiked.forEach((likeCount) => {
        likeCount.addEventListener("click", async (e) => {
            const postId = e.target.parentElement.getAttribute("data-id")


            const data = await getUsersPostLikes(postId);

            data.forEach((userName) => {
                let name = userName.userName

                let nameP = document.createElement("p");
                nameP.innerHTML = name;
                likedUsersBox.appendChild(nameP);
            })

            if (likedUsersBox.style.display === "block") {
                likedUsersBox.style.display = "none";
                const names = likedUsersBox.querySelectorAll("p")
                names.forEach((name) => {
                    name.remove();
                })
            } else {
                likedUsersBox.style.display = "block";
            }
            likedUsersBox.style.left = (e.clientX + 10) + 'px';
            likedUsersBox.style.top = (e.clientY + 10) + 'px';

        })
    })
}
