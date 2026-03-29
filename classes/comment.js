export class Comment {
    constructor(commentId, userId, author ,postId, content, createdAt, postTitle) {
       this.commentId = commentId;
       this.userId = userId;
       this.author = author
       this.postId = postId;
       this.content = content;
       this.createdAt = createdAt;
       this.postTitle = postTitle;
    }
}