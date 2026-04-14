import getAllPosts from './../apiModules/posts/getAllPosts.js';
import {getAuth} from './../authFunction/getAuth.js'
import {getLikeStatus} from "../apiModules/posts/getLikeStatus.js";

export async function  displayAllPosts() {
    const postContainerAll = document.getElementById('post-container');
    const posts = await getAllPosts();
    const user = await getAuth()
    let commentsForCounter = 0

    for (const post of posts) {
        const postTitleP = document.createElement("h2");
        const postAuthorSpan = document.createElement("span");
        const postContentP = document.createElement("p");
        const postCreatedAtSpan = document.createElement("span");
        const likeStatusP = document.createElement("p");
        const likeCountP = document.createElement("p");

        postTitleP.innerHTML = post.title;
        postTitleP.classList.add("post-title-p");
        postAuthorSpan.innerHTML = post.author;
        postAuthorSpan.dataset.id = post.userId;
        postContentP.innerHTML = post.content;
        postContentP.classList.add("post-content-p");
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
            let delButton = document.createElement("button");
            delButton.innerHTML = 'Delete';
            delButton.classList.add("delete-button");
            postContainter.appendChild(delButton);

            const editButton = document.createElement("button");
            editButton.classList.add("edit-button");
            editButton.innerHTML = "Edit";

            postTitleP.before(editButton);
        }

        const commentsButton = document.createElement("button");
        commentsButton.innerHTML = 'See comments';
        commentsButton.classList.add("comments-button");

        const commentsContainer = document.createElement("div");
        commentsContainer.classList.add("comments-container");
        commentsContainer.style.display = "none";
        commentsContainer.dataset.comId = commentsForCounter.toString();

        const commentsEditor = document.createElement("div");
        commentsEditor.classList.add('comments-editor');
        commentsContainer.appendChild(commentsEditor);

        const postCommentButton = document.createElement("button");
        postCommentButton.innerHTML = 'Post comment';
        postCommentButton.classList.add("comment-post-button");

        commentsContainer.appendChild(postCommentButton);
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

        likeCountP.innerHTML = `Likes: ${post.likes}`;
        likeCountP.classList.add("likes-count");
        postContainter.appendChild(likeCountP);

        likeStatusP.classList.add("like-button");
        postContainter.appendChild(likeStatusP);



        commentsForCounter++;
    }
}