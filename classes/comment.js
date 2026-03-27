export class Comment {
    constructor(commentId, userId, postId, content, createdAt) {
       this.commentId = commentId;
       this.userId = userId;
       this.postId = postId;
       this.content = content;
       this.createdAt = createdAt;
    }
}