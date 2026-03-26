import getAllPosts from './../apiModules/posts/getAllPosts.js';
import {getAuth} from './../authFunction/getAuth.js'

export async function  displayAllPosts() {
    const postContainerAll = document.getElementById('post-container');
    const posts = await getAllPosts();
    const user = await getAuth()
    
    console.log(posts);

    posts.forEach(post => {
        const postTitleP = document.createElement("h2")
        const postAuthorSpan = document.createElement("span")
        const postContentP = document.createElement("p")
        const postCreatedAtSpan = document.createElement("span")

        postTitleP.innerHTML = post.title
        postAuthorSpan.innerHTML = post.author
        postAuthorSpan.dataset.id = post.userId
        postContentP.innerHTML = post.content
        postCreatedAtSpan.innerHTML = post.createdAt

        const postContainter = document.createElement("div")
        postContainter.dataset.id = post.postId

        postContainter.appendChild(postTitleP)
        postContainter.appendChild(postAuthorSpan)
        postContainter.appendChild(postCreatedAtSpan)
        postContainter.appendChild(postContentP)

        postContainter.classList.add("post")
        
        postContainerAll.appendChild(postContainter)

        if (user.id == postAuthorSpan.getAttribute("data-id"))
        {
            console.log("věc")
            let delButton = document.createElement("button")
            delButton.innerHTML = 'Delete'
            delButton.classList.add("delete-button")
            postContainter.appendChild(delButton)
        }



    })
}