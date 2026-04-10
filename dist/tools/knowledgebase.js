import { z } from "zod";
import { formatResponse, formatError } from "../client.js";
export function registerKnowledgeBaseTools(server, client) {
    server.tool("list_kb_articles", "List knowledge base articles from Atera.", {
        page: z.number().optional().describe("Page number (default 1)"),
        itemsInPage: z.number().optional().describe("Items per page (default 20, max 50)"),
    }, async (args) => {
        try {
            const result = await client.getList("/api/v3/knowledgebases", args);
            return formatResponse(result);
        }
        catch (error) {
            return formatError(error);
        }
    });
}
