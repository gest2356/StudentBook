import getAllPosts from './../apiModules/posts/getAllPosts.js';
import {getAuth} from './../authFunction/getAuth.js'
import {getLikeStatus} from "../apiModules/posts/getLikeStatus.js";

export async function  displayAllPosts() {
    const postContainerAll = document.getElementById('post-container');
    const posts = await getAllPosts();
    const user = await getAuth()

    for (const post of posts) {
        const postTitleP = document.createElement("h2");
        const postAuthorSpan = document.createElement("span");
        const postContentP = document.createElement("p");
        const postCreatedAtSpan = document.createElement("span");
        const likeStatusP = document.createElement("p");

        postTitleP.innerHTML = post.title;
        postAuthorSpan.innerHTML = post.author;
        postAuthorSpan.dataset.id = post.userId;
        postContentP.innerHTML = post.content;
        postCreatedAtSpan.innerHTML = post.createdAt;

        const postContainter = document.createElement("div");
        postContainter.dataset.id = post.postId;

        postContainter.appendChild(postTitleP);
        postContainter.appendChild(postAuthorSpan);
        postContainter.appendChild(postCreatedAtSpan);
        postContainter.appendChild(postContentP);

        postContainter.classList.add("post");

        postContainerAll.appendChild(postContainter);

        if (user.id == postAuthorSpan.getAttribute("data-id")) {
            console.log("věc");
            let delButton = document.createElement("button");
            delButton.innerHTML = 'Delete';
            delButton.classList.add("delete-button");
            postContainter.appendChild(delButton);
        }

        const commentsButton = document.createElement("button");
        commentsButton.innerHTML = 'See comments';
        commentsButton.classList.add("comments-button");

        const commentsContainer = document.createElement("div");
        commentsContainer.classList.add("comments-container");
       // commentsContainer.style.display = "none";

        const commentsEditor = document.createElement("div");
        commentsEditor.classList.add('comments-editor');
        commentsContainer.appendChild(commentsEditor);

        postContainter.appendChild(commentsButton)
        postContainter.appendChild(commentsContainer);


        let likeStatus = await getLikeStatus(post.postId);

        if (likeStatus === true) {
            likeStatusP.innerHTML = 'Liked!';
            likeStatusP.dataset.state = 'liked'
        } else {
            likeStatusP.innerHTML = 'like?';
            likeStatusP.dataset.state = 'notLiked'
        }

        likeStatusP.classList.add("like-button");
        postContainter.appendChild(likeStatusP);
    }
}