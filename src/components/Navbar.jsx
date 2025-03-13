import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Hệ Thống Học Tiếng Anh Cá Nhân Hóa</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-400">Trang Chủ</Link>
          <Link to="/learning-path" className="hover:text-blue-400">Lộ Trình Học</Link>
          <Link to="/placement-test" className="hover:text-blue-400">Kiểm Tra Đầu Vào</Link>
          <Link to="/grammar-practice" className="hover:text-blue-400">Luyện Tập Ngữ Pháp</Link>
          <Link to="/progress-report" className="hover:text-blue-400">Báo Cáo Tiến Độ</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
