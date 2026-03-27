import messageUser from "../messager/massenger.js";

export async function operateLikeButton(){
    const deleteButtons = document.querySelectorAll(".like-button");

    deleteButtons.forEach(deletebutton => {
        deletebutton.addEventListener("click", async (e) => {
           let likedState = e.target.getAttribute("data-state");
           let postId = e.target.parentElement.getAttribute("data-id")

           if (likedState === "notLiked") {
              const res = await fetch("http://localhost:3000/api/posts/like", {
                  method: "POST",
                  credentials: "include",
                  headers: {"content-type": "application/json"},
                  body: JSON.stringify({postId: postId}),
              })
               if (res.status === 200) {
                   await window.location.reload();
                   messageUser("Post was liked successfully!", "green")
               } else {
                   messageUser("Post was liked unsuccessfully!", "green")
               }
           } else {
               const res = await fetch("http://localhost:3000/api/posts/unlike", {
                   method: "DELETE",
                   credentials: "include",
                   headers: {"content-type": "application/json"},
                   body: JSON.stringify({postId: postId}),
               })
               if (res.status === 200) {
                   await window.location.reload();
                   messageUser("Post was unliked successfully!", "green")
               } else {
                   messageUser("Post was unliked unsuccessfully!", "green")
               }
           }
        })
    })
}