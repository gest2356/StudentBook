CREATE TABLE users (
                       user_id INT AUTO_INCREMENT PRIMARY KEY ,
                       first_name NVARCHAR(50) NOT NULL,
                       last_name NVARCHAR(50) NOT NULL,
                       age INT,
                       gender NVARCHAR(50)
);

CREATE TABLE posts (
                       post_id INT AUTO_INCREMENT PRIMARY KEY ,
                       title NVARCHAR(50) NOT NULL,
                       content TEXT NOT NULL,
                       created_at DATETIME DEFAULT NOW(),
                       user_id INT
);

ALTER TABLE  posts
    ADD CONSTRAINT FK_post_users FOREIGN KEY (user_id) REFERENCES users(user_id);

CREATE TABLE user_post_likes (
                                 user_id INT NOT NULL,
                                 post_id INT NOT NULL
);

ALTER TABLE user_post_likes
    ADD CONSTRAINT FK_user_post_likes_user FOREIGN KEY (user_id) REFERENCES  users(user_id);

ALTER TABLE user_post_likes
    ADD CONSTRAINT FK_user_post_likes_postrs FOREIGN KEY (post_id) REFERENCES  posts(post_id);


