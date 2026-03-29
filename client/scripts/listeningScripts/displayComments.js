import {renderComments} from "../displayScripts/renderComments.js";

export default async function displayComments() {
    const commentsViewButtons = document.querySelectorAll(".comments-button");
    commentsViewButtons.forEach(button => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();

            const commentsBox = e.target.parentElement.querySelector(".comments-container");

            console.log(commentsBox);

            const clickedPostComment = e.target.parentElement.getAttribute('data-id')



            if (commentsBox.getAttribute("style") === "display: none;") {
                commentsBox.style.display = "block";
                await renderComments(clickedPostComment, commentsBox);
            } else {
                let clickedCommentBoxComments = commentsBox.querySelectorAll(".comment-box");
                if (clickedCommentBoxComments) {
                    clickedCommentBoxComments.forEach(commentBoxComment => {
                        commentsBox.removeChild(commentBoxComment);
                    })
                }
                commentsBox.style.display = "none";
            }


        })
    })
}