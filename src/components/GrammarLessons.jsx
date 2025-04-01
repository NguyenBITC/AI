import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GrammarLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/grammar/lessons");
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, []);

  const handleStartQuiz = () => {
    navigate("/quiz", { state: { lesson: selectedLesson } });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Học Ngữ Pháp Cấp Độ A1
      </h1>

      {!selectedLesson ? (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <button
              key={lesson._id} // Sử dụng _id từ MongoDB
              className="block w-full bg-blue-500 text-white text-left px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
              onClick={() => setSelectedLesson(lesson)}
            >
              {lesson.title}
            </button>
          ))}
        </div>
      ) : (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            {selectedLesson.title}
          </h2>
          <p className="text-gray-700 whitespace-pre-line">{selectedLesson.content}</p>
          <div className="mt-6 flex justify-between">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              onClick={() => setSelectedLesson(null)}
            >
              Quay lại danh sách
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              onClick={handleStartQuiz}
            >
              Luyện Tập
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrammarLessons;
