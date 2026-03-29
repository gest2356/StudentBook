import {Post} from "../../../../classes/post.js";

export async function getUsersPosts(userIdToSeeInfo) {

    const res = await fetch(`http://localhost:3000/api/posts/getpostsforuser`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({userId: userIdToSeeInfo})
    })

    const data = await res.json()
    const posts = []

    data.forEach((post) => {

        let time = new Date(post.created_at)

        let newPost = new Post(post.post_id, post.title, post.content, time.toLocaleDateString('cs-CZ'), "", post.user_id, post.likes);

        posts.push(newPost)
    })

    return posts;

}