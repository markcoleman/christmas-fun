# Christmas Fun MCP Server 🎄

A festive Model Context Protocol (MCP) server that spreads holiday cheer and coding happiness! This server provides AI assistants with tools, resources, and prompts themed around Christmas and software development.

## Features

### 🎁 Tools

#### `get_holiday_message`
Get a festive holiday message with coding and Christmas cheer!

**Parameters:**
- `mood` (optional): Choose between "cheerful", "motivational", or "funny"

**Example:**
```json
{
  "name": "get_holiday_message",
  "arguments": {
    "mood": "motivational"
  }
}
```

#### `check_naughty_or_nice`
Check if a piece of code or commit message is on Santa's naughty or nice list!

**Parameters:**
- `code_or_message` (required): The code snippet or commit message to evaluate

**Example:**
```json
{
  "name": "check_naughty_or_nice",
  "arguments": {
    "code_or_message": "fix: improve test coverage and documentation"
  }
}
```

### 📚 Resources

The server provides access to:

1. **Christmas Story (English)** - `christmas://story/en`
   - The full 2025 AI-themed Christmas story in JSON format
   
2. **Christmas Story (Spanish)** - `christmas://story/es`
   - La historia navideña completa de 2025

3. **ASCII Christmas Tree** - `christmas://ascii-art/tree`
   - Festive ASCII art for your terminal

### 💬 Prompts

#### `festive_code_review`
A festive code review prompt that brings holiday cheer to your PR reviews.

**Arguments:**
- `code` (required): The code to review

#### `christmas_commit_message`
Generate a festive commit message for your holiday season commits.

**Arguments:**
- `changes` (required): Description of the changes made

## Usage

### Building the Server

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

### Running the Server

```bash
# Run the MCP server
npm run mcp
```

The server communicates via stdio and follows the Model Context Protocol specification.

### Using with MCP Clients

The server can be used with any MCP-compatible client. Example configuration for Claude Desktop:

```json
{
  "mcpServers": {
    "christmas-fun": {
      "command": "node",
      "args": ["/path/to/christmas-fun/dist/src/mcp-server.js"]
    }
  }
}
```

Or use with the MCP Inspector for testing:

```bash
npx @modelcontextprotocol/inspector node dist/src/mcp-server.js
```

## Development

### Running Tests

```bash
npm test
```

### Project Structure

```
src/
  mcp-server.ts          # Main MCP server implementation
__tests__/
  mcp-server.test.ts     # Tests for the MCP server
```

## Examples

### Getting a Holiday Message

**Request:**
```json
{
  "method": "tools/call",
  "params": {
    "name": "get_holiday_message",
    "arguments": {
      "mood": "funny"
    }
  }
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "🎅 Santa's elves tried to debug your code but they got distracted by the gingerbread cookies. They say it looks delicious though!"
    }
  ]
}
```

### Checking Code Quality

**Request:**
```json
{
  "method": "tools/call",
  "params": {
    "name": "check_naughty_or_nice",
    "arguments": {
      "code_or_message": "fix: improve test coverage and refactor login logic"
    }
  }
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "🎁 Nice list! Santa approves! Your code shows great care and attention to quality."
    }
  ]
}
```

## Technical Details

- **Protocol:** Model Context Protocol (MCP)
- **Transport:** stdio
- **Language:** TypeScript/Node.js
- **SDK:** @modelcontextprotocol/sdk

## Contributing

Contributions are welcome! Please ensure:
1. All tests pass (`npm test`)
2. Code follows TypeScript best practices
3. Maintain the festive spirit 🎄

## License

MIT - See LICENSE file for details

---

**May your agents be smart and your builds be serene!** 🎅✨
