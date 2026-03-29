import messageUser from "../../messager/massenger.js";

export async function deleteComment(commentId) {

    const res = await fetch('http://localhost:3000/api/comments/delete', {
        method: 'DELETE',
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({commentId: commentId})
    })

    if (res.status === 200) {
        window.location.reload()
        messageUser("comment deleted successfully", "green")
    } else {
        messageUser("comment deleted unsuccessfully", "red")
    }
}