
export async function getComentsForPost(postId) {

    const res = await fetch("http://localhost:3000/api/comments/getcommentsforpost", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ postId: postId }),
    })
    if (res.status === 200) {
        return res.json()
    }
}