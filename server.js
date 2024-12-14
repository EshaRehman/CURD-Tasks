const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/tasks', taskRoutes);

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Set a cookie with a default value when visiting /set-cookie
app.get('/set-cookie', (req, res) => {
    const cookieName = 'myCookie';  // Set the name of the cookie
    const cookieValue = 'defaultValue';  // Set the default value of the cookie

    // Set the cookie (with 7 days expiry time and HTTP-only flag)
    res.cookie(cookieName, cookieValue, { maxAge: 900000, httpOnly: true });

    // Respond back with a message confirming cookie is set
    res.send(`Cookie "${cookieName}" has been set with the default value "${cookieValue}"`);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
