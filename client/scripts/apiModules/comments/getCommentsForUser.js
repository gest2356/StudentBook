import {Comment} from "./../../../../classes/comment.js";

export async function getCommentsForUser(userId) {
    const res = await fetch(`http://localhost:3000/api/comments/getpostsforuser`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({userId: userId})
    })

    const data = await res.json();
    const comments = []

    data.forEach(comment => {
        let time = new Date(comment.created_at)

        let newComment = new Comment(comment.comment_id, comment.user_id, "", comment.post_id, comment.content, time.toLocaleTimeString("cs-CZ"), comment.postTitle)

        comments.push(newComment)
    })

    return comments;
}
