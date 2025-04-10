import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    gender: '',
    dob: '',
  });

  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    console.log('Google login clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Please complete your profile</p>
        </div>

        <form className="space-y-6">
          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex gap-4">
              {['Male', 'Female', 'Other'].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender.toLowerCase()}
                    checked={formData.gender === gender.toLowerCase()}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
          >
            <FaGoogle className="text-red-500" size={20} />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          By continuing, you agree to our{' '}
          <a href="#" className="text-blue-500 hover:text-blue-600">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-500 hover:text-blue-600">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;