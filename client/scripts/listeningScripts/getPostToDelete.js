import {deletePost} from './../apiModules/posts/deletePost.js'

export async function getPostToDelete() {
    const deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", (e) => {
            e.preventDefault();

            const idToDelete = deleteButton.parentElement.getAttribute('data-id');
            const userId = deleteButton.parentElement.children[1].getAttribute('data-id');

            deletePost(idToDelete, userId);
        })
    })
}
