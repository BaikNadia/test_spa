'use client';

import { useParams, useRouter } from 'next/navigation';
import { useProductStore } from '@/stores/productStore';
import { ArrowLeft, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { getProductById, toggleLike } = useProductStore();

  const [product, setProduct] = useState(() => {
    if (!id) return null;
    return getProductById(Number(id));
  });

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(Number(id));
      setProduct(foundProduct);
    }
  }, [id, getProductById]);

  // Если продукт не найден
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    toggleLike(product.id);
    setProduct({ ...product, isLiked: !product.isLiked });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Кнопка назад */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Левая колонка - изображение */}
            <div className="md:w-1/2">
              <div className="h-96 md:h-full bg-gray-200">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Правая колонка - информация */}
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

                <button
                  onClick={handleLike}
                  className={`p-2 rounded-full transition-colors ${
                    product.isLiked
                      ? 'text-red-500 bg-red-50'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${product.isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-green-600">${product.price}</span>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Product Details</h2>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Product ID:</span>
                    <span>{product.id}</span>
                  </div>
                  {product.createdAt && (
                    <div className="flex justify-between">
                      <span>Added:</span>
                      <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={`font-semibold ${
                      product.isLiked ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {product.isLiked ? 'Liked ❤️' : 'Not liked'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => router.push('/')}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  Back to Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
