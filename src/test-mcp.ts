#!/usr/bin/env node

/**
 * Simple test script to demonstrate the MCP server functionality
 * This sends sample requests to the server via stdio
 */

import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverPath = path.join(__dirname, "mcp-server.js");

console.log("🎄 Christmas Fun MCP Server Test\n");
console.log("Starting server...\n");

// Start the MCP server
const server = spawn("node", [serverPath], {
  stdio: ["pipe", "pipe", "inherit"],
});

let responseCount = 0;
const expectedResponses = 3;

// Handle server output
server.stdout.on("data", (data) => {
  const lines = data.toString().split("\n");
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    
    try {
      const response = JSON.parse(line);
      responseCount++;
      
      if (response.result) {
        console.log(`✅ Response ${responseCount}:`, JSON.stringify(response.result, null, 2), "\n");
      } else if (response.error) {
        console.error("❌ Error:", response.error);
      }
      
      // Exit after receiving all expected responses
      if (responseCount >= expectedResponses) {
        setTimeout(() => {
          server.kill();
          console.log("🎅 Test completed successfully!");
          process.exit(0);
        }, 100);
      }
    } catch (e) {
      // Not JSON, might be initialization message
      if (line.includes("MCP Server")) {
        console.log("📡", line);
      }
    }
  }
});

// Wait for server to initialize
setTimeout(() => {
  console.log("Sending test requests...\n");
  
  // Request 1: List tools
  const listToolsRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/list",
  };
  
  console.log("📤 Request 1: List available tools");
  server.stdin.write(JSON.stringify(listToolsRequest) + "\n");
  
  // Request 2: Get holiday message
  setTimeout(() => {
    const getMessageRequest = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "get_holiday_message",
        arguments: {
          mood: "cheerful",
        },
      },
    };
    
    console.log("📤 Request 2: Get holiday message (cheerful)");
    server.stdin.write(JSON.stringify(getMessageRequest) + "\n");
  }, 500);
  
  // Request 3: Check naughty or nice
  setTimeout(() => {
    const checkCodeRequest = {
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "check_naughty_or_nice",
        arguments: {
          code_or_message: "fix: improve test coverage and add documentation",
        },
      },
    };
    
    console.log("📤 Request 3: Check if code is naughty or nice");
    server.stdin.write(JSON.stringify(checkCodeRequest) + "\n");
  }, 1000);
}, 1000);

// Handle timeout
setTimeout(() => {
  console.error("⏱️  Test timed out!");
  server.kill();
  process.exit(1);
}, 10000);

// Handle server exit
server.on("exit", (code) => {
  if (code !== 0 && code !== null) {
    console.error(`Server exited with code ${code}`);
    process.exit(code);
  }
});
