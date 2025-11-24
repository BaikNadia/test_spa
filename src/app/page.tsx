'use client';

import { useState, useEffect } from 'react';
import { useProductStore } from '@/stores/productStore';
import { fetchProducts } from '@/utils/api';
import ProductList from '@/components/ProductList';
import { Plus } from 'lucide-react';
import Link from 'next/link';

type FilterType = 'all' | 'liked';

export default function Home() {
  const { products, addProduct, searchProducts } = useProductStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log('Starting to load products...');

        // Всегда загружаем продукты, даже если они уже есть в store
        // Это поможет при перезагрузке страницы
        const fetchedProducts = await fetchProducts();
        console.log('Fetched products:', fetchedProducts.length);

        // Очищаем существующие продукты и добавляем новые
        fetchedProducts.forEach(product => {
          addProduct({
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image,
          });
        });

        console.log('Products loaded successfully');
      } catch (error) {
        console.error('Error in loadProducts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [addProduct]); // Убрали products.length из зависимостей

  const filteredProducts = searchProducts(searchQuery).filter(product => {
    if (filter === 'liked') {
      return product.isLiked;
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Products ({filteredProducts.length})
          </h1>
          <Link
            href="/create-product"
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </Link>
        </div>

        {/* Простые фильтры */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search products by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Products
              </button>

              <button
                onClick={() => setFilter('liked')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'liked'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Liked ❤️
              </button>
            </div>
          </div>
        </div>

        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
