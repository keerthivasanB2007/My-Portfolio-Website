import lauraDashboard from '../assets/projects/laura/laura_dashboard.png'
import lauraTransactions from '../assets/projects/laura/laura_transactions.png'
import lauraAddtransactions from '../assets/projects/laura/laura_addtransactions.png'
import lauraAnalysis from '../assets/projects/laura/laura_analysis.png'
import lauraBackup from '../assets/projects/laura/laura_backup.png'
import lauraCatagories from '../assets/projects/laura/laura_catagories.png'
import lauraProfile from '../assets/projects/laura/laura_profile.png'

import portfolioDashboard from '../assets/projects/my_portfolio/portfolio_dashboard.png'
import portfolioSkillsection from '../assets/projects/my_portfolio/portfolio_skillsection.png'
import portfolioJourneysection from '../assets/projects/my_portfolio/portfolio_journeysection.png'

export const projects = [
  {
    id: 'laura-finance-tracker',
    title: 'Laura – Personal Finance Tracker',
    repoName: 'Laura-Finance-Tracker',
    category: 'Android Application',
    status: 'Completed',
    description: 'A modern Android personal finance management application built using Kotlin that enables users to track expenses, manage budgets, analyze spending habits, and organize personal finances through a clean and intuitive user experience.',
    stack: ['Kotlin', 'Android Studio', 'XML', 'SQLite / Room', 'Material Design'],
    features: [
      'Expense Tracking',
      'Budget Management',
      'Category Management',
      'Dashboard',
      'Transaction History',
      'Clean UI',
      'Dark Mode'
    ],
    demo: null,
    github: 'https://github.com/keerthivasanB2007/Laura-Finance-Tracker',
    screenshots: [
      { id: 'dashboard', src: lauraDashboard, label: 'Dashboard', alt: 'Laura Finance Tracker Dashboard showing financial summary' },
      { id: 'transactions', src: lauraTransactions, label: 'Transactions', alt: 'Transaction history list itemizing expenses' },
      { id: 'addtransactions', src: lauraAddtransactions, label: 'Add Transactions', alt: 'Interface to add new expenses and income' },
      { id: 'analysis', src: lauraAnalysis, label: 'Analysis', alt: 'Detailed charts and spending analysis breakdown' },
      { id: 'backup', src: lauraBackup, label: 'Backup & Restore', alt: 'Backup and database restore configuration options' },
      { id: 'categories', src: lauraCatagories, label: 'Categories', alt: 'Category configuration and icon customizer' },
      { id: 'profile', src: lauraProfile, label: 'Profile', alt: 'User settings, profile configurations and account statistics' }
    ]
  },
  {
    id: 'my-portfolio-website',
    title: 'My Portfolio Website',
    repoName: 'My-Portfolio-Website',
    category: 'Personal Portfolio',
    status: 'Active',
    description: 'A premium interactive developer portfolio showcasing my projects, technical skills, academic journey, GitHub profile, and creative work using modern web technologies and immersive animations.',
    stack: ['React', 'Vite', 'JavaScript', 'CSS', 'Framer Motion', 'GSAP', 'Three.js'],
    features: [
      'Dark / Light Theme',
      'Interactive Skills Galaxy',
      'Journey Timeline',
      'GitHub Integration',
      'Responsive Design',
      'Modern UI'
    ],
    demo: 'https://keerthivasan-b.vercel.app',
    github: 'https://github.com/keerthivasanB2007/My-Portfolio-Website',
    screenshots: [
      { id: 'dashboard', src: portfolioDashboard, label: 'Dashboard', alt: 'Portfolio home screen with interactive features' },
      { id: 'journey', src: portfolioJourneysection, label: 'Journey', alt: 'Academic and career journey timeline section' },
      { id: 'skills', src: portfolioSkillsection, label: 'Skills', alt: 'Interactive skills visualization galaxy' }
    ]
  },
  {
    id: 'my-first-website',
    title: 'My First Website',
    repoName: 'My-firstWebsite',
    category: 'Web Development',
    status: 'Completed',
    description: 'My first complete web development project where I explored HTML, CSS, and JavaScript while learning responsive layouts, component structure, styling techniques, and user interface fundamentals.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Responsive Layouts',
      'Component Structure',
      'Styling Techniques',
      'User Interface Fundamentals'
    ],
    demo: 'https://keerthivasanb2007.github.io/My-firstWebsite',
    github: 'https://github.com/keerthivasanB2007/My-firstWebsite'
  }
]
