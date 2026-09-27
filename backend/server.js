const express = require('express')
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
let students = [
    { id: 1, name: 'sandhya', email: 'khadesandhya4@gmail.com', course: 'Computer Science', grade: 'A+' },
    { id: 2, name: 'neha', email: 'jadhavneha4@gmail.com', course: 'PHD', grade: 'A+' }
];
app.get('/api/students', (req, res) => {
    res.json(students);
})
app.post('/api/students', (req, res) => {
    const { name, email, course, grade } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }
    const newStudent = {
        id: Date.now().toString(),
        name: name,
        email: email,
        course: course || 'Computer science',
        grade: grade || 'A'
    };
    students.unshift(newStudent)
    res.status(201).json(newStudent)
});
app.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, course, grade } = req.body;
    const index = students.findIndex((i) => i.id === id);
    if (index === -1) {
        res.status(400).json({ error: 'Id not found' });
    }
    students[index] = { ...students[index], name, email, course, grade };
    res.status(students[index]);
});
app.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
    students = students.filter((s) => s.id !== id);
    res.json({ error: 'Students delted successfully' })
});
app.listen(PORT, () => {
    console.log(`backend server running on http:localhost:${PORT}`)
});