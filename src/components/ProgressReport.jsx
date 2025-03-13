import React from 'react';

const ProgressReport = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Báo Cáo Tiến Độ</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-lg font-bold mb-4">Tiến Độ Học Tập</h2>
        <div className="flex justify-center">
          <div className="w-64 h-64 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <p className="text-xl">80%</p>
          </div>
        </div>
        <p className="text-center mt-4">Bạn đã hoàn thành 80% lộ trình học tập của mình.</p>
      </div>
    </div>
  );
};

export default ProgressReport;
