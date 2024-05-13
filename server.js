const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for your React frontend

// MongoDB Connection (replace with your actual connection string)
mongoose.connect('mongodb://localhost:27017/portfolio', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Define a Project schema
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    link: String,
    technologies: [String]
});

const Project = mongoose.model('Project', projectSchema);

// API Routes
app.get('/api/projects', async (req, res) => {
    const projects = await Project.find();
    res.send(projects);
});

app.post('/api/projects', async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.send(project);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
