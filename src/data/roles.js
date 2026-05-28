export const roles = [
  {
    id: 'python-dev',
    title: 'Python Developer',
    description: 'Prepare for Python engineering roles. Focuses on core syntax, decorators, memory management, OOP, and popular frameworks like Django and FastAPI.',
    icon: 'Terminal',
    difficultyModifiers: { easy: 1.0, medium: 1.2, hard: 1.5 },
    focusAreas: ['Syntax & Idioms', 'Concurrency', 'Frameworks', 'Advanced Concepts'],
    accentColor: '#3776AB'
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    description: 'Tailored for UI/UX engineers. Focuses on React internals (Virtual DOM, reconciliation), state management, performance optimization, CSS layout systems, and modern JS.',
    icon: 'Layout',
    difficultyModifiers: { easy: 1.0, medium: 1.2, hard: 1.5 },
    focusAreas: ['React Internals', 'JS & Async', 'CSS & Responsive Design', 'Performance'],
    accentColor: '#00D4FF'
  },
  {
    id: 'backend-dev',
    title: 'Backend Developer',
    description: 'Designed for systems and API engineers. Focuses on system design, database indexing, caching, REST/GraphQL design, security, microservices, and concurrency.',
    icon: 'Server',
    difficultyModifiers: { easy: 1.0, medium: 1.2, hard: 1.5 },
    focusAreas: ['System Design', 'Databases', 'Concurrency & APIs', 'Caching & Message Queues'],
    accentColor: '#FF5733'
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Sharpen your analytical problem-solving skills. Covers big-O complexity, trees, graphs, dynamic programming, sorting, and algorithmic design patterns.',
    icon: 'Binary',
    difficultyModifiers: { easy: 1.0, medium: 1.3, hard: 1.6 },
    focusAreas: ['Time & Space Complexity', 'Arrays & Linked Lists', 'Trees & Graphs', 'Dynamic Programming'],
    accentColor: '#7C5CFF'
  },
  {
    id: 'hr-interview',
    title: 'HR & Behavioral Interview',
    description: 'Master interpersonal, leadership, and situational questions. Structured around the STAR method, conflict resolution, company alignment, and career aspirations.',
    icon: 'Users',
    difficultyModifiers: { easy: 1.0, medium: 1.1, hard: 1.3 },
    focusAreas: ['STAR Methodology', 'Conflict Resolution', 'Leadership Qualities', 'Cultural Fit'],
    accentColor: '#00FF87'
  }
];
