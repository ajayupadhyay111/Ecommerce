import { useState, useEffect, useCallback } from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const StopWatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, []);

  const handleStop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-full my-auto p-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-8">Stopwatch</h1>
            
            {/* Time Display */}
            <div className="text-6xl font-mono mb-8">
              <span>
                {Math.floor(time / 60000).toString().padStart(2, '0')}:
              </span>
              <span>
                {Math.floor((time % 60000) / 1000).toString().padStart(2, '0')}.
              </span>
              <span>
                {Math.floor((time % 1000) / 10).toString().padStart(2, '0')}
              </span>
            </div>

            {/* Control Buttons */}
            <div className="space-x-4">
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={handleStop}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
                >
                  Stop
                </button>
              )}
              <button
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StopWatch;