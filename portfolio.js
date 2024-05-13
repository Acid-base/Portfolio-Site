import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Portfolio() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const res = await axios.get('/api/projects'); 
            setProjects(res.data);
        };

        fetchProjects();
    }, []);

    return (
        <section id="portfolio">
            <div className="container">
                <h2>Portfolio</h2>
                <div className="projects">
                    {projects.map(project => (
                        <div key={project._id} className="project">
                            <img src={project.image} alt={project.title + ' Screenshot'} />
                            <div className="content">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <a href={project.link}>View Project</a>
                                <ul>
                                    {project.technologies.map(tech => (
                                        <li key={tech}>{tech}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;

