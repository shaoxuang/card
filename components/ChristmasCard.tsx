import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Heart, Music, MailOpen } from 'lucide-react';
import { generateChristmasWish } from '../services/geminiService';

const DEFAULT_MESSAGE = `亲爱的小张：

愿圣诞的钟声带给你一份宁静与喜悦。在这美好的节日里，希望温暖的炉火、闪烁的彩灯和朋友的祝福长伴你左右。

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
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 100 }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer relative group"
          >
            {/* Envelope Back */}
            <div className="w-[340px] h-[240px] md:w-[500px] md:h-[350px] bg-christmas-red rounded-lg shadow-2xl relative flex items-center justify-center border-4 border-christmas-gold overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                
                {/* Stamp */}
                <div className="absolute top-4 right-4 w-16 h-20 bg-christmas-cream border-2 border-dashed border-christmas-gold flex items-center justify-center transform rotate-3 shadow-md">
                   <Sparkles className="text-christmas-red w-8 h-8" />
                </div>

                <div className="text-center z-10">
                    <h2 className="font-handwriting text-4xl md:text-6xl text-christmas-gold drop-shadow-lg mb-2">To: 小张</h2>
                    <p className="font-serif text-christmas-cream text-sm opacity-80">(点击开启 Click to Open)</p>
                </div>
                
                {/* Wax Seal */}
                <div className="absolute bottom-1/4 w-16 h-16 bg-christmas-gold rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-600">
                    <Heart className="text-christmas-red fill-current w-8 h-8" />
                </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bg-christmas-cream w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative border-8 border-double border-christmas-red"
          >
            {/* Inner Texture */}
            <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

            {/* Decorations */}
            <div className="absolute top-0 left-0 w-full h-16 bg-christmas-green opacity-90 flex items-center justify-center overflow-hidden">
                 <div className="flex space-x-8">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded-full bg-christmas-gold animate-pulse" style={{ animationDelay: `${i * 0.1}s`}}></div>
                    ))}
                 </div>
            </div>

            <div className="p-8 pt-20 pb-12 text-center flex flex-col items-center min-h-[500px]">
                
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="mb-6"
                >
                    <img 
                        src="https://picsum.photos/200/200?random=1" 
                        alt="Christmas Decoration" 
                        className="w-32 h-32 rounded-full border-4 border-christmas-gold shadow-lg object-cover mx-auto"
                    />
                </motion.div>

                <h1 className="font-festive text-4xl md:text-5xl text-christmas-red mb-6 drop-shadow-sm">
                    Merry Christmas!
                </h1>

                <div className="relative w-full">
                    {isGenerating ? (
                         <div className="h-48 flex items-center justify-center space-x-2 text-christmas-green">
                             <RefreshCw className="w-6 h-6 animate-spin" />
                             <span className="font-serif italic">正在编织祝福... (Generating...)</span>
                         </div>
                    ) : (
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-serif text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line mb-8 p-4 bg-white/50 rounded-lg shadow-inner"
                        >
                            {message}
                        </motion.p>
                    )}
                </div>

                <div className="mt-auto flex flex-col items-center gap-4">
                     <button 
                        onClick={handleGenerateNewWish}
                        disabled={isGenerating}
                        className="group flex items-center space-x-2 px-6 py-2 bg-christmas-red text-white rounded-full hover:bg-red-700 transition-colors shadow-md disabled:opacity-50"
                     >
                        <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                        <span className="font-sans text-sm font-bold">换一个祝福 (New Wish)</span>
                     </button>
                     
                     <button 
                        onClick={() => setIsOpen(false)}
                        className="text-christmas-green underline hover:text-green-800 text-sm font-serif"
                     >
                        合上卡片 (Close)
                     </button>
                </div>
            </div>
            
            {/* Decorative Corners */}
            <div className="absolute bottom-2 left-2 text-christmas-gold opacity-50"><Sparkles size={24}/></div>
            <div className="absolute bottom-2 right-2 text-christmas-gold opacity-50"><Sparkles size={24}/></div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChristmasCard;
