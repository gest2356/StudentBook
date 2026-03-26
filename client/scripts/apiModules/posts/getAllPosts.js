import User from "../../../../classes/user.js";
import {Post} from "../../../../classes/post.js";

export default async function  getAllPosts() {
    const postContainer = document.getElementById('post-container');

    const res = await fetch('http://localhost:3000/api/posts/getall', {
        method: 'GET',
        headers: {'content-type': 'application/json'},
    })

    const data = await res.json()
    console.log(data)
    const posts = []

    data.forEach((rawData) => {
        let newUser = new Post(rawData.post_id, rawData.title, rawData.content, rawData.created_at, rawData.user_id);
        posts.push(newUser)
    })

    console.log(posts)
    return posts;

}