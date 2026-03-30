import {Post} from "./../../../../classes/post.js"

export async function getUsersLikedPosts(userIdToSeeInfo) {

    const res = await fetch('http://localhost:3000/api/posts/getuserslikedposts', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ userId: userIdToSeeInfo }),
    })

    const data = await res.json()
    const posts = []

    data.forEach(post => {
        let date = new Date(data.created_at);
        let newPost = new Post(post.post_id, post.title, post.content, date.toLocaleDateString("cs-CZ"), post.author, post.user_id, post.likes)

        posts.push(newPost)
    })

    return posts;


}