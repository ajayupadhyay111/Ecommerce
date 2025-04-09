import { useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const Coupon = () => {
  const [name, setName] = useState<string>("");
  const [options, setOptions] = useState({
    includeNumbers: true,
    includeCharacters: true,
    includeSymbols: false,
  });
  const [generatedCode, setGeneratedCode] = useState<string>("");

  const generateCoupon = () => {
    const numbers = "0123456789";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = "!@#$%^&*";

    let charset = "";
    if (options.includeNumbers) charset += numbers;
    if (options.includeCharacters) charset += characters;
    if (options.includeSymbols) charset += symbols;

    if (!charset) {
      alert("Please select at least one option");
      return;
    }

    // Convert input name to uppercase and remove spaces
    const formattedName = name.toUpperCase().replace(/\s+/g, "");

    // Generate 4 random characters
    let randomPart = "";
    for (let i = 0; i < 4; i++) {
      randomPart += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Combine name and random characters
    const code = `${formattedName}${randomPart}`;
    setGeneratedCode(code);
  };
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-full p-8 my-auto">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6">Generate Coupon Code</h1>

          {/* Coupon Name Input */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Coupon Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Summer Sale"
            />
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Include in code:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="numbers"
                checked={options.includeNumbers}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    includeNumbers: e.target.checked,
                  }))
                }
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="numbers">Numbers (0-9)</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="characters"
                checked={options.includeCharacters}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    includeCharacters: e.target.checked,
                  }))
                }
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="characters">Characters (A-Z)</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="symbols"
                checked={options.includeSymbols}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    includeSymbols: e.target.checked,
                  }))
                }
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="symbols">Symbols (!@#$%^&*)</label>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateCoupon}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Coupon
          </button>

          {/* Generated Code Display */}
          {generatedCode && (
            <div className="mt-6 text-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generated Coupon Code:
              </label>
              <div className="text-2xl font-mono bg-gray-100 py-3 px-4 rounded-md">
                {generatedCode}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Coupon;
