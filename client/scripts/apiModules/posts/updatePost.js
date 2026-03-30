import messageUser from "../../messager/massenger.js";

export async function updatePost(postToEditId, newPostTitle, newPostContent){

    const updatePostObj = {
        postId: postToEditId,
        postTitle: newPostTitle,
        postContent: newPostContent
    }

    const res = await fetch('http://localhost:3000/api/posts/updatepost', {
        method: 'POST',
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatePostObj)
    })

    if (res.status === 200) {
        await messageUser("Your post has been updated successfully.", "green")
        window.location.reload();
    } else {
        messageUser("Your post has not been updated successfully.", "red")
    }

}