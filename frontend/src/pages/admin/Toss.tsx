import { useState } from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const Toss = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);

  const flipCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setResult(null);

    // Random result after animation
    setTimeout(() => {
      const random = Math.random();
      setResult(random < 0.5 ? 'heads' : 'tails');
      setIsFlipping(false);
    }, 1500);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-full p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">Coin Flip</h1>
          
          <div 
            onClick={flipCoin}
            className={`cursor-pointer w-40 h-40 relative rounded-full mx-auto mb-8
              ${isFlipping ? 'animate-[flip_1.5s_ease-in-out]' : ''}
              ${!isFlipping && result ? 'transform transition-transform duration-300 hover:scale-110' : ''}
            `}
            style={{
              backgroundColor: '#FFD700',
              border: '4px solid #DAA520',
              boxShadow: '0 0 20px rgba(0,0,0,0.2)'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-yellow-800">
              {!isFlipping && result ? result.toUpperCase() : '?'}
            </div>
          </div>

          <p className="text-lg">
            {!isFlipping && result 
              ? `It's ${result}!` 
              : 'Click the coin to flip'}
          </p>

          {!isFlipping && result && (
            <button
              onClick={flipCoin}
              className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
            >
              Flip Again
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

// Add this to your global CSS or tailwind.config.js
const style = `
@keyframes flip {
  0% { transform: rotateX(0); }
  100% { transform: rotateX(1800deg); }
}
`;

export default Toss;