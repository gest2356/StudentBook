import {getUsersPosts} from "../apiModules/posts/getUsersPosts.js";

export async function displayUsersPosts(userId) {

    const postContainerAll = document.getElementById("user-posts-container");

    const postToDisplay = await getUsersPosts(userId);

    postToDisplay.forEach(post => {
        const postTitleP = document.createElement("h2");
        const postAuthorSpan = document.createElement("span");
        const postContentP = document.createElement("p");
        const postCreatedAtSpan = document.createElement("span");
        const likeCountP = document.createElement("p");

        postTitleP.innerHTML = post.title;
        postAuthorSpan.innerHTML = post.author;
        postAuthorSpan.dataset.id = post.userId;
        postContentP.innerHTML = post.content;
        postCreatedAtSpan.innerHTML = post.createdAt
        likeCountP.innerHTML = post.likes;

        const postContainter = document.createElement("div");
        postContainter.dataset.id = post.postId;

        postContainter.appendChild(postTitleP);
        postContainter.appendChild(postAuthorSpan);
        postContainter.appendChild(postCreatedAtSpan);
        postContainter.appendChild(postContentP);

        postContainter.classList.add("post");

        postContainerAll.appendChild(postContainter);

    })

}