
export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export type SortOrder = "asc" | "desc";

export interface ProductsQueryParams {
  sort?: SortOrder;
  limit?: number;
}


export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: number } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };


export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  username: string | null;
}


export interface ApiError {
  message: string;
  status?: number;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}


export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
  sort: SortOrder;
}
