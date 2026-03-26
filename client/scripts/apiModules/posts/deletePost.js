import messageUser from './../../messager/massenger.js'

export async function deletePost(postId, userId) {

    const postToDeleteInfo = {
        postId: postId,
        userId: userId
    }

    const res = await fetch('http://localhost:3000/api/posts/delete', {
        method: 'DELETE',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postToDeleteInfo)
    })

    console.log(res.status)

    if (res.status === 200) {
        messageUser("delete was successfully deleted", "green")
    } else {
        messageUser("delete was not successfully deleted", "red")
    }
}