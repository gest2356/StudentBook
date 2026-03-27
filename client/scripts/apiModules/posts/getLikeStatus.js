import getAllPosts from "./getAllPosts.js";
import {getAuth} from "../../authFunction/getAuth.js";

export async function getLikeStatus(postId) {

    const currentlyLoggedInUser = await getAuth()

    const objToChack = {
        postId: postId,
        userId: currentlyLoggedInUser.id,
    }

    const res = await fetch('http://localhost:3000/api/postLikes/likestatus', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(objToChack),
    })

    if (res.status === 200) {
        return true
    } else {
        return false
    }

}