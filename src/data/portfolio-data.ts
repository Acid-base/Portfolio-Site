import { PersonalInfo, Project } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Daniel Yates',
  title: 'Full Stack Developer',
  about:
    "I'm a passionate software engineer specializing in building exceptional digital experiences. With expertise in React, TypeScript, and modern backend technologies, I create scalable, accessible, and high-performance web applications that solve real-world problems.",
  github: 'https://github.com/Acid-base',
  linkedin: 'https://www.linkedin.com/in/daniel-yates-b0ba47201/',
  email: 'daniel.jo.yates@gmail.com',
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'I-Ching Oracle',
    description:
      'An interactive I-Ching divination application with traditional coin toss mechanics, hexagram interpretation, and line-by-line reading. Features both a modern frontend and a dedicated backend with comprehensive API documentation.',
    technologies: ['React', 'Express', 'Node.js', 'MongoDB', 'RESTful API', 'CSS3'],
    imageUrl: '/assets/iching.png',
    githubUrl: 'https://github.com/Acid-base/I-ching',
    liveUrl: 'https://iching-frontend.onrender.com/',
    apiUrl: 'https://iching-backend.onrender.com/',
  },
  {
    id: 2,
    title: '2025 Python Best Practices Launchpad',
    description:
      'A forward-looking Python project template repository focused on modern Python development best practices for 2025 and beyond. Features cutting-edge coding standards, optimization techniques, and project structure following PEP guidelines.',
    technologies: ['Python 3.12+', 'Type Hints', 'Async/Await', 'PEP 8', 'MyPy', 'Ruff', 'UV', 'Pytest'],
    imageUrl: '/assets/python-best-practices.png',
    githubUrl: 'https://github.com/Acid-base/2025-Python-Best-Practices-Launchpad',
  },
  {
    id: 2,
    title: 'Portfolio Site',
    description:
      'A modern portfolio built with React, Vite, and Chakra UI featuring smooth animations, responsive design, and accessibility features.',
    technologies: ['React', 'TypeScript', 'Chakra UI', 'Framer Motion', 'Vitest'],
    imageUrl: '/projects/portfolio.png',
    githubUrl: 'https://github.com/danielweber/portfolio',
    liveUrl: 'https://danielweber.dev',
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce solution with product catalog, shopping cart, secure payment integration, and order management.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Redux'],
    imageUrl: '/projects/ecommerce.png',
    githubUrl: 'https://github.com/danielweber/ecommerce-platform',
    liveUrl: 'https://shop-demo.danielweber.dev',
  },
  {
    id: 3,
    title: 'Task Management App',
    description:
      'A productivity tool for managing tasks and projects with features like drag-and-drop organization, filters, and real-time collaboration.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'React DnD'],
    imageUrl: '/projects/task-app.png',
    githubUrl: 'https://github.com/danielweber/task-management',
    liveUrl: 'https://tasks.danielweber.dev',
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description:
      'An interactive weather application providing real-time forecasts, historical data visualization, and location-based weather alerts.',
    technologies: ['React', 'D3.js', 'OpenWeather API', 'Geolocation API', 'PWA'],
    imageUrl: '/projects/weather.png',
    githubUrl: 'https://github.com/danielweber/weather-dashboard',
    liveUrl: 'https://weather.danielweber.dev',
  },
];

export const skills = {
  Frontend: [
    'React',
    'TypeScript',
    'JavaScript',
    'HTML5/CSS3',
    'Chakra UI',
    'Tailwind CSS',
    'Framer Motion',
    'Redux',
    'Responsive Design',
  ],
  Backend: ['Node.js', 'Express', 'GraphQL', 'RESTful APIs', 'MongoDB', 'PostgreSQL', 'Firebase'],
  'DevOps & Tools': ['Git', 'GitHub Actions', 'Docker', 'AWS', 'Vercel', 'Jest/Vitest', 'CI/CD'],
  'Soft Skills': ['Problem Solving', 'Communication', 'Teamwork', 'Agile/Scrum', 'Project Management'],
};
