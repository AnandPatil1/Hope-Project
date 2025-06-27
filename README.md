# HOPE - AI-Powered Educational Platform

## About

**HOPE** is an innovative AI-powered educational platform designed to revolutionize the learning experience by connecting students with AI teachers. The platform provides personalized learning assistance, interactive chat functionality, and comprehensive educational resources across various subjects.

## Features

### AI Teacher Chat
- Interactive chatbot interface for real-time communication with AI teachers
- Subject-specific assistance (Physics, Mathematics, Computer Science, and more)
- File and image upload support for homework help
- Contextual responses based on course materials and uploaded documents

### Smart Resources
- Curated educational resources based on individual learning needs
- Dynamic resource generation based on specific topics
- Search functionality for finding relevant study materials
- Personalized recommendations for areas of improvement

### User Management
- Secure authentication powered by Clerk
- User profile management and account settings
- Personalized learning dashboard

### Modern Interface
- Responsive design for desktop and mobile devices
- Intuitive navigation with side menu and bottom navigation
- Dark/light theme support
- Subject filtering and progress tracking

## Technology Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Routing**: React Router Dom 7.6.2
- **Authentication**: Clerk React 5.32.0
- **Styling**: CSS3 with Tailwind CSS 4.1.10
- **Development**: ESLint for code quality

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnandPatil1/Hope-Project.git
   cd Hope-Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your Clerk configuration:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality check

## Project Structure

```
Hope-Project-main/
├── src/
│   ├── components/                   # Reusable UI components
│   │   └── Navigation/               # Navigation components
│   │       ├── Header/               # Page header component
│   │       │   ├── Header.jsx
│   │       │   └── Header.css
│   │       ├── BottomNav/            # Bottom navigation bar
│   │       │   ├── BottomNav.jsx
│   │       │   └── BottomNav.css
│   │       └── SideMenu/             # Sidebar navigation
│   │           ├── SideMenu.jsx
│   │           └── SideMenu.css
│   ├── pages/                        # Main application pages
│   │   ├── HomePage/                 # Home page
│   │   │   ├── Home.jsx              # Dashboard homepage
│   │   │   └── UI/                   # Home page specific components
│   │   │       ├── DashboardChart/   # Progress visualization
│   │   │       │   ├── ChartCard.jsx
│   │   │       │   └── ChartCard.css
│   │   │       ├── SubjectFilter/    # Subject selection filter
│   │   │       │   ├── SubjectFilter.jsx
│   │   │       │   └── SubjectFilter.css
│   │   │       └── TeacherList/      # Teacher directory
│   │   │           ├── TeacherList.jsx
│   │   │           └── TeacherList.css
│   │   ├── LandingPage/          # Authentication landing
│   │   │   ├── LandingPage.jsx
│   │   │   └── LandingPage.css
│   │   ├── ChatBotPage/              # AI chat functionality
│   │   │   ├── Chatbox.jsx           # AI chat interface
│   │   │   └── Chatbox.css
│   │   ├── ResourcesPage/            # Learning resources
│   │   │   ├── Resources.jsx         # Main resources page
│   │   │   ├── Resources.css
│   │   │   └── ResourceCards/        # Resource detail components
│   │   │       ├── ResourceDetail.jsx
│   │   │       └── ResourceDetail.css
│   │   └── SettingsPage/             # User settings and account management
│   │       ├── Settings.jsx          # Main settings page
│   │       ├── Settings.css
│   │       ├── EditAccount/          # Profile management
│   │       │   ├── EditAccount.jsx
│   │       │   └── EditAccount.css
│   │       │── About/                # About page
│   │       │   ├── About.jsx
│   │       │   └── About.css
│   │       ├── PrivacyPolicy/        # Privacy policy
│   │       │   ├── PrivacyPolicy.jsx
│   │       │   └── PrivacyPolicy.css
│   │       └── Terms of Use/         # Terms of service
│   │           ├── TermsOfUse.jsx
│   │           └── TermsOfUse.css
│   ├── assets/                       # Static assets
│   │   ├── chatbot.png               # UI icons and images
│   │   ├── home.png
│   │   ├── light bulb.svg
│   │   ├── profile.png
│   │   ├── resources.png
│   │   ├── search.png
│   │   └── subscription.png
│   ├── App.jsx                       # Main application component
│   ├── App.css                       # App component styles
│   ├── main.jsx                      # Application entry point
│   └── index.css                     # Global styles
├── public/                           # Public assets
├── package.json                      # Project dependencies
├── package-lock.json                 # Dependency lock file
├── vite.config.js                    # Vite configuration
├── eslint.config.js                  # ESLint configuration
└── index.html                        # HTML entry point
```

## Usage

### For Students

1. **Sign Up/Sign In**: Create an account or log in using the Clerk authentication system
2. **Dashboard**: Access your personalized learning dashboard from the home page
3. **AI Chat**: Navigate to the chat section to interact with AI teachers
4. **Resources**: Browse and search for educational materials in the resources section
5. **Profile**: Manage your account settings and preferences

### For Educators

The platform provides insights into student progress and areas where additional support may be needed through the analytics dashboard.

## Configuration

### Clerk Authentication Setup

1. Create a Clerk account at [clerk.dev](https://clerk.dev)
2. Create a new application
3. Copy your publishable key to the environment variables
4. Configure sign-in/sign-up options in your Clerk dashboard

### Code Style

- Follow ESLint configuration
- Use meaningful component and variable names
- Add comments for complex logic
- Ensure responsive design principles

## Roadmap

- [ ] Integration with external AI APIs (OpenAI, Anthropic)
- [ ] Advanced file upload and document processing
- [ ] Advanced progress tracking

## Support

For support, questions, or suggestions:

- Create an issue in this repository
- Contact the development team
- Check out our documentation wiki

## Acknowledgments

- Built with React and Vite for optimal performance
- Authentication powered by Clerk
- UI components inspired by modern educational platforms
- Icons and assets from various open-source collections

---
