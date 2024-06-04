const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const { authenticateToken } = require('../middleware/auth');

router.get('/', async (req, res) => {
    const notifications = await Notification.findAll();
    res.json(notifications);
});

router.post('/', authenticateToken, async (req, res) => {
    const newNotification = await Notification.create(req.body);
    res.status(201).json(newNotification);
});

router.delete('/:id', authenticateToken, async (req, res) => {
    const deleted = await Notification.destroy({ where: { id: req.params.id } });
    if (deleted) {
        res.send('Notification deleted');
    } else {
        res.status(404).send('Notification not found');
    }
});

module.exports = router;
