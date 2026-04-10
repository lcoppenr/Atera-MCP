import { z } from "zod";
import { formatResponse, formatError } from "../client.js";
export function registerBillingTools(server, client) {
    server.tool("list_invoices", "List invoices from Atera billing.", {
        page: z.number().optional().describe("Page number (default 1)"),
        itemsInPage: z.number().optional().describe("Items per page (default 20, max 50)"),
    }, async (args) => {
        try {
            const result = await client.getList("/api/v3/billing/invoices", args);
            return formatResponse(result);
        }
        catch (error) {
            return formatError(error);
        }
    });
    server.tool("get_invoice", "Get a specific invoice by invoice number.", {
        invoiceNumber: z.number().describe("The invoice number"),
    }, async ({ invoiceNumber }) => {
        try {
            const result = await client.get(`/api/v3/billing/invoice/${invoiceNumber}`);
            return formatResponse(result);
        }
        catch (error) {
            return formatError(error);
        }
    });
}
