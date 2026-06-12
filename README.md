# DevOtion

**Community-driven reviews for developer tools and technologies.**

DevOtion is an open-source platform where developers can discover and share honest reviews about developer tools and technologies. Unlike sponsored reviews or marketing materials, DevOtion focuses on real experiences from real developers.

## Features

- **Tool Discovery**: Browse and discover developer tools across multiple categories
- **Honest Reviews**: Read authentic experiences from fellow developers
- **Community-Driven**: Open-source project built by the community, for the community
- **Categories**: Tools organized by Frontend, Backend, Database, DevOps, Cloud, Mobile, AI, Testing, and Design

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Remix Icon
- **Linting**: ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/devotion/devotion.git
cd devotion
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── category/[slug]/    # Category listing pages
│   ├── tools/[slug]/       # Tool detail pages
│   ├── profile/[username]/ # User profile pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── ui/                 # Base UI components
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── search-bar.tsx
│   └── ...
├── constants/              # Constants and mock data
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── ...config files
```

## Contributing

We welcome contributions from the community! Please read our [Contributing Guide](./CONTRIBUTING.md) to get started.

## License

This project is open-source and available under the [MIT License](./LICENSE).

## Links

- [GitHub Repository](https://github.com/devotion/devotion)
- [Report an Issue](https://github.com/devotion/devotion/issues)

---

Built with care by the developer community.
