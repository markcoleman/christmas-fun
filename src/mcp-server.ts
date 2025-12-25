#!/usr/bin/env node

/**
 * Christmas Fun MCP Server
 * A simple Model Context Protocol server providing holiday cheer!
 * 
 * This server provides festive tools and resources for AI assistants
 * to spread Christmas joy and coding happiness.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Holiday messages for random selection
const holidayMessages = [
  "🎄 May your code compile on the first try this holiday season!",
  "🎅 Ho ho ho! Santa's debugging your code tonight!",
  "⭐ Wishing you zero bugs and 100% test coverage this Christmas!",
  "🎁 Your gift: A perfectly optimized algorithm!",
  "❄️ Let it snow... merge conflicts! Just kidding, smooth deploys ahead!",
  "🔔 Jingle bells, jingle bells, CI/CD all the way!",
  "🌟 May your builds be green and your coffee be strong!",
  "🎅 Santa checked his list twice - your PR looks nice!",
  "🎄 Merry Commits and a Happy New Deploy!",
  "✨ May all your agents be smart and your builds be serene!"
];

// Create the MCP server instance
const server = new Server(
  {
    name: "christmas-fun-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

/**
 * Handler for listing available tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_holiday_message",
        description:
          "Get a festive holiday message with coding and Christmas cheer! Perfect for spreading joy in your development workflow.",
        inputSchema: {
          type: "object",
          properties: {
            mood: {
              type: "string",
              description: "The mood you want (cheerful, motivational, funny)",
              enum: ["cheerful", "motivational", "funny"],
            },
          },
        },
      },
      {
        name: "check_naughty_or_nice",
        description:
          "Check if a piece of code or commit message is on Santa's naughty or nice list! Returns a festive evaluation.",
        inputSchema: {
          type: "object",
          properties: {
            code_or_message: {
              type: "string",
              description: "The code snippet or commit message to evaluate",
            },
          },
          required: ["code_or_message"],
        },
      },
    ],
  };
});

/**
 * Handler for tool calls
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_holiday_message") {
    const mood = (args?.mood as string) || "cheerful";
    let message = "";

    switch (mood) {
      case "motivational":
        message =
          "🌟 Remember: Every great codebase was once just an empty repo. Keep pushing, keep coding, and have a wonderful Christmas 2025!";
        break;
      case "funny":
        message =
          "🎅 Santa's elves tried to debug your code but they got distracted by the gingerbread cookies. They say it looks delicious though!";
        break;
      default:
        // Cheerful - pick a random message
        message =
          holidayMessages[Math.floor(Math.random() * holidayMessages.length)];
    }

    return {
      content: [
        {
          type: "text",
          text: message,
        },
      ],
    };
  }

  if (name === "check_naughty_or_nice") {
    const codeOrMessage = (args?.code_or_message as string) || "";
    
    // Fun heuristics for determining naughty or nice
    // Using word boundary checks to avoid false positives
    const niceKeywords = [
      "\\bfix\\b",
      "\\bimprove\\b",
      "\\btest\\b",
      "\\bdocumentation\\b",
      "\\brefactor\\b",
      "\\boptimize\\b",
      "\\bclean\\b",
    ];
    const naughtyKeywords = [
      "\\bhack\\b",
      "\\btemp\\b",
      "\\btodo\\b",
      "\\bfixme\\b",
      "console\\.log",
      "\\bdebugger\\b",
    ];

    const lowerCode = codeOrMessage.toLowerCase();
    const hasNiceWords = niceKeywords.some((pattern) => 
      new RegExp(pattern, "i").test(lowerCode)
    );
    const hasNaughtyWords = naughtyKeywords.some((pattern) =>
      new RegExp(pattern, "i").test(lowerCode)
    );

    let verdict = "";
    if (hasNiceWords && !hasNaughtyWords) {
      verdict =
        "🎁 Nice list! Santa approves! Your code shows great care and attention to quality.";
    } else if (hasNaughtyWords && !hasNiceWords) {
      verdict =
        "🎅 Naughty list alert! Santa suggests cleaning up those TODOs and console.logs before Christmas!";
    } else if (hasNiceWords && hasNaughtyWords) {
      verdict =
        "🤔 Mixed bag! Some nice practices, but Santa spotted a few things to improve. You're on the 'needs review' list!";
    } else {
      verdict =
        "✨ Neutral territory! Santa says this looks like standard code. Keep up the good work and maybe add some tests!";
    }

    return {
      content: [
        {
          type: "text",
          text: verdict,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

/**
 * Handler for listing available resources
 */
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "christmas://story/en",
        mimeType: "application/json",
        name: "Christmas Story (English)",
        description:
          "The full 2025 AI-themed Christmas story featuring GitHub Copilot, agents, and MCP tools",
      },
      {
        uri: "christmas://story/es",
        mimeType: "application/json",
        name: "Christmas Story (Spanish)",
        description:
          "La historia navideña completa de 2025 con temas de IA",
      },
      {
        uri: "christmas://ascii-art/tree",
        mimeType: "text/plain",
        name: "ASCII Christmas Tree",
        description: "Festive ASCII art Christmas tree",
      },
    ],
  };
});

