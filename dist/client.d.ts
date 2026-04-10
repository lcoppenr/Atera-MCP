export declare class AteraApiError extends Error {
    status: number;
    statusText: string;
    body: string;
    constructor(status: number, statusText: string, body: string);
}
export interface AteraListResponse<T> {
    items: T[];
    totalItemCount: number;
    page: number;
    itemsInPage: number;
}
export declare class AteraClient {
    private apiKey;
    constructor();
    private headers;
    private buildUrl;
    get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T>;
    getList<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<AteraListResponse<T>>;
    post<T>(path: string, body: Record<string, unknown>): Promise<T>;
    put<T>(path: string, body?: Record<string, unknown>): Promise<T>;
    del(path: string): Promise<void>;
}
export declare function formatResponse(data: unknown): {
    content: {
        type: "text";
        text: string;
    }[];
};
export declare function formatError(error: unknown): {
    content: {
        type: "text";
        text: string;
    }[];
    isError: boolean;
};
