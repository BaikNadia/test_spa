export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  isLiked: boolean;
  createdAt?: string;
}

export interface CreateProductData {
  title: string;
  description: string;
  price: number;
  image: string;
}
