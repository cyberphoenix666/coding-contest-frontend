const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const Question = require('./models/Question');

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get('/api/questions/random', async (req, res) => {
    const questions = await Question.find();
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    res.json(randomQuestion);
});

app.post('/api/questions/execute', async (req, res) => {
    const { code, language } = req.body;
    const output = await runCode(code, language); // Implement code execution logic
    res.json({ output });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});