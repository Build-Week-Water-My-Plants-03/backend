const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");
const bcrypt = require("bcryptjs");
const Auth = require("./auth-model");
const {
    checkUsernameAvailable,
    checkUsernameExists
} = require("./auth-middleware");

router.post("/register", checkUsernameAvailable, (req, res, next) => {
    const credentials = req.body;

    if (
        !credentials.username ||
        !credentials.password ||
        !credentials.phone_number
    ) {
        res.status(400).json({ message: "username, password, and phone number required" });
    } else {
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcrypt.hashSync(credentials.password, rounds);
        credentials.password = hash;

        Auth.add(credentials)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch(next);
    }
});

router.post("/login", checkUsernameExists, (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).json({ message: "all fields are required" });
    } else {
        const {username, password } = req.body;

        Auth.findByUsername(username)
        .then((user) => {
            if(user && bcrypt.compareSync(password, user[0].password)) {
                const token = buildToken(user[0]);
                res.status(200).json({ message: "invalid credentials" });
            }
        })
        .catch(next);
    }
});

function buildToken(user) {
    const payload = {
        subject: user.user_id,
        username: user.username,
    };
    const config = {
        expiresIn: "1d",
    };
    return jwt.sign(payload, JWT_SECRET, config);
}

router.use((err, req, res, next) => {
    res.status(500).json({ message: "Something went wrong in the router"});
});

module.exports = router;