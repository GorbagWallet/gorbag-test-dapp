import { useState } from 'react';
import ProductCard from './ProductCard';

const mockProducts = [
  {
    id: 1,
    name: "Digital Art #001",
    description: "Unique digital artwork created by renowned artist",
    price: 2.5,
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=400",
    owner: "Gorbag Collector",
    category: "Art"
  },
  {
    id: 2,
    name: "Virtual Land",
    description: "Premium virtual real estate in the metaverse",
    price: 4.2,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=400",
    owner: "Meta Explorer",
    category: "Real Estate"
  },
  {
    id: 3,
    name: "Rare Collectible",
    description: "Limited edition collectible item",
    price: 3.8,
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=400",
    owner: "NFT Hoarder",
    category: "Collectibles"
  },
  {
    id: 4,
    name: "Music NFT",
    description: "Exclusive track from indie artist",
    price: 1.5,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400",
    owner: "Beat Maker",
    category: "Music"
  }
];

const ProductList = () => {
  const [products] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(mockProducts.map(p => p.category))];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Marketplace</h2>
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;