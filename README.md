# Christmas Fun 2025 🎄

An AI-powered, software-engineer-themed telling of the night before Christmas, built with Node.js and ready for GitHub Copilot and Dev Containers.

## 2025 Edition Features

- 🤖 **AI-Themed Story**: Updated narrative featuring GitHub Copilot agents, MCP tools, and modern AI workflows
- ✨ **Festive Console Experience**: ASCII art, timed animations, and colorful output
- 🎁 **Easter Eggs**: Hidden surprises activated by environment variables
- 🌐 **Modern GitHub Pages**: Glassmorphism UI with responsive design
- 🗺️ **Santa Tracker**: Interactive real-time map tracking Santa's journey around the world on Christmas Eve
- 🎤 **Christmas Carol Karaoke**: Sing along to your favorite Christmas carols with interactive lyrics and fill-in-the-blank gameplay
- 🎅 **MCP Server**: Model Context Protocol server for spreading holiday cheer through AI assistants

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

# Run Christmas Carol Karaoke
npm run karaoke

# Run tests
npm test

# Run the MCP server
npm run mcp
```

## Santa Tracker 🗺️

Track Santa's journey around the world in real-time on Christmas Eve! This interactive feature includes:

### Features

- 🌍 **Interactive Map**: Built with Leaflet.js showing Santa's complete route
- 📍 **15 Global Stops**: From Tokyo to New York, including the North Pole
- 🎁 **Real-time Animation**: Watch Santa travel from location to location
- 📊 **Live Statistics**: Track total deliveries and current progress
- 🎨 **Festive Details**: Fun facts and holiday traditions for each location
- 🎮 **Interactive Controls**: Play, pause, reset, and adjust animation speed
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices

### How to Use

1. Visit the [Christmas Fun GitHub Pages site](https://markcoleman.github.io/christmas-fun/)
2. Click the "Track Santa 🎅" button
3. Press "Start Journey" to begin the animation
4. Click on any marker to see location details and fun facts
5. Use speed controls to adjust the animation pace

The Santa Tracker visualizes Santa's journey with:
- 🏠 North Pole (start and end)
- 🎅 Current location marker
- ✅ Visited locations
- 📍 Upcoming stops
- ➡️ Animated route line

## Christmas Carol Karaoke 🎤

Sing along to your favorite Christmas carols with an interactive karaoke experience available both in the CLI and on the web!

### Features

- 🎵 **Sing-Along Mode**: Display lyrics line by line with timed animations - perfect for singing along
- 🎤 **Karaoke Mode**: Interactive fill-in-the-blank gameplay where you guess missing words
- 📊 **Score Tracking**: Earn points for correct answers and track your accuracy
- 🎶 **Multiple Carols**: Choose from popular favorites like "Jingle Bells", "Silent Night", "Deck the Halls", and more
- 🎲 **Random Selection**: Feeling adventurous? Let the system pick a random carol for you
- ⚡ **Speed Control**: Adjust playback speed to match your singing pace (web only)
- 🎨 **Beautiful UI**: Glassmorphism design with real-time lyric highlighting on the web

### How to Use

**CLI Version:**
```bash
npm run karaoke
```

Select your preferred mode:
1. **Sing-Along Mode** - Just enjoy reading the lyrics as they appear
2. **Karaoke Mode** - Fill in the blanks and earn points for correct answers

**Web Version:**
1. Visit the [Christmas Fun GitHub Pages site](https://markcoleman.github.io/christmas-fun/)
2. Click the "Karaoke 🎤" button
3. Select a carol from the available options
4. Toggle between Sing-Along and Karaoke modes
5. Press "Start Singing" to begin
6. In Karaoke mode, type the missing words when prompted

The karaoke feature includes:
- 🎵 Real-time lyric highlighting
- 🎯 Interactive fill-in-the-blank challenges
- 🏆 Performance scoring and accuracy tracking
- 🎨 Smooth animations and festive styling
- 📱 Responsive design for all devices

## MCP Server 🎅

This project includes a festive Model Context Protocol (MCP) server that brings holiday cheer to AI assistants!

### Features

- **Tools**: Get holiday messages and check code quality with Santa's naughty/nice list
- **Resources**: Access Christmas stories and ASCII art
- **Prompts**: Generate festive code reviews and commit messages

### Usage

```bash
# Start the MCP server
npm run mcp

# Or use with MCP Inspector
npx @modelcontextprotocol/inspector node dist/src/mcp-server.js
```

For detailed MCP server documentation, see [src/README.md](src/README.md).

### Configuration for Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "christmas-fun": {
      "command": "node",
      "args": ["/absolute/path/to/christmas-fun/dist/src/mcp-server.js"]
    }
  }
}
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

## Creating a Release

To create a new release:

1. **Create and push a version tag:**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
   
2. The `create-release` workflow will automatically:
   - Validate the tag exists in the repository
   - Run Release Drafter to generate/publish release notes
   - Build and push Docker images to GitHub Container Registry with the version tag and `latest`
   - Add release notes to the Docker image description

3. **Manual workflow run (optional):**
   - Navigate to Actions → "create release" workflow
   - Click "Run workflow"
   - Optionally provide a custom version/tag
   - This is useful for testing or re-running a release

**Note:** Version tags should follow semantic versioning (e.g., `v1.0.0`, `v2.1.3`)

---

**May your agents be smart and your builds be serene!**

Happy Holidays 2025! 🎅✨
