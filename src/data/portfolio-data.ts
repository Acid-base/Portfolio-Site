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
      'A comprehensive I-Ching divination application with a Python FastAPI backend implementing the traditional yarrow stalk method and a React frontend. Integrates Gemini 2.0 SDK to translate ancient wisdom into modern, relatable terminology and offer expanded insights. Features an interactive chat functionality to discuss readings in relation to specific personal situations.',
    technologies: [
      'Python',
      'FastAPI',
      'React',
      'Gemini API',
      'REST',
      'pytest',
      'ruff',
      'uv',
    ],
    imageUrl: 'iching.png',
    githubUrl: 'https://github.com/Acid-base/I-ching/blob/main/README.md',
    liveUrl: 'https://iching-frontend.onrender.com/',
    apiUrl: 'https://iching-backend.onrender.com/',
  },
  {
    id: 2,
    title: '2025 Python Best Practices Launchpad',
    description:
      'A forward-looking Python project template repository focused on modern Python development best practices for 2025 and beyond. Features cutting-edge coding standards, optimization techniques, and project structure following PEP guidelines.',
    technologies: ['Python 3.12+', 'Type Hints', 'Async/Await', 'PEP 8', 'MyPy', 'Ruff', 'UV', 'Pytest'],
    imageUrl: 'python.png',
    githubUrl: 'https://github.com/Acid-base/2025-Python-Best-Practices-Launchpad/blob/main/README.md',
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
