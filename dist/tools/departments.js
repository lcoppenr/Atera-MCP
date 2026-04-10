import { z } from "zod";
import { formatResponse, formatError } from "../client.js";
export function registerDepartmentTools(server, client) {
    server.tool("list_departments", "List all departments in Atera.", {
        page: z.number().optional().describe("Page number (default 1)"),
        itemsInPage: z.number().optional().describe("Items per page (default 20, max 50)"),
    }, async (args) => {
        try {
            const result = await client.getList("/api/v3/departments", args);
            return formatResponse(result);
        }
        catch (error) {
            return formatError(error);
        }
    });
    server.tool("get_department", "Get a specific department by ID.", {
        departmentId: z.number().describe("The department ID"),
    }, async ({ departmentId }) => {
        try {
            const result = await client.get(`/api/v3/departments/${departmentId}`);
            return formatResponse(result);
        }
        catch (error) {
            return formatError(error);
        }
    });
    server.tool("create_department", "Create a new department.", {
        Name: z.string().describe("Department name"),
        Description: z.string().optional().describe("Department description"),
    }, async (args) => {
        try {
            const result = await client.post("/api/v3/departments", args);
            return formatResponse(result);
        }
        catch (error) {
            return formatError(error);
        }
    });
    server.tool("update_department", "Update an existing department.", {
        departmentId: z.number().describe("The department ID to update"),
        Name: z.string().optional().describe("Department name"),
        Description: z.string().optional().describe("Department description"),
    }, async ({ departmentId, ...body }) => {
        try {
            const result = await client.put(`/api/v3/departments/${departmentId}`, body);
            return formatResponse(result);
        }
        catch (error) {
            return formatError(error);
        }
    });
    server.tool("delete_department", "Delete a department by ID.", {
        departmentId: z.number().describe("The department ID to delete"),
    }, async ({ departmentId }) => {
        try {
            await client.del(`/api/v3/departments/${departmentId}`);
            return formatResponse({ success: true, message: `Department ${departmentId} deleted` });
        }
        catch (error) {
            return formatError(error);
        }
    });
}
