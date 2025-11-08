# 🎉 Zigo Events - Event Management App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy to GitHub Pages](https://github.com/abdullah-ax/zigo-events/actions/workflows/deploy.yml/badge.svg)](https://github.com/abdullah-ax/zigo-events/actions/workflows/deploy.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)

A comprehensive, modern event management application built with React and TypeScript. Zigo Events helps you plan, organize, and manage events in Egypt with features for vendor selection, budget tracking, guest management, and more.

## ✨ Features

- **📅 Event Creation & Management** - Create and manage multiple events with ease
- **🏢 Vendor Selection** - Browse and select from categories: venues, catering, photography, entertainment, and decoration
- **💰 Budget Tracking** - Track expenses and payment status for each vendor
- **👥 Guest Management** - Manage guest lists and track RSVP status
- **💬 Event Chat** - Communicate about event details (coming soon)
- **📊 Dashboard** - Overview of all your events and their progress
- **📱 Mobile-First Design** - Fully responsive interface optimized for mobile devices
- **🎨 Modern UI** - Beautiful interface using shadcn/ui components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm installed
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abdullah-ax/zigo-events.git
   cd zigo-events
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:8080`

## 🏗️ Building for Production

Build the app for production:

```bash
npm run build
```

The build output will be in the `dist/` directory.

Preview the production build locally:

```bash
npm run preview
```

## 📦 Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages. Simply push to the `main` branch, and the GitHub Actions workflow will build and deploy the app automatically.

**Manual Deployment:**

1. Ensure GitHub Pages is enabled in your repository settings
2. Set the source to "GitHub Actions"
3. Push your changes to the `main` branch

### Other Platforms

You can deploy to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist/` folder or connect via GitHub
- **Cloudflare Pages**: Connect your repository and set build command to `npm run build`

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3
- **Language**: TypeScript 5.5
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Routing**: React Router 6
- **State Management**: React Context API
- **Form Handling**: React Hook Form + Zod
- **Date Handling**: date-fns

## 📁 Project Structure

```
zigo-events/
├── src/
│   ├── components/      # Reusable UI components
│   │   └── ui/         # shadcn/ui components
│   ├── contexts/       # React Context providers (EventContext)
│   ├── data/          # Mock vendor data
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
├── .github/
│   └── workflows/     # GitHub Actions workflows
├── index.html         # HTML entry point
├── vite.config.ts     # Vite configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 What I Learned

Building Zigo Events helped me develop skills in:

- **Full-Stack React Development**: Creating a complete application with complex state management
- **TypeScript**: Writing type-safe code with proper interfaces and types
- **Modern UI/UX**: Implementing a mobile-first, responsive design with Tailwind CSS
- **Component Architecture**: Building reusable, modular components with shadcn/ui
- **State Management**: Using React Context API for global state
- **Build Optimization**: Configuring Vite for optimal production builds
- **CI/CD**: Setting up automated deployments with GitHub Actions
- **Self-Hosting**: Making the app fully self-hostable without external dependencies


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- UI components built with [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Initially scaffolded with Loveable (now fully independent)

## 📧 Contact

Abdullah - [@abdullah-ax](https://github.com/abdullah-ax)

Project Link: [https://github.com/abdullah-ax/zigo-events](https://github.com/abdullah-ax/zigo-events)

---

Made with ❤️ by Abdullah
