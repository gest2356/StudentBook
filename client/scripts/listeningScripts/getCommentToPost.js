import {getTextFromQuillInstance} from "../displayScripts/quill.js";
import {postNewComment} from "../apiModules/comments/postNewComment.js";

export async function getCommentToPost() {

    const commentButtons = document.querySelectorAll('.comment-post-button');

    commentButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const commentBoxId = button.parentElement.getAttribute('data-com-id')

            const commentContent = getTextFromQuillInstance(commentBoxId);
            const postId = button.parentElement.parentElement.getAttribute('data-id');

            console.log(postId);
            console.log(commentContent);

            const res =  postNewComment(postId, commentContent);

        })
    })

}