// import { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
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

const Home = () => {
  const handleAddToCart = (product: ProductProps) => {
    console.log(product);
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Discover Amazing
              <span className="text-yellow-400"> Deals</span>
            </h1>
            <p className="text-xl text-gray-100">
              Shop the latest trends with incredible prices. Get up to 50% off
              on new arrivals!
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-white transition-all duration-300">
              Shop Now
            </button>
          </div>

          {/* Hero Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 animate-float">
              <img
                src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074075.jpg"
                alt="Shopping Showcase"
                className="w-full h-[400px] object-cover rounded-lg shadow-2xl"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-400 opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* Latest Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Latest Products</h2>
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
      </section>
    </div>
  );
};

export default Home;
