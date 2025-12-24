# Christmas Fun 2025 🎄

An AI-powered, software-engineer-themed telling of the night before Christmas, built with Node.js and ready for GitHub Copilot and Dev Containers.

## 2025 Edition Features

- 🤖 **AI-Themed Story**: Updated narrative featuring GitHub Copilot agents, MCP tools, and modern AI workflows
- ✨ **Festive Console Experience**: ASCII art, timed animations, and colorful output
- 🎁 **Easter Eggs**: Hidden surprises activated by environment variables
- 🌐 **Modern GitHub Pages**: Glassmorphism UI with responsive design

## Getting Started

### Using Dev Container (Recommended)

1. Open this project in VS Code
2. Install the "Dev Containers" extension
3. Click "Reopen in Container" when prompted
4. Run `npm start` in the integrated terminal

### Local Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run the festive story
npm start

# Run tests
npm test
```

## Easter Eggs

Discover hidden messages by setting these environment variables:

```bash
# Easter Egg #1: Special holiday message
RUN_EASTER_EGG=true npm start

# Easter Egg #3: On-call engineer mode
ONCALL=true npm start

# Easter Egg #5: Custom code coverage
CODE_COVERAGE=100% npm start
```

Additional random easter eggs may appear during each run! 🎅

## Localization

The story supports multiple languages:

```bash
# English (default)
npm start

# Spanish
LANGUAGE=es npm start
```

## GitHub Copilot Integration

This project includes:

- `.github/copilot-instructions.md` - Guidelines for Copilot agents
- Modern TypeScript patterns for AI-assisted development
- Test coverage for reliable agent contributions

## Tech Stack

- **Runtime**: Node.js 22+
- **Language**: TypeScript
- **Testing**: Vitest with coverage
- **Styling**: Chalk for console colors
- **CI/CD**: GitHub Actions
- **Docs**: GitHub Pages with modern CSS

## Contributing

Contributions are welcome! Please ensure your changes:

1. Pass all existing tests (`npm test`)
2. Follow the established code style
3. Maintain the festive spirit 🎄

---

**May your agents be smart and your builds be serene!**

Happy Holidays 2025! 🎅✨
