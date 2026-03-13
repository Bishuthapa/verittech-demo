import api from "./api";
import type { Product, SortOrder, LoginCredentials } from "@/types";


export async function getAllProducts(sort?: SortOrder): Promise<Product[]> {
  const { data, error } = await api.get<Product[]>("/products", {
    params: sort ? { sort } : undefined,
    next: { revalidate: 3600 },
  } as RequestInit & { params?: Record<string, string>; next?: { revalidate: number } });

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to fetch products");
  }
  return data;
}

export async function getProductById(id: number): Promise<Product> {
  const { data, error } = await api.get<Product>(`/products/${id}`, {
    next: { revalidate: 3600 },
  } as RequestInit & { next?: { revalidate: number } });

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to fetch product");
  }
  return data;
}

export async function getCategories(): Promise<string[]> {
  const { data, error } = await api.get<string[]>("/products/categories", {
    next: { revalidate: 86400 },
  } as RequestInit & { next?: { revalidate: number } });

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to fetch categories");
  }
  return data;
}


export async function loginUser(
  credentials: LoginCredentials
): Promise<string> {
  const { data, error } = await api.post<{ token: string }>(
    "/auth/login",
    credentials
  );

  if (error || !data?.token) {
    throw new Error(error?.message ?? "Login failed. Please check credentials.");
  }
  return data.token;
}
