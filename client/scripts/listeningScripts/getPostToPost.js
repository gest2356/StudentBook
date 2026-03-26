import {getTextFromQuill} from "../displayScripts/quill.js";
import {postNewPost} from "../apiModules/posts/postNewPost.js";

export async function getPostToPost() {
    const button = document.getElementById('post-maker-button')
    const postTitleEl = document.getElementById('post-maker-title-input')

    button.addEventListener('click', async (e) => {
        e.preventDefault()

        const postTitle = postTitleEl.value
        const postContent = getTextFromQuill()

        const postToPost = {
            title: postTitle,
            content: postContent,
        }

        const res = await postNewPost(postToPost)
    })

}