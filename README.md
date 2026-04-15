# Medical Appointment System (MediBook)

A modern, responsive web application for booking medical appointments with a focus on user experience and visual design.

## Features

- **Responsive Design**: Built with mobile-first principles using CSS Grid and Flexbox.
- **Modern UI/UX**:
  - Glassmorphism effects (`backdrop-filter`).
  - Smooth transitions and hover effects.
  - Custom scrollbar styling.
- **Particle System**: Animated background particles (hearts, pills, DNA strands) for a premium feel.
- **State Management**: Simple state management using `localStorage`.
- **Modal System**: Custom `MediModal` component for confirmations and alerts.
- **Authentication**: Simple login/signup flow.
- **Appointment Tracking**: Real-time (simulated) queue tracking.

## Tech Stack

- **HTML5**
- **CSS3** (Custom Properties, Grid, Flexbox, Animations)
- **JavaScript (ES6+)**

## Project Structure

```
project_front/
├── css/
│   └── style.css         # Global styles and components
├── js/
│   ├── data.js           # Mock data for doctors and appointments
│   ├── main.js           # Core logic (Particles, Modals, State)
│   └── auth.js           # Authentication logic
├── pages/
│   ├── index.html        # Home page (Doctor list)
│   ├── login.html        # Login page
│   ├── signup.html       # Signup page
│   ├── doctor-profile.html # Doctor profile and booking
│   ├── booking.html      # Booking confirmation
│   ├── my-appointments.html # User appointments
│   └── track.html        # Appointment tracking
└── README.md             # Project documentation
```

## Getting Started

1.  **Clone the repository** (or download the source code).
2.  **Open `pages/index.html`** in your web browser.
    - *Note: Due to browser security policies (CORS), some features like background images might not load if opened directly from the filesystem (`file://`). It is recommended to run this project using a local development server (e.g., VS Code Live Server, Python's `http.server`, or Node's `serve`).*

## Usage

- **Browse Doctors**: Navigate to the home page to see available doctors.
- **Book Appointment**: Click on a doctor to view their profile and book a slot.
- **Track Appointment**: Use the tracking page to see your queue position.
- **Login**: Use the credentials in `js/data.js` (or create new ones) to log in.

## Development

- **CSS Variables**: The design system is built on CSS custom properties defined in `:root` in `style.css`.
- **Modularity**: Logic is split between `main.js` (core) and `auth.js` (auth).
- **Data**: All mock data is centralized in `js/data.js` for easy modification.
