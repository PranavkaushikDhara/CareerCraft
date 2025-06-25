# CareerCraft 🚀

A modern, AI-powered resume builder and career development platform built with Next.js, React, and Tailwind CSS.

## ✨ Features

- **AI-Powered Resume Builder** - Create professional resumes with intelligent suggestions
- **Modern UI/UX** - Beautiful, responsive design with dark theme
- **PDF Export** - Generate and download resumes in PDF format
- **Customizable Templates** - Multiple resume templates to choose from
- **Skills Management** - Add and organize your skills with smart categorization
- **Real-time Preview** - See changes as you build your resume
- **Mobile Responsive** - Works perfectly on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: React Icons
- **PDF Generation**: @react-pdf/renderer
- **AI Integration**: LangChain & OpenAI
- **State Management**: Zustand
- **UI Components**: Custom atomic design system

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (for AI features)

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

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
career-craft/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── atoms/            # Basic UI components (Button, Input, etc.)
│   ├── molecules/        # Complex components (Navbar, Forms, etc.)
│   └── organisms/        # Page-level components
├── store/                # Zustand state management
├── public/               # Static assets
└── tailwind.config.js    # Tailwind CSS configuration
```

## 🎨 Design System

CareerCraft uses a custom design system with carefully chosen colors:

### Color Palette
- **Primary**: `#1B9AF5` (Blue)
- **Background**: `#111827` (Dark)
- **Text**: `#D1D5DB` (Light Gray)
- **Success**: `#4ADE80` (Green)
- **Warning**: `#FACC15` (Yellow)
- **Danger**: `#EF4444` (Red)

### Component Architecture
- **Atomic Design**: Components are organized as atoms, molecules, and organisms
- **Reusable**: All components are designed to be reusable across the application
- **TypeScript**: Full type safety for all components

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤖 AI Features

CareerCraft integrates with OpenAI to provide:
- Intelligent resume suggestions
- Skill recommendations
- Content optimization
- Professional writing assistance

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)
