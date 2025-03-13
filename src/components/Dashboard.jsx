import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Hệ Thống Học Tiếng Anh Cá Nhân Hóa</h1>
      </header>
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Lộ Trình Học Tập</h2>
            <p className="text-gray-600">
              Xem lộ trình cá nhân hóa để cải thiện ngữ pháp và từ vựng.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Flashcards Thông Minh</h2>
            <p className="text-gray-600">Ôn tập từ vựng hiệu quả hơn với flashcards.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Bài Tập Ngữ Pháp</h2>
            <p className="text-gray-600">
              Hoàn thành các bài tập ngữ pháp để nâng cao kỹ năng.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
