import {displayEditPostInputs} from "../displayScripts/displayEditPostInput.js";

export async function getPostToEdit() {

    const editButtons = document.querySelectorAll(".edit-button");

    editButtons.forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();

            const postToEdit = el.parentElement;
            const postToEditId = postToEdit.getAttribute("data-id");

            const res = displayEditPostInputs(postToEditId, postToEdit);

        })
    })
}