const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.get('/:id', authenticateToken, async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(newUser);
});

router.put('/:id', authenticateToken, async (req, res) => {
    const updated = await User.update(req.body, { where: { id: req.params.id } });
    if (updated) {
        res.send('User updated');
    } else {
        res.status(404).send('User not found');
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) {
        res.send('User deleted');
    } else {
        res.status(404).send('User not found');
    }
});

module.exports = router;
