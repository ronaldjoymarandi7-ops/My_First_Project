const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 1. Connect to MongoDB Compass (Local)
mongoose.connect('mongodb://127.0.0.1:27017/form_demo')
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.log("DB Connection Error:", err));

// 2. Setup Database Schema
const User = mongoose.model('User', { name: String, email: String });

// 3. Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // This links your HTML form

// 4. Handle Submission
app.post('/submit', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.fullName,
            email: req.body.userEmail
        });
        await newUser.save();
        res.send("<h1>Data Saved! Check MongoDB Compass.</h1>");
    } catch (err) {
        res.status(500).send("Error saving data");
    }
}); 

// 5. New Route to see all users
app.get('/users', async (req, res) => {
    // 1. Capital 'U' in User
    const allUsers = await User.find(); 
    let html = "<h1>All Applications</h1><ul>";
    
    // 2. Capital 'E' in forEach
    allUsers.forEach(user => { 
        // 3. MUST use backticks ` here (next to the number 1 key)
        html += `<li><strong>${user.name}</strong> - ${user.email}</li>`;
    });

    html += "</ul><a href='/'>Go Back</a>";
    res.send(html);
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));