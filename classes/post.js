export class Post {
    constructor(postId, title, content, createdAt, author ,userId, likes) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.author = author;
        this.userId = userId;
        this.likes = likes
    }
}