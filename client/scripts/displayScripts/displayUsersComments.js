import {Comment} from "../../../classes/comment.js";
import {getCommentsForUser} from "../apiModules/comments/getCommentsForUser.js";

export async function displayUsersComments(userIdToSeeInfo) {

    const commentContainerAll = document.getElementById("users-comments-on-posts-container");

    const comments = await getCommentsForUser(userIdToSeeInfo)

    comments.forEach(comment => {
        const commentPostTitleP = document.createElement("p");
        const commentContentP = document.createElement("p");
        const commentCreatedAtSpan = document.createElement("span");
        const commentContainer = document.createElement("div");

        commentPostTitleP.innerHTML = `comment on post: ${comment.postTitle}`;
        commentContentP.innerHTML = comment.content
        commentCreatedAtSpan.innerHTML = `at ${comment.createdAt}`

        commentContainer.classList.add("comment");

        commentContainer.appendChild(commentPostTitleP);
        commentContainer.appendChild(commentCreatedAtSpan);
        commentContainer.appendChild(commentContentP);

        commentContainerAll.append(commentContainer);

    })


}