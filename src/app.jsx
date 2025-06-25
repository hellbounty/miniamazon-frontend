import React, { useState } from 'react';
import products from './data/products';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';

function App() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 Mini Amazon</h1>
      <input
        type="text"
        placeholder="Search products..."
        className="w-full border p-2 mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </div>
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;
