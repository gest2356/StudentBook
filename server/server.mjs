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

    const response = await queryMySQL(pool,
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


app.get('/api/posts/getall', async (req, res) => {
    const response = await queryMySQL("SELECT p.*, CONCAT(u.first_name, ' ', u.last_name) AS author FROM users u INNER JOIN posts p ON p.user_id = u.user_id")
    console.log(response)

    res.json(response);
})

app.delete('/api/posts/delete', verifyToken, async (req, res) => {
    const {postId, userId} = req.body;
    const userIdToChack = req.user._user_id

    console.log(userId)
    console.log(userIdToChack)

    if (userIdToChack === userId) {
        const response = await queryMySQL('DELETE FROM posts WHERE post_id = ? AND user_id = ?', [postId, userId]);
        res.send(response);
    }
    res.status(401).json({message: "the user which is logged in, is not the user who made this post"})

})