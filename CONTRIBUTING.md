# Contributing to Zigo Events

Thank you for your interest in contributing to Zigo Events! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:
- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment details (browser, OS, etc.)

### Suggesting Features

We love new ideas! To suggest a feature:
- Open an issue with the label "enhancement"
- Describe the feature and why it would be useful
- Include mockups or examples if possible

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** following our coding standards
4. **Test your changes**: `npm run build` and `npm run lint`
5. **Commit your changes** with clear, descriptive messages
6. **Push to your fork** and submit a pull request

#### Coding Standards

- Use TypeScript for type safety
- Follow the existing code style (Prettier config provided)
- Write clear, self-documenting code
- Add comments for complex logic
- Ensure all linting passes: `npm run lint`
- Build successfully: `npm run build`

#### Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Keep the first line under 72 characters
- Reference issues and pull requests when relevant

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open `http://localhost:8080` in your browser

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context providers
├── data/          # Mock data and constants
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
└── types/         # TypeScript type definitions
```

## Code Review Process

All submissions require review. We'll review your pull request and either merge it, request changes, or provide feedback.

## Community

- Be respectful and inclusive
- Follow the code of conduct
- Help others learn and grow

Thank you for contributing! 🎉
