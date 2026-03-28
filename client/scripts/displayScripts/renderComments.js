import {getComentsForPost} from "../apiModules/comments/getComentsForPost.js";
import {Comment} from "./../../../classes/comment.js"

export async function renderComments(postId, clickedCommentContainer) {
    const data = await getComentsForPost(postId);

    const comments = []

    data.forEach(rawData => {
        let comment = new Comment(rawData.comment_id, rawData.user_id, rawData.author ,rawData.post_id, rawData.content, rawData.created_at);
        comments.push(comment);
    })

    for (let comment of comments) {
        const commentBox = document.createElement("div");
        const commentAuthorP = document.createElement("p");
        const commentCreatedAtSpan = document.createElement("span");
        const commentContentP = document.createElement("p");

        commentBox.classList.add("comment-box");
        commentBox.dataset.id = comment.id;

        commentAuthorP.innerHTML = comment.author;
        commentAuthorP.dataset.id = comment.userId;

        let dayTime = new Date(comment.createdAt)
        commentCreatedAtSpan.innerHTML = dayTime.toLocaleTimeString("cs-CZ")

        commentContentP.innerHTML = comment.content

        commentBox.appendChild(commentAuthorP);
        commentBox.appendChild(commentCreatedAtSpan);
        commentBox.appendChild(commentContentP);

        clickedCommentContainer.appendChild(commentBox);

    }
}