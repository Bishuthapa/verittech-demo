import type { ApiError, ApiResponse } from "@/types";

const BASE_URL = "https://fakestoreapi.com";


interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
}


function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
}


async function parseError(response: Response): Promise<ApiError> {
  try {
    const body = await response.json();
    return {
      message: body.message || `HTTP Error ${response.status}`,
      status: response.status,
    };
  } catch {
    return {
      message: response.statusText || `HTTP Error ${response.status}`,
      status: response.status,
    };
  }
}


async function apiFetch<T>(
  path: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const { params, timeout = 10000, ...fetchOptions } = config;

  const url = buildUrl(path, params);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await parseError(response);
      return { data: null, error };
    }

    const data: T = await response.json();
    return { data, error: null };
  } catch (err) {
    clearTimeout(timeoutId);

    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        data: null,
        error: { message: "Request timed out. Please try again.", status: 408 },
      };
    }

    if (err instanceof TypeError) {
      return {
        data: null,
        error: {
          message: "Network error. Please check your connection.",
          status: 0,
        },
      };
    }

    return {
      data: null,
      error: { message: "An unexpected error occurred." },
    };
  }
}


export const api = {
  get: <T>(path: string, config?: RequestConfig) =>
    apiFetch<T>(path, { method: "GET", ...config }),

  post: <T>(path: string, body: unknown, config?: RequestConfig) =>
    apiFetch<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
      ...config,
    }),
};

export default api;
