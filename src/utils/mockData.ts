import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Beautiful Landscape",
    description: "A stunning landscape photograph with mountains and lakes. Perfect for nature lovers and home decoration. This high-quality image will bring peace and tranquility to any space.",
    price: 99.99,
    image: "https://picsum.photos/300/200?random=1",
    isLiked: false,
  },
  {
    id: 2,
    title: "Modern Smartphone",
    description: "Latest smartphone with advanced features, high-resolution camera, and long battery life. Perfect for work and entertainment with its large display and fast processor.",
    price: 799.99,
    image: "https://picsum.photos/300/200?random=2",
    isLiked: false,
  },
  {
    id: 3,
    title: "Coffee Mug",
    description: "Premium ceramic coffee mug with elegant design. Perfect for your morning coffee routine. Dishwasher safe and maintains temperature for hours.",
    price: 19.99,
    image: "https://picsum.photos/300/200?random=3",
    isLiked: false,
  },
  {
    id: 4,
    title: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality. Comfortable for long listening sessions with 30-hour battery life.",
    price: 249.99,
    image: "https://picsum.photos/300/200?random=4",
    isLiked: false,
  },
  {
    id: 5,
    title: "Fitness Tracker",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and waterproof design. Tracks sleep, steps, calories, and various workout modes.",
    price: 149.99,
    image: "https://picsum.photos/300/200?random=5",
    isLiked: false,
  },
  {
    id: 6,
    title: "Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness and color temperature settings. Energy efficient with touch controls and USB charging port.",
    price: 49.99,
    image: "https://picsum.photos/300/200?random=6",
    isLiked: false,
  },
  {
    id: 7,
    title: "Backpack",
    description: "Durable waterproof backpack with laptop compartment and multiple pockets. Perfect for travel, work, or school with comfortable shoulder straps.",
    price: 79.99,
    image: "https://picsum.photos/300/200?random=7",
    isLiked: false,
  },
  {
    id: 8,
    title: "Watch",
    description: "Elegant wristwatch with leather strap and sapphire crystal. Water resistant and featuring precise quartz movement with date display.",
    price: 199.99,
    image: "https://picsum.photos/300/200?random=8",
    isLiked: false,
  },
];

export const getMockProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    // Имитируем задержку сети
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};
