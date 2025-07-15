# CareerCraft 🚀 

A modern, AI-powered resume builder and career development platform built with Next.js, React, and Firebase. Create professional resumes with intelligent suggestions and real-time collaboration.

## ✨ Features

### 🔐 Authentication & User Management

- **Firebase Authentication** - Secure email/password authentication
- **User Profiles** - Personalized dashboard and settings
- **Session Management** - Persistent login state

### 📝 Resume Builder

- **AI-Powered Creation** - Generate resume content from existing resumes using OpenAI
- **Section-by-Section Builder** - Contact, Experience, Education, Skills, Projects, Certifications
- **Real-time Preview** - Live PDF preview as you build
- **PDF Export** - Download professional resumes in PDF format
- **Google Places Integration** - Auto-complete for location fields

### 🎨 Modern UI/UX

- **Dark Theme** - Beautiful dark mode interface
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Atomic Design System** - Consistent, reusable components
- **Smooth Animations** - Enhanced user experience with transitions

### 🛠️ Career Tools

- **Resume Tailoring** - Customize resumes for specific job descriptions
- **LinkedIn Integration** - Connect with professional networks
- **Email Templates** - Professional communication tools
- **Pitch Generator** - Create compelling job applications

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand with persistence
- **Icons**: React Icons
- **PDF Generation**: @react-pdf/renderer

### Backend & Services

- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **AI Integration**: LangChain & OpenAI GPT-4
- **File Storage**: Firebase Storage

### Development Tools

- **Linting**: ESLint with Prettier
- **Package Manager**: npm
- **Build Tool**: Turbopack (Next.js)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project setup
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd career-craft
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Download your Firebase config and add it to the project

4. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com

   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here

   # Google Maps (Optional)
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
career-craft/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/               # Login page
│   │   ├── register/            # Registration page
│   │   └── layout.tsx           # Auth layout
│   ├── (dashboard)/             # Dashboard routes
│   │   ├── dashboard/           # Main dashboard
│   │   ├── profile/             # User profile
│   │   ├── resumes/             # Resume management
│   │   ├── tailor/              # Resume tailoring
│   │   ├── linkedin/            # LinkedIn integration
│   │   ├── email/               # Email templates
│   │   ├── pitch/               # Pitch generator
│   │   └── layout.tsx           # Dashboard layout
│   ├── (resume-builder)/        # Resume builder routes
│   │   ├── create-resume/       # Resume creation
│   │   ├── (sections)/          # Resume sections
│   │   │   ├── contact/         # Contact information
│   │   │   ├── experience/      # Work experience
│   │   │   ├── education/       # Education details
│   │   │   ├── skills/          # Skills management
│   │   │   ├── projects/        # Project portfolio
│   │   │   ├── certifications/  # Certifications
│   │   │   ├── summary/         # Professional summary
│   │   │   └── preview/         # PDF preview
│   │   └── layout.tsx           # Resume builder layout
│   ├── firebaseConfig.js        # Firebase configuration
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── atoms/                   # Basic UI components
│   │   ├── Button/              # Button components
│   │   ├── Input/               # Input components
│   │   ├── Card/                # Card components
│   │   ├── Link/                # Link components
│   │   └── ButtonLink/          # Button link components
│   ├── molecules/               # Complex components
│   │   ├── forms/               # Form components
│   │   │   ├── ContactForm/     # Contact form
│   │   │   ├── ExperienceForm/  # Experience form
│   │   │   ├── EducationForm/   # Education form
│   │   │   ├── SkillsForm/      # Skills form
│   │   │   ├── SummaryForm/     # Summary form
│   │   │   └── CertificateForm/ # Certification form
│   │   ├── Navbar/              # Navigation components
│   │   ├── SideNav/             # Side navigation
│   │   ├── ResumeNav/           # Resume navigation
│   │   ├── Banner/              # Banner components
│   │   ├── Features/            # Feature components
│   │   └── Table/               # Table components
│   └── Navbar/                  # Main navigation
├── store/                       # State management
│   └── ResumeStore.tsx          # Zustand store for resume data
├── utils/                       # Utility functions
│   └── firebase.ts              # Firebase utility functions
├── public/                      # Static assets
└── tailwind.config.js           # Tailwind CSS configuration
```

## 🎨 Design System

CareerCraft uses a custom design system with carefully chosen colors and components:

### Color Palette

- **Primary**: `#1B9AF5` (CareerCraftPrimary)
- **Primary Dark**: `#0F5F9E` (CareerCraftPrimaryDark)
- **Background**: `#111827` (CareerCraftBackground)
- **Text**: `#D1D5DB` (CareerCraftText)
- **White**: `#FFFFFF` (CareerCraftWhite)
- **Input Text**: `#9CA3AF` (CareerCraftInputText)

### Component Architecture

- **Atomic Design**: Components organized as atoms, molecules, and organisms
- **TypeScript**: Full type safety for all components
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG compliant components

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🤖 AI Features

CareerCraft integrates with OpenAI to provide:

- **Resume Parsing** - Extract information from existing resumes
- **Content Generation** - Generate professional summaries and descriptions
- **Skill Recommendations** - Suggest relevant skills based on experience
- **Resume Tailoring** - Customize content for specific job descriptions

## 🔐 Authentication Flow

1. **Registration** - Users create accounts with email/password
2. **Login** - Secure authentication with Firebase Auth
3. **Session Management** - Persistent login state across sessions
4. **Protected Routes** - Dashboard and resume builder require authentication

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop** (1024px+) - Full feature set with sidebar navigation
- **Tablet** (768px - 1023px) - Adapted layout with touch-friendly controls
- **Mobile** (< 768px) - Mobile-optimized interface with hamburger menu

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

- **Netlify** - Compatible with Next.js static export
- **Firebase Hosting** - Direct integration with Firebase services
- **Docker** - Containerized deployment available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the code comments and component documentation
- **Issues**: Report bugs and feature requests on GitHub
- **Discussions**: Join community discussions for help and ideas

---

Built with ❤️ using Next.js, React, and Firebase
