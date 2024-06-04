const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const hostname = process.env.HOST || 'localhost';
const port = 3306;

/*// MySQL Connection
const db = mysql.createConnection({
    host: 'pw2.joaoferreira.eu',
    user: 'teresaterroso_pw2_user_g12',
    password: 'TzP#2SxUPu#;',
    database: 'teresaterroso_pw2_g12',
});*/

/*// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});*/

const db = require("./models");

// Middleware
app.use(bodyParser.json());

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Other Alumni endpoints
app.get('/alumni/:id', (req, res) => {
    const alumniId = req.params.id;
    db.query('SELECT * FROM alumni WHERE id = ?', alumniId, (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(404).json({ error: 'Alumni not found' });
        }
        res.json(results[0]);
    });
});

app.post('/alumni', authenticateToken, (req, res) => {
    const { name, email, graduationYear } = req.body;
    db.query('INSERT INTO alumni (name, email, graduation_year) VALUES (?, ?, ?)', [name, email, graduationYear], (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: 'Alumni profile created successfully', id: result.insertId });
    });
});

app.put('/alumni/:id', authenticateToken, (req, res) => {
    const alumniId = req.params.id;
    const { name, email, graduationYear } = req.body;
    db.query('UPDATE alumni SET name = ?, email = ?, graduation_year = ? WHERE id = ?', [name, email, graduationYear, alumniId], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Alumni profile updated successfully' });
    });
});

app.delete('/alumni/:id', authenticateToken, (req, res) => {
    const alumniId = req.params.id;
    db.query('DELETE FROM alumni WHERE id = ?', alumniId, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Alumni profile deleted successfully' });
    });
});

// Other endpoints (Notifications, Analytics, User Management) follow similar structure


// Other Alumni endpoints (GET /{id}, POST, PUT, DELETE)

// Notifications Endpoints
// Similar structure as Alumni endpoints

// Analytics Endpoint
// Similar structure as Alumni endpoints

// User Management Endpoints
// Similar structure as Alumni endpoints

// Authentication Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Authenticate user (check username and password against database or any other method)
    // If authentication is successful, generate JWT token
    const token = jwt.sign({ username: username }, 'your_secret_key');
    res.json({ token: token });
});


// Start server
app.listen(port, () => {
    console.log(`Server running on  http://${hostname}:${port}/`);
}); 