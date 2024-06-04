const express = require('express');
const app = express();
const Alumni = require('../models/alumni');
const { authenticateToken } = require('../middleware/auth');

app.get('/alumni', async (req, res) => {
    const alumni = await Alumni.findAll();
    res.json(alumni);
});

app.get('/alumni/:id', async (req, res) => {
    const alumni = await Alumni.findByPk(req.params.id);
    if (alumni) {
        res.json(alumni);
    } else {
        res.status(404).send('Alumni not found');
    }
});

app.post('/alumni', authenticateToken, async (req, res) => {
    const newAlumni = await Alumni.create(req.body);
    res.status(201).json(newAlumni);
});

app.put('/alumni/:id', authenticateToken, async (req, res) => {
    const updated = await Alumni.update(req.body, { where: { id: req.params.id } });
    if (updated) {
        res.send('Alumni updated');
    } else {
        res.status(404).send('Alumni not found');
    }
});

app.delete('/:id', authenticateToken, async (req, res) => {
    const deleted = await Alumni.destroy({ where: { id: req.params.id } });
    if (deleted) {
        res.send('Alumni deleted');
    } else {
        res.status(404).send('Alumni not found');
    }
});

module.exports = router;
