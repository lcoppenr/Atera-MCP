# Atera MCP Server

A Model Context Protocol (MCP) server that wraps the full Atera REST API v3, allowing AI assistants like Claude to manage your Atera helpdesk, customers, agents, alerts, and more.

## Features

54 MCP tools covering the entire Atera API:

| Domain | Tools | Operations |
|--------|-------|------------|
| **Tickets** | 4 | list, get, create, delete |
| **Customers** | 5 | list, get, create, update, delete |
| **Contacts** | 5 | list, get, create, update, delete |
| **Agents** | 4 | list, get, get by customer, delete |
| **Alerts** | 5 | list, get, create, resolve, delete |
| **Contracts** | 5 | list, get, list by customer, create, update |
| **Billing** | 2 | list invoices, get invoice |
| **Knowledge Base** | 1 | list articles |
| **Departments** | 5 | list, get, create, update, delete |
| **Products** | 5 | list, get, create, update, delete |
| **Expenses** | 5 | list, get, create, update, delete |
| **Custom Values** | 8 | get field definitions, get/set for tickets, customers, contacts |

## Prerequisites

- Node.js 18+
- An Atera account with API access
- Your Atera API key (found in **Admin > Customer Facing > API**)

## Installation

```bash
git clone <repo-url>
cd AteraMCP
npm install
npm run build
```

## Configuration

### Claude Code

Add to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "atera": {
      "command": "node",
      "args": ["/path/to/AteraMCP/dist/index.js"],
      "env": {
        "ATERA_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "atera": {
      "command": "node",
      "args": ["/path/to/AteraMCP/dist/index.js"],
      "env": {
        "ATERA_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## Development

Run the server directly with TypeScript (no build step):

```bash
ATERA_API_KEY=your-key npm run dev
```

Build for production:

```bash
npm run build
npm start
```

## Usage Examples

Once connected, you can ask Claude things like:

- "Show me all open tickets"
- "Create a ticket for John at Acme Corp about their printer issue"
- "List all agents for customer 42"
- "Resolve alert 123"
- "What customers do we have?"
- "Update the phone number for customer 5"
- "Show me all open alerts"
- "List knowledge base articles"

## Project Structure

```
src/
├── index.ts              # Entry point — MCP server + stdio transport
├── client.ts             # Atera API client (auth, HTTP methods, error handling)
├── types.ts              # TypeScript interfaces for Atera DTOs
└── tools/
    ├── tickets.ts        # Ticket management tools
    ├── customers.ts      # Customer management tools
    ├── contacts.ts       # Contact management tools
    ├── agents.ts         # Agent management tools
    ├── alerts.ts         # Alert management tools
    ├── contracts.ts      # Contract management tools
    ├── billing.ts        # Invoice/billing tools
    ├── knowledgebase.ts  # Knowledge base tools
    ├── departments.ts    # Department management tools
    ├── products.ts       # Product management tools
    ├── expenses.ts       # Expense management tools
    └── custom-values.ts  # Custom field value tools
```

## API Reference

This server implements the [Atera API v3](https://app.atera.com/apidocs). Authentication is handled via the `X-API-KEY` header using the key provided in the `ATERA_API_KEY` environment variable.

All list endpoints support pagination with `page` (default 1) and `itemsInPage` (default 20, max 50) parameters.

## License

MIT
