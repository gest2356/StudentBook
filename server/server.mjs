import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import {connectToMySQL, queryMySQL} from "../db/dbContext.mjs";

const app = express();
app.use(express.json());
app.use(cors())

const port = 3000

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

app.get('/', (req, res) => {
    res.send('Welcome to the students book API :)');
})

app.post('/api/users/register', async (req, res) => {
    console.log(req.body);
    const {firstName, lastName, password, age, gender} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);


    const pool = await connectToMySQL()

    const response = await queryMySQL(pool,
        'INSERT INTO users (first_name, last_name, age, gender, password_hash) VALUE (? ,?, ?, ?, ?)',
        [firstName, lastName, age,gender,hashedPassword])

    res.send(response.status);
})