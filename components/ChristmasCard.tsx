import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Heart, Star, Gift } from 'lucide-react';
import { generateChristmasWish } from '../services/geminiService';

const DEFAULT_MESSAGE = `亲爱的小张：

在这个雪花飞舞的季节，愿温暖的炉火映照你开心的笑脸。
希望新的一年里，所有的美好都如期而至。

圣诞快乐！`;

const ChristmasCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateNewWish = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGenerating(true);
    const newWish = await generateChristmasWish("小张");
    setMessage(newWish);
    setIsGenerating(false);
  };

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen p-4 perspective-1000">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.5, opacity: 0, rotateX: -90 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer relative group"
          >
            {/* Envelope Container */}
            <div className="w-[340px] h-[240px] md:w-[500px] md:h-[350px] bg-gradient-to-br from-red-700 to-red-900 rounded-lg shadow-2xl relative flex items-center justify-center border-2 border-red-900 overflow-hidden transform transition-transform duration-300">
                
                {/* Envelope Flap Effect (Visual) */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-red-800 opacity-20 transform origin-top scale-y-100 z-0 clip-path-triangle"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

                {/* Stamp Area */}
                <div className="absolute top-6 right-6 w-20 h-24 bg-christmas-cream shadow-md transform rotate-6 border-4 border-dashed border-christmas-gold/50 flex flex-col items-center justify-center p-1">
                   <div className="w-full h-full border border-gray-300 bg-red-50 flex items-center justify-center">
                     <Star className="text-christmas-gold fill-current w-8 h-8" />
                   </div>
                </div>
                
                {/* Postmark */}
                <div className="absolute top-6 right-20 w-24 h-24 border-2 border-gray-400 rounded-full opacity-40 flex items-center justify-center transform -rotate-12 pointer-events-none">
                    <span className="text-xs font-serif uppercase text-gray-800 text-center leading-tight">North Pole<br/>Express<br/>12.25</span>
                </div>

                <div className="text-center z-10 mt-10">
                    <h2 className="font-handwriting text-5xl md:text-7xl text-christmas-gold drop-shadow-lg mb-3 tracking-wide">For: 小张</h2>
                    <motion.div 
                      animate={{ y: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="font-serif text-white/80 text-sm tracking-widest uppercase"
                    >
                      Click to Open
                    </motion.div>
                </div>
                
                {/* Wax Seal */}
                <div className="absolute bottom-10 md:bottom-16 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center shadow-xl border-4 border-yellow-700/50 group-hover:scale-110 transition-transform">
                    <Heart className="text-red-900 fill-current w-8 h-8 md:w-10 md:h-10 filter drop-shadow-sm" />
                </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="bg-[#fffdf5] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative border-[12px] border-christmas-red"
          >
            {/* Inner Border Design */}
            <div className="absolute inset-2 border-2 border-christmas-gold border-dashed rounded-lg opacity-50 pointer-events-none z-10"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/snow.png')] opacity-10 pointer-events-none"></div>

            {/* Header Decoration */}
            <div className="relative h-40 bg-christmas-green flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
                 <motion.img 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    src="https://images.unsplash.com/photo-1544275825-7096e3444053?q=80&w=400&auto=format&fit=crop" 
                    alt="Christmas Wreath" 
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover z-20 transform translate-y-8"
                 />
            </div>

            <div className="px-8 pt-16 pb-10 text-center flex flex-col items-center">
                
                <h1 className="font-festive text-5xl text-christmas-red mb-6 drop-shadow-sm mt-4">
                    Merry Christmas
                </h1>

                <div className="relative w-full min-h-[120px] mb-8">
                    {isGenerating ? (
                         <div className="absolute inset-0 flex flex-col items-center justify-center text-christmas-gold space-y-3">
                             <RefreshCw className="w-8 h-8 animate-spin" />
                             <span className="font-serif italic text-sm text-gray-500">正在为小张撰写祝福...</span>
                         </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-red-50/50 p-6 rounded-lg border border-red-100"
                        >
                            <p className="font-serif text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                                {message}
                            </p>
                            <div className="text-right mt-4 font-handwriting text-xl text-christmas-red">
                                — Your Friend
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                     <button 
                        onClick={handleGenerateNewWish}
                        disabled={isGenerating}
                        className="group flex items-center space-x-2 px-6 py-2.5 bg-christmas-red hover:bg-red-800 text-white rounded-full transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        <Gift className="w-4 h-4" />
                        <span className="font-sans text-sm font-semibold tracking-wide">生成新祝福</span>
                     </button>
                     
                     <button 
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-christmas-green underline decoration-1 underline-offset-4 text-sm font-serif transition-colors"
                     >
                        合上卡片
                     </button>
                </div>
            </div>
            
            {/* Footer Pattern */}
            <div className="h-3 bg-gradient-to-r from-christmas-green via-christmas-red to-christmas-green"></div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChristmasCard;