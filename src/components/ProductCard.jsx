import React from 'react';

const ProductCard = ({ product, onAdd }) => (
  <div className="border p-4 rounded shadow">
    <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
    <h2 className="text-lg font-bold mt-2">{product.title}</h2>
    <p className="text-green-600 font-semibold">₹{product.price}</p>
    <button onClick={() => onAdd(product)} className="mt-2 px-4 py-1 bg-blue-600 text-white rounded">
      Add to Cart
    </button>
  </div>
);

export default ProductCard;
