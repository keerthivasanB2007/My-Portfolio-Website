import { Terminal, Network, Cpu, Server, Brain, Code2 } from 'lucide-react'

export const blogPosts = [
  { title: 'How HTTP Works', excerpt: 'Breaking down what actually happens between typing a URL and seeing a page.', tag: 'Networking', icon: Network },
  { title: 'My Java Journey', excerpt: 'From confusing syntax errors to genuinely enjoying object-oriented design.', tag: 'Java', icon: Terminal },
  { title: 'Networking Basics', excerpt: 'Sockets, ports, and packets — the vocabulary every backend developer needs.', tag: 'Networking', icon: Network },
  { title: 'Backend Development, Demystified', excerpt: 'What a backend actually does, explained without the jargon.', tag: 'Backend', icon: Server },
  { title: 'Operating Systems 101', excerpt: 'Processes, threads, and memory — the invisible machinery under every app.', tag: 'Systems', icon: Cpu },
  { title: 'Learning AI as a Backend Developer', excerpt: 'Why understanding AI matters even if you never build a model yourself.', tag: 'AI', icon: Brain },
]

export const certifications = [
  { title: 'Typewriting Certification', issuer: 'Government Technical Examination', year: '2021' },
  { title: 'Java Programming — Core Concepts', issuer: 'Self-directed learning path', year: '2023' },
  { title: 'Problem Solving with Data Structures', issuer: 'In progress', year: '2024' },
]

export const achievements = [
  { title: 'Typewriting Certification', desc: 'Certified typing proficiency — the unglamorous skill that quietly speeds up everything else.', icon: Code2 },
  { title: 'Completed Java Learning', desc: 'Worked through core Java, OOP principles, and hands-on practice projects.', icon: Terminal },
  { title: 'Built Personal Projects', desc: 'Shipped a finance tracker and a custom HTTP server from scratch.', icon: Server },
  { title: 'Learning Backend Development', desc: 'Currently deepening backend skills with Spring Boot and system design.', icon: Cpu },
]

export const funFacts = [
  { label: 'Favorite Language', value: 'Java' },
  { label: 'Favorite OS', value: 'Linux' },
  { label: 'Favorite IDE', value: 'IntelliJ IDEA' },
  { label: 'Favorite Editor', value: 'VS Code' },
  { label: 'Current Goal', value: 'Become a Java Backend Engineer' },
  { label: 'Dream', value: 'Build scalable software that impacts millions' },
]

export const interests = [
  { title: 'Programming', desc: 'Turning logic into working systems.' },
  { title: 'Drawing', desc: 'Sketching as a different kind of problem solving.' },
  { title: 'Silambam', desc: 'A traditional martial art — discipline in motion.' },
  { title: 'Technology', desc: 'Following how tools and systems evolve.' },
  { title: 'Problem Solving', desc: 'The quiet satisfaction of a clean solution.' },
  { title: 'Reading', desc: 'Technical writing and the occasional detour into fiction.' },
  { title: 'Continuous Learning', desc: 'Treating "I don\'t know yet" as a to-do item, not a wall.' },
]

export const experience = [] // empty on purpose — shows the "next adventure" empty state

export const testimonials = [
  { name: 'Placeholder Mentor', role: 'Faculty Advisor', quote: 'Replace this with a real quote once you\'ve collected feedback from mentors, peers, or collaborators.' },
  { name: 'Placeholder Collaborator', role: 'Project Partner', quote: 'This section is ready for genuine testimonials — swap these placeholders out any time.' },
]
