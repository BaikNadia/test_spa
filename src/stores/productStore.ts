import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CreateProductData } from '@/types/product';

interface ProductState {
  products: Product[];
  addProduct: (productData: CreateProductData) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  toggleLike: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
  searchProducts: (query: string) => Product[];
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (productData: CreateProductData) => {
        const newProduct: Product = {
          ...productData,
          id: Date.now(),
          isLiked: false,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          products: [newProduct, ...state.products],
        }));
      },

      updateProduct: (id: number, updates: Partial<Product>) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          ),
        }));
      },

      deleteProduct: (id: number) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
      },

      toggleLike: (id: number) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, isLiked: !product.isLiked } : product
          ),
        }));
      },

      getProductById: (id: number) => {
        return get().products.find((product) => product.id === id);
      },

      searchProducts: (query: string) => {
        const { products } = get();
        if (!query.trim()) return products;

        const lowercaseQuery = query.toLowerCase();
        return products.filter((product) =>
          product.title.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery)
        );
      },
    }),
    {
      name: 'product-storage',
    }
  )
);
