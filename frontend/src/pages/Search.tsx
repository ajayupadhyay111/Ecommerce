import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

interface ProductProps {
    productId: string;
    name: string;
    price: number;
    photo: string;
    stock: number;
  }

const products: ProductProps[] = [
    {
      productId: "1",
      name: "Gaming Laptop",
      price: 145000,
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD2qqTETNvhuwbOxm06z6aWQjJsytiMsbtzw&s",
      stock: 10,
    },
  
    {
      productId: "2",
      name: "Running Shoes",
      price: 2000,
      photo:
        "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/Shoes_0b4c2bae38.jpg",
      stock: 5,
    },
    {
      productId: "3",
      name: "Smartphone",
      price: 34000,
      photo: "https://m.media-amazon.com/images/I/31Q14qzdoZL._SR290,290_.jpg",
      stock: 5,
    },
    {
      productId: "4",
      name: "Wireless Headphones",
      price: 4999,
      photo: "https://m.media-amazon.com/images/I/41lArSiD5hL.jpg",
      stock: 5,
    },
    {
      productId: "5",
      name: "Bluetooth Speaker",
      price: 2299,
      photo:
        "https://www.boat-lifestyle.com/cdn/shop/files/Stone_SpinXPro_1.png?v=1709717404",
      stock: 5,
    },
    {
      productId: "6",
      name: "Smartwatch",
      price: 7999,
      photo: "https://m.media-amazon.com/images/I/81-kAUJg4aL._SL1500_.jpg",
      stock: 5,
    },
  ];

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const handleAddToCart = (product: ProductProps) => {
    console.log(product);
    console.log(`Added ${product.name} to cart`);
  };

  let isNextPage= true
  let isPrevPage= true
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Filters Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md sticky top-0 h-screen">
        <h2 className="text-xl font-bold mb-6">Filters</h2>
        
        {/* Sort Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Sort</h4>
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Max Price: ₹{maxPrice.toLocaleString()}
          </h4>
          <input
            type="range"
            value={maxPrice}
            min={100}
            max={100000}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="camera">Camera</option>
            <option value="laptop">Laptop</option>
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Products</h1>
          
          {/* Search Input */}
          <div className="mb-8">
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.productId}
                productId={product.productId}
                name={product.name}
                price={product.price}
                stock={product.stock}
                photo={product.photo}
                handler={handleAddToCart}
              />
            ))}
          </div>
          <div className="flex items-center justify-center mt-8 gap-4">
  <button 
    className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors
      ${!isPrevPage 
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
        : 'bg-white text-gray-700 hover:bg-gray-50 border'
      }`}
    disabled={!isPrevPage} 
    onClick={() => setPage(prev => prev - 1)}
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
    Previous
  </button>

  <div className="flex items-center gap-1">
    <span className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium">
      {page}
    </span>
    <span className="text-gray-600">of</span>
    <span className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 font-medium">
      4
    </span>
  </div>

  <button 
    className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors
      ${!isNextPage 
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
        : 'bg-white text-gray-700 hover:bg-gray-50 border'
      }`}
    disabled={!isNextPage} 
    onClick={() => setPage(prev => prev + 1)}
  >
    Next
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>
        </div>
      </main>
    </div>
  );
};

export default Search;
