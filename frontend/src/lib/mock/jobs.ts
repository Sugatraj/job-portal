import { Job } from '@/components/jobs/jobs-columns';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'full-time',
    category: 'Engineering',
    salary: '$120,000 - $150,000',
    status: 'active',
    description: 'We are looking for a Senior Frontend Developer with 5+ years of experience in React, TypeScript, and modern web technologies. You will be responsible for building scalable, maintainable frontend applications.',
    requirements: [
      '5+ years of experience in frontend development',
      'Strong knowledge of React, TypeScript, and modern JavaScript',
      'Experience with state management (Redux, Zustand)',
      'Knowledge of CSS-in-JS and responsive design',
      'Experience with testing frameworks (Jest, React Testing Library)'
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Flexible work hours and remote options',
      'Professional development budget',
      '401(k) matching'
    ],
    createdAt: '2024-01-15T10:00:00Z',
    applications: 24,
    deadline: '2024-02-15T23:59:59Z'
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    company: 'DesignStudio',
    location: 'New York, NY',
    type: 'full-time',
    category: 'Design',
    salary: '$90,000 - $120,000',
    status: 'active',
    description: 'Join our creative team as a UI/UX Designer. You will be responsible for creating beautiful, intuitive user experiences across our product suite.',
    requirements: [
      '3+ years of experience in UI/UX design',
      'Proficiency in Figma, Sketch, or Adobe Creative Suite',
      'Strong understanding of user-centered design principles',
      'Experience with design systems and component libraries',
      'Portfolio showcasing web and mobile app designs'
    ],
    benefits: [
      'Competitive salary',
      'Health and wellness benefits',
      'Creative work environment',
      'Professional development opportunities',
      'Flexible PTO'
    ],
    createdAt: '2024-01-14T14:30:00Z',
    applications: 18,
    deadline: '2024-02-14T23:59:59Z'
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    location: 'Austin, TX',
    type: 'full-time',
    category: 'Engineering',
    salary: '$110,000 - $140,000',
    status: 'active',
    description: 'We are seeking a Backend Engineer to join our team building scalable microservices and APIs. You will work with Python, FastAPI, and cloud technologies.',
    requirements: [
      '4+ years of backend development experience',
      'Strong Python programming skills',
      'Experience with FastAPI, Django, or Flask',
      'Knowledge of databases (PostgreSQL, Redis)',
      'Experience with cloud platforms (AWS, GCP)'
    ],
    benefits: [
      'Competitive salary and stock options',
      'Comprehensive health benefits',
      'Remote work flexibility',
      'Learning and development budget',
      'Team building events'
    ],
    createdAt: '2024-01-13T09:15:00Z',
    applications: 31,
    deadline: '2024-02-13T23:59:59Z'
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'Seattle, WA',
    type: 'full-time',
    category: 'Product',
    salary: '$130,000 - $160,000',
    status: 'active',
    description: 'Lead product strategy and execution for our SaaS platform. You will work closely with engineering, design, and business teams to deliver exceptional user experiences.',
    requirements: [
      '5+ years of product management experience',
      'Experience in B2B SaaS products',
      'Strong analytical and problem-solving skills',
      'Excellent communication and leadership abilities',
      'Technical background or understanding preferred'
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision coverage',
      'Flexible work arrangements',
      'Professional development support',
      'Generous PTO and holidays'
    ],
    createdAt: '2024-01-12T16:45:00Z',
    applications: 15,
    deadline: '2024-02-12T23:59:59Z'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudScale',
    location: 'Remote',
    type: 'full-time',
    category: 'Engineering',
    salary: '$100,000 - $130,000',
    status: 'active',
    description: 'Join our DevOps team to build and maintain our cloud infrastructure. You will work with AWS, Docker, Kubernetes, and CI/CD pipelines.',
    requirements: [
      '3+ years of DevOps experience',
      'Strong knowledge of AWS services',
      'Experience with Docker and Kubernetes',
      'Knowledge of CI/CD tools (Jenkins, GitLab CI)',
      'Scripting skills (Python, Bash)'
    ],
    benefits: [
      'Competitive salary',
      'Remote work flexibility',
      'Health and wellness benefits',
      'Professional development budget',
      'Home office setup allowance'
    ],
    createdAt: '2024-01-11T11:20:00Z',
    applications: 22,
    deadline: '2024-02-11T23:59:59Z'
  },
  {
    id: '6',
    title: 'Data Analyst',
    company: 'AnalyticsPro',
    location: 'Chicago, IL',
    type: 'full-time',
    category: 'Data',
    salary: '$80,000 - $100,000',
    status: 'active',
    description: 'Help us turn data into insights. You will analyze business data, create reports, and provide actionable recommendations to stakeholders.',
    requirements: [
      '2+ years of data analysis experience',
      'Strong SQL skills',
      'Experience with Python (pandas, numpy)',
      'Knowledge of data visualization tools',
      'Business acumen and communication skills'
    ],
    benefits: [
      'Competitive salary',
      'Health and dental insurance',
      'Professional development opportunities',
      'Flexible work schedule',
      'Collaborative team environment'
    ],
    createdAt: '2024-01-10T13:10:00Z',
    applications: 28,
    deadline: '2024-02-10T23:59:59Z'
  },
  {
    id: '7',
    title: 'Marketing Specialist',
    company: 'GrowthMarketing',
    location: 'Los Angeles, CA',
    type: 'full-time',
    category: 'Marketing',
    salary: '$70,000 - $90,000',
    status: 'active',
    description: 'Drive our digital marketing efforts across multiple channels. You will develop and execute marketing campaigns to increase brand awareness and lead generation.',
    requirements: [
      '3+ years of digital marketing experience',
      'Experience with Google Ads, Facebook Ads, and LinkedIn',
      'Knowledge of marketing automation tools',
      'Strong analytical skills',
      'Creative thinking and copywriting abilities'
    ],
    benefits: [
      'Competitive salary',
      'Health benefits',
      'Performance bonuses',
      'Professional development',
      'Flexible work environment'
    ],
    createdAt: '2024-01-09T15:30:00Z',
    applications: 19,
    deadline: '2024-02-09T23:59:59Z'
  },
  {
    id: '8',
    title: 'QA Engineer',
    company: 'QualityFirst',
    location: 'Boston, MA',
    type: 'full-time',
    category: 'Engineering',
    salary: '$85,000 - $110,000',
    status: 'active',
    description: 'Ensure the quality of our software products through comprehensive testing. You will develop test plans, execute tests, and work with development teams.',
    requirements: [
      '3+ years of QA experience',
      'Knowledge of testing methodologies',
      'Experience with automated testing tools',
      'Understanding of web technologies',
      'Attention to detail and analytical thinking'
    ],
    benefits: [
      'Competitive salary',
      'Health and wellness benefits',
      'Professional development support',
      'Collaborative team culture',
      'Work-life balance'
    ],
    createdAt: '2024-01-08T10:45:00Z',
    applications: 16,
    deadline: '2024-02-08T23:59:59Z'
  }
];
