const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Task routes
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// Cookie-related routes
router.get('/set-cookie', (req, res) => {
    // Set a cookie named 'user' with value 'taskManagerUser'
    res.cookie('user', 'taskManagerUser', { httpOnly: true, maxAge: 3600000 }); // Expires in 1 hour
    res.send('Cookie has been set!');
});

router.get('/read-cookie', (req, res) => {
    // Read the cookie named 'user'
    const userCookie = req.cookies.user;
    if (userCookie) {
        res.send(`Cookie value: ${userCookie}`);
    } else {
        res.send('No cookie found!');
    }
});

router.get('/delete-cookie', (req, res) => {
    // Clear the cookie named 'user'
    res.clearCookie('user');
    res.send('Cookie has been deleted!');
});

module.exports = router;
