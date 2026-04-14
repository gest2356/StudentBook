export async function getUsersPostLikes(postId) {

    const postIdToSend = {
        postId: postId,
    }

    const res = await fetch("http://localhost:3000/api/posts/getlikesforusers", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(postIdToSend)
    })

    const data = await res.json();
    return data;
}