import React, { useState } from "react";
import { grammarLessons } from "../data/grammarData";

const GrammarLessons = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Học Ngữ Pháp Cấp Độ A1
      </h1>

      {/* Nếu chưa chọn bài học, hiển thị danh sách */}
      {!selectedLesson ? (
        <div className="space-y-4">
          {grammarLessons.map((lesson) => (
            <button
              key={lesson.id}
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
          <button
            className="mt-6 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            onClick={() => setSelectedLesson(null)}
          >
            Quay lại danh sách
          </button>
        </div>
      )}
    </div>
  );
};

export default GrammarLessons;
