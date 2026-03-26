export function getPostToDelete() {
    const deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", (e) => {
            e.preventDefault();

            const idToDelete = deleteButton.parentElement.getAttribute('data-id');


        })
    })
}
