import { useState, ChangeEvent, FormEvent } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const NewProduct = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [photo, setPhoto] = useState<string>("");
  const [previewURL, setPreviewURL] = useState<string>("");

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
      <main className="w-full flex flex-col items-center justify-center mt-12 sm:mt-5 p-8">
        <h2 className="text-2xl font-bold mb-2">Add New Product</h2>
        
        <form onSubmit={handleSubmit} className="sm:w-lg w-full bg-white rounded-lg shadow p-8">
          <div className="grid gap-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                min="0"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
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
                {photo && <span className="text-sm text-gray-500">{photo}</span>}
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

export default NewProduct;