import reverseCodingWinner from '../assets/certificates/Reverse_coding_winner.jpg'

export const certificates = [
  {
    id: 'typewriting-certification',
    title: 'Typewriting Certification',
    category: 'CERTIFICATION',
    status: 'VERIFIED',
    issuer: 'Government Technical Examination',
    description: 'Certified in English Typewriting, demonstrating speed, accuracy, and disciplined practice in keyboard proficiency.',
    src: null,
    alt: 'Typewriting Certification placeholder - Available Soon',
    hasCertificate: false
  },
  {
    id: 'reverse-coding-champion',
    title: 'Reverse Coding Champion',
    category: 'ACHIEVEMENT',
    status: 'WINNER 🏆',
    issuer: 'CSMIT Club, Madras Institute of Technology, Anna University',
    event: "Chakravyuha '26",
    description: 'Awarded Winner in the Reverse Coding competition for demonstrating exceptional logical thinking, debugging ability, and problem-solving skills.',
    src: reverseCodingWinner,
    alt: 'Reverse Coding Champion Certificate showing first place award at Chakravyuha 26 event, CSMIT Club, MIT Campus, Anna University',
    hasCertificate: true
  }
]
