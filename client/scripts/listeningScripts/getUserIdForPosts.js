import {displayUsersPosts} from "../displayScripts/displayUsersPosts.js";
import {displayUsersComments} from "../displayScripts/displayUsersComments.js";

export function getUserIdForPosts() {
    const seeInfoButton = document.querySelectorAll('.user-info-button');

    const postContainerAll = document.getElementById("user-posts-container");
    const commentContainerAll = document.getElementById("users-comments-on-posts-container");


    seeInfoButton.forEach(button => {
        button.addEventListener('click', (e) => {

            if (postContainerAll.children.length > 0) {
                const postsInContainer = postContainerAll.querySelectorAll('.post');
                postsInContainer.forEach((post) => {
                    postContainerAll.removeChild(post);
                })
            }

            if (commentContainerAll.children.length > 0) {
                const commentContainer = commentContainerAll.querySelectorAll('.comment');
                commentContainer.forEach((comment) => {
                    commentContainerAll.removeChild(comment);
                })
            }

            e.preventDefault();

            const userIdToSeeInfo = e.target.parentElement.getAttribute('data-id')

            const responseForPosts = displayUsersPosts(userIdToSeeInfo);
            const responseForComments = displayUsersComments(userIdToSeeInfo);
        })
    })
}