import { useState, FormEvent } from 'react';
import { BiLeftArrow, BiLeftArrowAlt, BiLeftArrowCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: ""
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Shipping Info:', shippingInfo);
    navigate('/payment'); // Navigate to payment page after form submission
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto  py-12">
      <BiLeftArrowAlt onClick={()=>navigate(-1)} className='text-white  bg-black p-1 size-7 rounded-full'/>
      <div className="max-w-md mx-auto bg-gray-50 rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Shipping Details</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              id="address"
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123 Main St"
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mumbai"
            />
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              id="state"
              value={shippingInfo.state}
              onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Maharashtra"
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              id="country"
              value={shippingInfo.country}
              onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Country</option>
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>

          {/* Pin Code */}
          <div>
            <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
              PIN Code
            </label>
            <input
              type="text"
              id="pinCode"
              value={shippingInfo.pinCode}
              onChange={(e) => setShippingInfo(prev => ({ ...prev, pinCode: e.target.value }))}
              required
              pattern="[0-9]{6}"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="400001"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;