import {createQuiltForPostEdit, getTextFromCommentInput} from "./quill.js";
import {updatePost} from "../apiModules/posts/updatePost.js";

export async function displayEditPostInputs(postToEditId, postToEdit) {

    const postTitleP = postToEdit.querySelector('.post-title-p')
    const postTitle = postTitleP.innerHTML
    const postContentP = postToEdit.querySelector('.post-content-p');
    const postContent = postContentP.innerHTML

    const postTitleEditInput = document.createElement("input");
    postTitleEditInput.value = postTitle;
    const postContentEditQuilt = document.createElement("div")
    const postContentEditQuillContainer = document.createElement("div")
    postContentEditQuilt.setAttribute("id", "post-edit-quilt-input");
    postContentEditQuillContainer.appendChild(postContentEditQuilt);

    const controlButtonsContainer = document.createElement("div");
    controlButtonsContainer.classList.add("controlButtonsContainer");
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm-post-edit-button");
    confirmButton.innerHTML = "Confirm";
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-post-edit-button");
    cancelButton.innerHTML = "Cancel";

    controlButtonsContainer.appendChild(cancelButton);
    controlButtonsContainer.appendChild(confirmButton);

    postTitleP.replaceWith(postTitleEditInput);
    postContentP.replaceWith(postContentEditQuillContainer);

    createQuiltForPostEdit(postContent)

    postContentEditQuilt.after(controlButtonsContainer)

    cancelButton.addEventListener('click', () => {
        controlButtonsContainer.remove();

        postTitleEditInput.replaceWith(postTitleP);
        postContentEditQuillContainer.replaceWith(postContentP);
    })

    confirmButton.addEventListener('click', () => {
        const newPostTitle = postTitleEditInput.value;
        const newPostContent = getTextFromCommentInput()

        const res = updatePost(postToEditId, newPostTitle, newPostContent);
    })


}