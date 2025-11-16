export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  isActive: boolean;
  image: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}
