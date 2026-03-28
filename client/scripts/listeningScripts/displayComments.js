
export default function displayComments() {
    const commentsViewButtons = document.querySelectorAll(".comments-button");
    commentsViewButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            const commentsBox = e.target.parentElement.children[6];

            if (commentsBox.getAttribute("style") === "display: none;") {
                commentsBox.style.display = "block";
            } else {
                commentsBox.style.display = "none";
            }


        })
    })
}