import { useState, ChangeEvent, FormEvent } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import { useParams } from "react-router-dom";

const img =
  "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/Shoes_0b4c2bae38.jpg";

const ProductManagement = () => {
  const { id: productId } = useParams();
  console.log(productId);
  const [name, setName] = useState<string>("Puma Shoes");
  const [price, setPrice] = useState<number>(2000);
  const [stock, setStock] = useState<number>(12);
  const [photo, setPhoto] = useState<string>();
  const [previewURL, setPreviewURL] = useState<string>(img);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
      setPhoto(file.name);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log({ name, price, stock, photo });
  };

  return (
    <div className="flex">
      <AdminSidebar />
        <main className="w-full flex flex-col sm:flex-row gap-3 items-center justify-center mt-12 sm:mt-5 p-8">
            <section className="flex flex-col h-full p-8 sm:w-md w-full shadow">
            <span className="w-full text-end font-semibold">
                {stock > 0 ? (
                <span className="text-green-500"> {stock} Available</span>
                ) : (
                <span className="text-red-500">Not available</span>
                )}
            </span>
            <span className="py-3">{productId}</span>
            <div className="max-h-[70%] flex items-center justify-center">
                <img src={previewURL} alt="" className="object-contain" />
            </div>
            <span className="font-semibold text-center text-xl text-gray-500 pt-4">{name}</span>
            <span className="font-bold text-xl text-center py-2">${price}</span>
            </section>
            <form
            onSubmit={handleSubmit}
            className="w-sm bg-white rounded-lg shadow p-8"
            >
            <h2 className="text-2xl text-center font-bold mb-2 uppercase">
                Manage
            </h2>
            <div className="grid gap-6">
                {/* Product Name */}
                <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Product Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                </div>

                {/* Price */}
                <div>
                <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Price ($)
                </label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                </div>

                {/* Stock */}
                <div>
                <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Stock
                </label>
                <input
                    type="number"
                    id="stock"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                </div>

                {/* Photo Upload */}
                <div>
                <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Product Photo
                </label>
                <div className="flex items-center gap-4">
                    <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                    required
                    />
                    <label
                    htmlFor="photo"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200"
                    >
                    Choose File
                    </label>
                    {photo && (
                    <span className="text-sm text-gray-500">{photo}</span>
                    )}
                </div>
                {previewURL && (
                    <div className="mt-4">
                    <img
                        src={previewURL}
                        alt="Preview"
                        className="w-32 h-32 object-contain rounded-md"
                    />
                    </div>
                )}
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-8 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Add Product
            </button>
            </form>
        </main>
    </div>
  );
};

export default ProductManagement;
