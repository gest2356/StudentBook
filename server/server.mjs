import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import {connectToMySQL, queryMySQL} from "../db/dbContext.mjs";
import jwt from 'jsonwebtoken';
import verifyToken from "./middleWare/verifyTocken.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:63342',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

const port = 3000

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectToMySQL();
})

app.get('/', (req, res) => {
    res.send('Welcome to the students book API :)');
})

app.post('/api/users/register', async (req, res) => {
    console.log(req.body);
    const {firstName, lastName, password, age, gender} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(password);

    const response = await queryMySQL(
        'INSERT INTO users (first_name, last_name, age, gender, password_hash) VALUE (? ,?, ?, ?, ?)',
        [firstName, lastName, age,gender,hashedPassword])

    res.send(response.status);
})

app.post('/api/users/login', async (req, res) => {
    const {firstName, lastName ,password} = req.body;

    const response = await queryMySQL(
        'SELECT * FROM users WHERE first_name = ? AND last_name = ? LIMIT 1',
        [firstName, lastName]);

    const isMatch = await bcrypt.compare(password, response[0].password_hash);

    if (isMatch) {
        const token = jwt.sign(
            {_user_id: response[0].user_id, _firstName: response[0].first_name, _lastName: response[0].last_name},
            "super_secret_password" || 'super_secret_token',
            {expiresIn: '1h'}
        );

        res.cookie('super_secret_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600000,
        }).json({ message: 'Logged in' });

    } else {
    return res.status(401).json({ message: "user not found" });
    }
})

app.get('/api/users/me', verifyToken, async (req, res) => {


    res.status(200).json({
        firstName: req.user._firstName,
        lastName: req.user._lastName,
        id: req.user._user_id,
    })

})

app.post('/api/users/logout', async (req, res) => {
    res.clearCookie('super_secret_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    }).json({ message: 'Logged out' });
})

app.get('/api/users/all', async (req, res) => {
    const response = await queryMySQL("SELECT u.user_id, u.first_name, u.last_name, u.age, u.gender, COUNT(p.post_id) AS postCount FROM users u LEFT JOIN posts p ON p.user_id = u.user_id GROUP BY u.user_id, u.first_name, u.last_name, u.age, u.gender ORDER BY u.last_name ASC")

    res.json(response);
})

app.get('/api/posts/getall', async (req, res) => {
    const response = await queryMySQL("SELECT p.*, CONCAT(u.first_name, ' ', u.last_name) AS author, COUNT(upl.user_id) as likes FROM users u INNER JOIN posts p ON p.user_id = u.user_id LEFT JOIN user_post_likes upl ON p.post_id = upl.post_id GROUP BY p.user_id, p.post_id, p.title, p.content, p.created_at, CONCAT(u.first_name, ' ', u.last_name)")

    res.json(response);
})

app.delete('/api/posts/delete', verifyToken, async (req, res) => {
    const {postId, userId} = req.body;
    const userIdToChack = req.user._user_id

    console.log(userId)
    console.log(userIdToChack)

    if (userIdToChack == userId) {
        const response = await queryMySQL('DELETE FROM posts WHERE post_id = ? AND user_id = ?', [postId, userId]);
        res.send(response);
    }
    res.status(401).json({message: "the user which is logged in, is not the user who made this post"})

})

app.post('/api/posts/postnew', verifyToken, async (req, res) => {
    const {title, content} = req.body;
    const userId = req.user._user_id

    const response = await queryMySQL("insert into posts(title, content, created_at, user_id) VALUES (?,?,NOW(),?)", [title, content, userId]);

    res.send(response);
})

app.post('/api/posts/like', verifyToken, async (req, res) => {
    const {postId} = req.body;
    const userId = req.user._user_id


     const response = queryMySQL("INSERT INTO user_post_likes(user_id, post_id) values (?,?)", [userId, postId]);

    res.send(response);
})

app.delete('/api/posts/unlike', verifyToken, async (req, res) => {
    const {postId} = req.body;
    const userId = req.user._user_id

    const response = queryMySQL("DELETE FROM user_post_likes WHERE user_id = ? AND post_id = ? ", [userId, postId]);

    res.send(response);
})

app.post('/api/posts/getpostsforuser', async (req, res) => {
    const {userId} = req.body

    const response = await queryMySQL("SELECT p.*, count(upl.user_id) AS likes FROM posts p left join user_post_likes upl ON p.post_id = upl.post_id WHERE p.user_id = ? GROUP BY p.user_id, p.post_id, p.title, p.content, p.created_at", [userId]);


    res.send(response);
})


app.post('/api/posts/getuserslikedposts', async (req, res) => {
    const {userId} = req.body

    const response = await queryMySQL("SELECT p.*, CONCAT(u.first_name, ' ', u.last_name) as author, count(upl.user_id) AS likes FROM posts p left join user_post_likes upl ON p.post_id = upl.post_id INNER JOIN users u ON p.user_id = u.user_id WHERE upl.user_id = ? GROUP BY p.user_id, p.post_id, p.title, p.content, p.created_at", [userId]);

    res.send(response);
})


app.post('/api/postLikes/likestatus',  async (req, res) => {
    const {postId, userId} = req.body;

    const response = await queryMySQL('SELECT * FROM user_post_likes WHERE post_id = ? AND user_id = ?', [postId, userId]);


    if (!response || response.length === 0) {
        return res.status(404).json({message: `User does not exist: ${postId}`});
    }


    if (response[0].user_id === userId && response[0].post_id === postId) {
        res.status(200).json({massage: "JESJES"})
    } else res.status(404).json({message: `User does not exist: ${postId}`});
})

app.post('/api/comments/newcomment', verifyToken, async (req, res) => {
    const {id, text} = req.body;
    const userId = req.user._user_id

    const response = queryMySQL('INSERT INTO comments(user_id, post_id, content) VALUES (?,?,?)', [userId, id, text])

    res.send(response.status);
})

app.post('/api/comments/getcommentsforpost', async (req, res) => {
    const {postId} = req.body;

    const response = await queryMySQL("SELECT c.*, CONCAT(u.first_name, ' ', u.last_name) AS author FROM comments c INNER JOIN users u ON c.user_id = u.user_id WHERE c.post_id = ?", [postId]);
    res.send(response);
})

app.delete('/api/comments/delete', verifyToken, async (req, res) => {
    const {commentId} = req.body;
    const userId = req.user._user_id

    const response = queryMySQL('DELETE FROM comments WHERE comment_id = ? AND user_id = ?', [commentId, userId]);

   res.send(response);

})

app.post('/api/comments/getpostsforuser', async (req, res) => {
    const {userId} = req.body;

    const response = await queryMySQL("SELECT c.*, p.title as postTitle FROM comments c INNER JOIN posts p ON c.post_id = p.post_id WHERE c.user_id = ?", [userId]);

    res.send(response);
})

app.post('/api/posts/updatepost', verifyToken, async (req, res) => {
    const {postId, postTitle, postContent} = req.body;
    const userId = req.user._user_id

    const response = await queryMySQL('UPDATE posts SET title = ?, content = ? WHERE user_id = ? AND post_id = ?', [postTitle, postContent, userId, postId]);
    console.log(response)

    res.send(response);
})