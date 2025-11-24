import { Product } from '@/types/product';
import { getMockProducts } from './mockData';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // Пробуем получить данные с API
    const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=8');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.map((item: any, index: number) => ({
      id: item.id,
      title: item.title.charAt(0).toUpperCase() + item.title.slice(1), // Делаем первую букву заглавной
      description: `This is a beautiful ${item.title} with amazing features and great quality. Perfect for everyday use and will exceed your expectations with its premium quality.`,
      price: Math.floor(Math.random() * 1000) + 10,
      image: item.thumbnailUrl || `https://picsum.photos/300/200?random=${item.id}`,
      isLiked: false,
    }));
  } catch (error) {
    console.log('Using mock data due to API error:', error);
    // Используем моковые данные если API не работает
    return getMockProducts();
  }
};
