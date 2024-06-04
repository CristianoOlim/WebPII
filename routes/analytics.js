const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Dummy endpoint for analytics
router.get('/', authenticateToken, (req, res) => {
    // Fetch and return analytics data here
    res.json({ message: "Analytics data" });
});

module.exports = router;
