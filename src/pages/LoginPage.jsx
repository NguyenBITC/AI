import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", data.token);
      alert("Đăng nhập thành công!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi đăng nhập!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Đăng Nhập</button>
      </form>
    </div>
  );
};

export default LoginPage;
