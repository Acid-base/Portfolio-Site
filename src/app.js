
const projects = [
  {
    title: 'Project 1',
    description: 'A brief description of Project 1.',
    image: 'images/project1.jpg',
    link: 'https://www.example.com/project1',
    technologies: ['React', 'Node.js', 'MongoDB']
  },
  {
    title: 'Project 2',
    description: 'A brief description of Project 2.',
    image: 'images/project2.png',
    link: 'https://www.example.com/project2',
    technologies: ['JavaScript', 'HTML', 'CSS']
  },
  // Add more projects here
];

const projectList = document.getElementById('project-list');

projects.forEach(project => {
  const projectItem = document.createElement('div');
  projectItem.classList.add('project');

  const image = document.createElement('img');
  image.src = project.image;
  image.alt = project.title + ' Screenshot';
  projectItem.appendChild(image);

  const content = document.createElement('div');
  content.classList.add('content');

  const title = document.createElement('h3');
  title.textContent = project.title;
  content.appendChild(title);

  const description = document.createElement('p');
  description.textContent = project.description;
  content.appendChild(description);

  const link = document.createElement('a');
  link.href = project.link;
  link.textContent = 'View Project';
  content.appendChild(link);

  const technologiesList = document.createElement('ul');
  project.technologies.forEach(tech => {
    const techItem = document.createElement('li');
    techItem.textContent = tech;
    technologiesList.appendChild(techItem);
  });
  content.appendChild(technologiesList);

  projectItem.appendChild(content);
  projectList.appendChild(projectItem);
});

