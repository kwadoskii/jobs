const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    const token = req.header('auth-token');

    if (!token) return res.status(401).send({ status: 'error', data: { error: 'Access Denied' } });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.auth = verified;
        res.status(200).send({ status: 'success', data: verified });
    } catch (error) {
        res.status(400).send({status: 'error', data: { error: 'Invalid Token' }});
    }
});


module.exports = router;