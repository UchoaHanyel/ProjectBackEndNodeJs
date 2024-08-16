const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UsuarioModel');

require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username
    },
        process.env.APP_KEY, {
        expiresIn: '1h'
    });
};

exports.register = async (req, res) => {
    const {
        username, password, email
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            username, password: hashedPassword, email
        });

        res.json({
            user, token: generateToken(user)
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {

    const {
        username, password
    } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        } res.json({ token: generateToken(user) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyToken = (req, res, next) => {
    console.log('ver req1', req.headers);
    const token = req.headers['authorization'];

    console.log("ver token: " + token);

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }
        req.userId = decoded.id; next();
    });
};