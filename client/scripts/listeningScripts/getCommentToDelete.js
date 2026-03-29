import {deleteComment} from './../apiModules/comments/deleteComment.js'

export async function getCommentToDelete() {
    console.log("listeting")
    const deleteButtons = document.querySelectorAll('.delete-comment-button');
    console.log(deleteButtons);

    deleteButtons.forEach(button => {
        button.addEventListener('click',async ()=> {
            const commentIdToDelete = button.parentElement.getAttribute("data-id")

            const res = await deleteComment(commentIdToDelete)
        })
    })
}