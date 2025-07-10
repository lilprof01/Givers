# Givers - Where Good Things Find New Homes

Givers is a modern web app that enables users to give away unused items and request those they need — promoting sustainability and community support. Built with React and Firebase, the platform supports user authentication, real-time updates, profile management, and smart notifications.

---

## Table of Contents

- [ Features](#-features)
- [ Tech Stack](#-tech-stack)
- [ Setup & Installation](#-setup--installation)
- [ Testing Features](#-testing-features)
- [ Future Improvements](#-future-improvements)
- [ Contributing](#-contributing)
- [ License](#-license)

---

##  Features

-  **Firebase Authentication** (Sign up, Sign in, Email Verification)
-  **User Profile Management** with editable display name, bio, and preferences
-  **Post & Manage Items** (Give away or receive items)
-  **Smart Notifications** for item requests, approvals, and status changes
-  **Email Notifications** (with spam protection best practices)
-  **Dark Mode** toggle with local state management
-  **Language & Region Preferences**
-  **Responsive UI** powered by TailwindCSS and Lucide Icons

---

## Tech Stack

| Category       | Technology                  |
|----------------|-----------------------------|
| Frontend       | React + Vite                |
| State Mgmt     | useState, Context API       |
| Styles         | Tailwind CSS                |
| Icons          | Lucide React                |
| Backend        | Firebase (Auth, Firestore)  |
| Notifications  | React Toastify              |
| Animations     | Framer Motion (optional)    |
| Deployment     | Firebase Hosting / Vercel   |

---

## Setup & Installation

** Clone the repository
** Install dependencies
npm install
** Set up Firebase
** Create a new project in Firebase Console
** Enable Authentication (Email/Password)
** Create Firestore Database
** Configure rules
** Start the development server
** npm run dev



## Testing Features
** Sign up with email → verify email → login flow
** Update profile (username, email, bio)
** Post new item → view it in “My Items”
** Test toggles (dark mode, notifications)
** Test Firestore updates and Firestore rules
** Toggle public profile ON/OFF

## Future Improvements
** Add search and filter by category or location
** Add mobile app version (using React Native)
** Enable image uploads for items
** Push notification support via Firebase Cloud Messaging (FCM)
** Add admin dashboard for moderation

## Contributing
Contributions are welcome! Here's how you can help:

** Fork the repository
** Create a new branch (git checkout -b feature-branch)
** Commit your changes (git commit -m 'Add awesome feature')
** Push to your fork (git push origin feature-branch)
** Open a Pull Request 

## License
This project is open-sourced under the MIT License.
