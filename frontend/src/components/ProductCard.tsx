import { FaShoppingCart } from "react-icons/fa";
import { CartItem } from "../types";
type ProductsProps = {
    productId: string;
    photo:string;
    name: string;
    price: number;
    stock: number;
    handler: (cartItem:CartItem) =>void;
  };
const ProductCard = ({productId,price,name,photo,handler}:ProductsProps) => {
  return (
    <div
      key={productId}
      className="bg-white rounded-lg shadow-md overflow-hidden group relative"
    >
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={photo}
          alt={name}
          className="w-full h-56 object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {name}
        </h3>
        <p className="text-gray-600">₹{price.toLocaleString()}</p>
      </div>
      {/* Add to Cart Overlay */}
      <div className="absolute inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="bg-white text-gray-900 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors"
          onClick={() => handler()}
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
