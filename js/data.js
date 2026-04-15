const doctorsData = [
  {
    id: 1,
    name: "Dr. James Wilson",
    specialty: "Cardiologist",
    rating: 4.8,
    price: "$50",
    image: "../assets/images/doctor1.png",
    about: "Dr. James Wilson is a highly experienced cardiologist with over 15 years in practice. He specializes in interventional cardiology and heart failure management.",
    slots: ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM"]
  },
  {
    id: 2,
    name: "Dr. Sarah Jenkins",
    specialty: "Dermatologist",
    rating: 4.9,
    price: "$65",
    image: "../assets/images/doctor2.png",
    about: "Dr. Sarah Jenkins is a board-certified dermatologist known for her expertise in clinical and cosmetic dermatology. She focuses on skin cancer prevention and modern acne treatments.",
    slots: ["09:30 AM", "11:00 AM", "02:00 PM", "04:00 PM"]
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    specialty: "Pediatrician",
    rating: 4.7,
    price: "$45",
    image: "../assets/images/doctor3.png",
    about: "Dr. Emily Chen is a compassionate pediatrician dedicated to providing comprehensive healthcare for children from birth to adolescence.",
    slots: ["08:30 AM", "10:00 AM", "12:30 PM", "03:00 PM"]
  },
  {
    id: 4,
    name: "Dr. Michael Ross",
    specialty: "Neurologist",
    rating: 4.9,
    price: "$80",
    image: "../assets/images/doctor4.png",
    about: "Dr. Michael Ross is a senior neurologist specializing in neurodegenerative diseases and sleep medicine. He is committed to personalized patient care.",
    slots: ["10:00 AM", "11:30 AM", "02:30 PM", "04:30 PM"]
  }
];

const specialties = ["All", "Cardiologist", "Dermatologist", "Pediatrician", "Neurologist"];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { doctorsData, specialties };
}
