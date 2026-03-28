import messageUser from "../../messager/massenger.js";

export async function postNewComment(postId, text) {

    const newCommentObj = {
        id: postId,
        text: text,
    }

    console.log(newCommentObj);

    const res = await fetch('http://localhost:3000/api/comments/newcomment', {
        method: 'POST',
        credentials: 'include',
        headers: {"content-type": "application/json"},
        body: JSON.stringify(newCommentObj)
    })

    if (res.status === 200) {
        window.location.reload();
        messageUser("Comment created successfully.")
    } else {
        messageUser("Comment created unsuccessfully.")
    }


}