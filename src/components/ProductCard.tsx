'use client';

import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/stores/productStore';
import { Heart, Trash2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { toggleLike, deleteProduct } = useProductStore();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    router.push(`/products/${product.id}`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(product.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteProduct(product.id);
  };

  const truncatedDescription = product.description.length > 100
    ? `${product.description.substring(0, 100)}...`
    : product.description;

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
      onClick={handleCardClick}
    >
      <div className="relative h-48 bg-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3 flex-1">{truncatedDescription}</p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-green-600">
            ${product.price}
          </span>

          <div className="flex space-x-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${
                product.isLiked
                  ? 'text-red-500 bg-red-50'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${product.isLiked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleDelete}
              className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
