export interface Product {
  id: string;
  name: string;
  description: string;
  pricePerKg: number;
  pricePerUnit: number;
  image: string;
  stock: number;
  category: Category;
  popular?: boolean;
}

export type Category = "entier" | "decoupe" | "fermier" | "congele";

export interface CartItem {
  product: Product;
  quantity: number;
  mode: "kg" | "unit";
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  address: string;
  phone: string;
  paymentMethod: "livraison" | "orange_money" | "wave";
  purchaseType: "gros" | "detail";
  status: "pending" | "confirmed" | "delivered";
  createdAt: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  entier: "Poulet Entier",
  decoupe: "Poulet Découpé",
  fermier: "Poulet Fermier",
  congele: "Poulet Congelé",
};