/**
 * Handler for reading resources
 */
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (uri === "christmas://story/en") {
    const storyPath = path.join(__dirname, "..", "story.en.json");
    const story = fs.readFileSync(storyPath, "utf-8");
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: story,
        },
      ],
    };
  }

  if (uri === "christmas://story/es") {
    const storyPath = path.join(__dirname, "..", "story.es.json");
    const story = fs.readFileSync(storyPath, "utf-8");
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: story,
        },
      ],
    };
  }

  if (uri === "christmas://ascii-art/tree") {
    const asciiTree = `          *
         /|\\
        /*|O\\
       /*/|\\*\\
      /X/O|*\\X\\
     /*/X/|\\X\\*\\
    /O/*/X|*\\O\\X\\
   /X/O/X/|\\X\\*\\O\\
  /*/O/*/X|O\\X\\*\\O\\
 /X/O/X/*/|\\X\\O\\X\\*\\
/O/X/*/O/X|*\\X\\O\\X\\*\\
        |X|
        |X|`;
    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: asciiTree,
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

/**
 * Handler for listing available prompts
 */
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "festive_code_review",
        description:
          "A festive code review prompt that brings holiday cheer to your PR reviews",
        arguments: [
          {
            name: "code",
            description: "The code to review",
            required: true,
          },
        ],
      },
      {
        name: "christmas_commit_message",
        description:
          "Generate a festive commit message for your holiday season commits",
        arguments: [
          {
            name: "changes",
            description: "Description of the changes made",
            required: true,
          },
        ],
      },
    ],
  };
});

/**
 * Handler for getting prompts
 */
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "festive_code_review") {
    const code = (args?.code as string) || "";
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `🎄 Ho ho ho! Time for a festive code review! 🎅

Please review this code with holiday cheer and provide constructive feedback:

\`\`\`
${code}
\`\`\`

Consider:
- 🎁 Code quality and best practices
- ✨ Potential improvements
- 🔔 Any bugs or issues
- ⭐ What's done well

Keep the feedback encouraging and helpful - it's the season of giving (good code reviews)!`,
          },
        },
      ],
    };
  }

  if (name === "christmas_commit_message") {
    const changes = (args?.changes as string) || "";
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `🎅 Generate a festive commit message for these changes:

${changes}

The commit message should:
- 🎄 Be clear and descriptive
- ✨ Follow conventional commit format
- 🎁 Include a touch of holiday spirit (optional emoji)
- 🔔 Be professional yet cheerful

Example format: "🎄 feat: add holiday themed error messages"`,
          },
        },
      ],
    };
  }

  throw new Error(`Unknown prompt: ${name}`);
});

/**
 * Start the server
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Christmas Fun MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
