# Contributing to DevOtion

Thank you for your interest in contributing to DevOtion! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Issues

1. Check if the issue already exists in the [Issues](https://github.com/devotion/devotion/issues) section
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce (for bugs)
   - Expected behavior
   - Screenshots (if applicable)

### Suggesting Features

1. Open a discussion or issue with the `enhancement` label
2. Describe the feature and why it would benefit the project
3. Wait for maintainer feedback before implementing

### Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes following our coding standards
4. Run tests and linting: `npm run lint`
5. Commit with clear messages: `git commit -m "Add: feature description"`
6. Push to your fork: `git push origin feature/my-feature`
7. Open a Pull Request

## Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Avoid `any` types when possible
- Define types in `types/index.ts`

### Styling

- Use Tailwind CSS classes exclusively
- Follow the existing design patterns
- Keep styles minimal and consistent

### Icons

- Use Remix Icon components from `@remixicon/react`
- Do NOT use emojis as icons
- Import icons at the top of files

### Components

- Create reusable components in `components/`
- Use functional components with hooks
- Export from `components/index.ts`

### Git Commits

Write clear, concise commit messages:

- `Add: new feature description`
- `Fix: bug description`
- `Update: existing feature description`
- `Refactor: code restructure description`
- `Docs: documentation change`

## Project Structure

Follow the established project structure. New features should:

- Place components in `components/`
- Add types to `types/`
- Use constants in `constants/`
- Implement hooks in `hooks/`

## Labels

We use the following labels:

- `good first issue` - Great for newcomers
- `help wanted` - Extra attention needed
- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Documentation changes

## Questions?

Feel free to open a discussion on GitHub or reach out to the maintainers.

---

Thank you for contributing to DevOtion!
