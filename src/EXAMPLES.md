# MCP Server Usage Examples

This document provides practical examples of using the Christmas Fun MCP server.

## Testing with MCP Inspector

The easiest way to test the MCP server is with the MCP Inspector:

```bash
npm run build
npx @modelcontextprotocol/inspector node dist/src/mcp-server.js
```

This will open a web interface where you can interactively test all tools, resources, and prompts.

## Example Interactions

### Tool: get_holiday_message

**Cheerful Message (default):**
```json
{
  "method": "tools/call",
  "params": {
    "name": "get_holiday_message",
    "arguments": {}
  }
}
```

Response: Random cheerful message like "🎄 May your code compile on the first try this holiday season!"

**Motivational Message:**
```json
{
  "method": "tools/call",
  "params": {
    "name": "get_holiday_message",
    "arguments": {
      "mood": "motivational"
    }
  }
}
```

Response: "🌟 Remember: Every great codebase was once just an empty repo. Keep pushing, keep coding, and have a wonderful Christmas 2025!"

**Funny Message:**
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

Response: "🎅 Santa's elves tried to debug your code but they got distracted by the gingerbread cookies. They say it looks delicious though!"

### Tool: check_naughty_or_nice

**Nice Code:**
```json
{
  "method": "tools/call",
  "params": {
    "name": "check_naughty_or_nice",
    "arguments": {
      "code_or_message": "fix: improve test coverage and add documentation"
    }
  }
}
```

Response: "🎁 Nice list! Santa approves! Your code shows great care and attention to quality."

**Naughty Code:**
```json
{
  "method": "tools/call",
  "params": {
    "name": "check_naughty_or_nice",
    "arguments": {
      "code_or_message": "// TODO: hack this together with console.log"
    }
  }
}
```

Response: "🎅 Naughty list alert! Santa suggests cleaning up those TODOs and console.logs before Christmas!"

### Resource: Christmas Story

**Read English Story:**
```json
{
  "method": "resources/read",
  "params": {
    "uri": "christmas://story/en"
  }
}
```

Returns the full Christmas story in JSON format.

**Read ASCII Art:**
```json
{
  "method": "resources/read",
  "params": {
    "uri": "christmas://ascii-art/tree"
  }
}
```

Returns a festive ASCII Christmas tree.

### Prompt: Festive Code Review

**Request:**
```json
{
  "method": "prompts/get",
  "params": {
    "name": "festive_code_review",
    "arguments": {
      "code": "function calculateTotal(items) {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}"
    }
  }
}
```

Returns a prompt that asks for a festive code review with holiday cheer.

### Prompt: Christmas Commit Message

**Request:**
```json
{
  "method": "prompts/get",
  "params": {
    "name": "christmas_commit_message",
    "arguments": {
      "changes": "Added holiday theme to the user interface with snowflakes and festive colors"
    }
  }
}
```

Returns a prompt that helps generate a festive commit message.

## Using with Claude Desktop

1. Build the project:
   ```bash
   npm run build
   ```

2. Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):
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

3. Restart Claude Desktop

4. The server will appear in Claude's MCP tools menu

## Using Programmatically

You can also interact with the server programmatically using the MCP SDK:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// Create client and connect to server
const transport = new StdioClientTransport({
  command: "node",
  args: ["dist/src/mcp-server.js"],
});

const client = new Client({
  name: "christmas-fun-client",
  version: "1.0.0",
}, {
  capabilities: {},
});

await client.connect(transport);

// Call a tool
const result = await client.callTool({
  name: "get_holiday_message",
  arguments: { mood: "cheerful" },
});

console.log(result.content[0].text);
```

## Tips

- Use the MCP Inspector for quick testing and exploration
- Pre-compile the TypeScript before running: `npm run build`
- Check the server logs on stderr for debugging
- All tools return structured responses that can be parsed by AI assistants

---

🎄 Happy Holidays and Happy Coding! 🎅
