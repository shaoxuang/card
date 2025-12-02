import React from 'react';
import Snowfall from './components/Snowfall';
import ChristmasCard from './components/ChristmasCard';

function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-christmas-green/20 to-christmas-red/20 overflow-hidden">
      <Snowfall />
      <div className="relative z-10 w-full">
        <ChristmasCard />
      </div>
      
      {/* Footer Music/Credit Control - Visual Only for Simplicity */}
      <div className="fixed bottom-4 right-4 z-20">
         <div className="text-white/30 text-xs font-serif select-none">
            Designed for Xiao Zhang
         </div>
      </div>
    </div>
  );
}

export default App;
