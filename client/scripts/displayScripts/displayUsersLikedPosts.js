import {getUsersLikedPosts} from "../apiModules/posts/getUsersLikedPosts.js";

export async function displayUsersLikedPosts(userIdToSeeInfo) {

    const posts = await getUsersLikedPosts(userIdToSeeInfo);
    const likedPostContainerAll = document.getElementById("users-liked-posts-container");

   posts.forEach(post => {
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

       postContainter.classList.add("liked-post");

       likedPostContainerAll.appendChild(postContainter);
   })

}