const BASE_URL = "https://app.atera.com";
export class AteraApiError extends Error {
    status;
    statusText;
    body;
    constructor(status, statusText, body) {
        super(`Atera API error ${status} ${statusText}: ${body}`);
        this.status = status;
        this.statusText = statusText;
        this.body = body;
        this.name = "AteraApiError";
    }
}
export class AteraClient {
    apiKey;
    constructor() {
        const key = process.env.ATERA_API_KEY;
        if (!key) {
            throw new Error("ATERA_API_KEY environment variable is required. " +
                "Get your API key from Atera Admin > Customer Facing > API.");
        }
        this.apiKey = key;
    }
    headers() {
        return {
            "X-API-KEY": this.apiKey,
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    }
    buildUrl(path, params) {
        const url = new URL(path, BASE_URL);
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                if (value !== undefined) {
                    url.searchParams.set(key, String(value));
                }
            }
        }
        return url.toString();
    }
    async get(path, params) {
        const url = this.buildUrl(path, params);
        const res = await fetch(url, { method: "GET", headers: this.headers() });
        if (!res.ok) {
            const body = await res.text();
            throw new AteraApiError(res.status, res.statusText, body);
        }
        return (await res.json());
    }
    async getList(path, params) {
        return this.get(path, params);
    }
    async post(path, body) {
        const url = this.buildUrl(path);
        const res = await fetch(url, {
            method: "POST",
            headers: this.headers(),
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const text = await res.text();
            throw new AteraApiError(res.status, res.statusText, text);
        }
        const text = await res.text();
        if (!text)
            return {};
        return JSON.parse(text);
    }
    async put(path, body) {
        const url = this.buildUrl(path);
        const res = await fetch(url, {
            method: "PUT",
            headers: this.headers(),
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!res.ok) {
            const text = await res.text();
            throw new AteraApiError(res.status, res.statusText, text);
        }
        const text = await res.text();
        if (!text)
            return {};
        return JSON.parse(text);
    }
    async del(path) {
        const url = this.buildUrl(path);
        const res = await fetch(url, {
            method: "DELETE",
            headers: this.headers(),
        });
        if (!res.ok) {
            const body = await res.text();
            throw new AteraApiError(res.status, res.statusText, body);
        }
    }
}
export function formatResponse(data) {
    return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
}
export function formatError(error) {
    const message = error instanceof AteraApiError
        ? `Atera API error (${error.status}): ${error.body}`
        : `Unexpected error: ${error instanceof Error ? error.message : String(error)}`;
    return {
        content: [{ type: "text", text: message }],
        isError: true,
    };
}
