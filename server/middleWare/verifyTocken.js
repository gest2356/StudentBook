import jwt from "jsonwebtoken";

export default function (req, res, next) {
    const token = req.cookies.super_secret_token;

    if (!token) return res.status(401).send('unauthorized');

    try {
        const verified = jwt.verify(token, "super_secret_password");
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('invalid token');
    }
}