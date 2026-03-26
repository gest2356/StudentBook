import messageUser from "../../messager/massenger.js";

export async function postNewPost(newPost) {

    console.log(newPost);
    const res = await fetch('http://localhost:3000/api/posts/postnew', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify(newPost)
    })

    if (res.status === 200) {
        messageUser("delete was successfully deleted", "green")
        window.location.reload()
    } else {
        messageUser("delete was not successfully deleted", "red")
    }
}