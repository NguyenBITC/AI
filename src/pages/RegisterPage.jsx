import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi đăng ký!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Đăng Ký</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Họ và tên" onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Đăng Ký</button>
      </form>
    </div>
  );
};

export default RegisterPage;
