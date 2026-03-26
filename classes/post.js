export class Post {
    constructor(postId, title, content, createdAt, userId) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.userId = userId;
    }
}