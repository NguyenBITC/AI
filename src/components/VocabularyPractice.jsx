import React, { useState } from 'react';
import { vocabularyList } from '../data/vocabularyData';
import { motion } from 'framer-motion';

const VocabularyPractice = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const nextWord = () => {
    setShowMeaning(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabularyList.length);
  };

  const progress = ((currentIndex + 1) / vocabularyList.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <h1 className="text-3xl font-extrabold text-blue-600 mb-6">📚 Luyện Từ Vựng Giao Tiếp</h1>
      
      {/* Thanh tiến trình */}
      <div className="relative w-72 bg-gray-300 h-2 rounded-full mb-4">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Thẻ từ vựng */}
      <motion.div 
        className="w-96 h-64 bg-white shadow-2xl rounded-2xl flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800">{vocabularyList[currentIndex].word}</h2>

        {showMeaning ? (
          <>
            <p className="text-lg text-gray-700 mt-3">{vocabularyList[currentIndex].meaning}</p>
            <p className="text-gray-500 italic mt-2">"{vocabularyList[currentIndex].example}"</p>
          </>
        ) : (
          <button
            onClick={() => setShowMeaning(true)}
            className="mt-6 bg-blue-500 text-white px-5 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all"
          >
            Hiển thị nghĩa
          </button>
        )}
      </motion.div>

      {/* Nút điều khiển */}
      <div className="mt-6">
        <button
          onClick={nextWord}
          className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all"
        >
          Từ tiếp theo
        </button>
      </div>
    </div>
  );
};

export default VocabularyPractice;
