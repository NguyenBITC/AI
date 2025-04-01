import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

const GrammarQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lesson = location.state?.lesson;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previousQuestions, setPreviousQuestions] = useState(new Set());
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    if (!lesson) return;
    const fetchQuestions = async () => {
      try {
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an expert in English grammar. Generate 10 unique multiple-choice questions based on the lesson titled: "${lesson.title}".  

**Requirements:**  
- The questions must be in English and should not be translated into any other language.  
- Each question must have 4 answer choices labeled as A, B, C, and D.  
- Clearly indicate the correct answer.  
- Provide a detailed explanation for the correct answer.  
- Ensure that the generated questions do not repeat across different quiz attempts.  

**Response Format (JSON array):**  
[
  {
    "question": "What is the correct form of the verb in the sentence: 'She ___ to the market every Sunday'?",
    "options": { "A": "go", "B": "goes", "C": "going", "D": "gone" },
    "correct_answer": "B",
    "explanation": "The correct answer is 'goes' because 'She' is a singular subject, and in the present simple tense, we add '-es' to verbs ending in 'o'."
  }
]`;
        
        const response = await model.generateContent(prompt);
        const responseText = await response.response.text();
        const jsonData = JSON.parse(responseText.match(/\[.*\]/s)?.[0] || "[]");
        
        // Ensure unique questions
        const filteredQuestions = jsonData.filter(q => !previousQuestions.has(q.question));
        setPreviousQuestions(new Set([...previousQuestions, ...filteredQuestions.map(q => q.question)]));
        
        setQuestions(filteredQuestions);
        setLoading(false);
      } catch (err) {
        console.error("Error generating questions:", err);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [lesson]);

  const handleAnswer = (optionKey) => {
    if (selectedAnswer) return;
    setSelectedAnswer(optionKey);
    setUserAnswers([...userAnswers, { 
      question: questions[currentQuestion].question, 
      selected: optionKey, 
      correct: questions[currentQuestion].correct_answer,
      explanation: questions[currentQuestion].explanation
    }]);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClipLoader color="#333" size={50} />
      </div>
    );
  }

  if (!lesson || questions.length === 0) return <p>Không có câu hỏi nào.</p>;

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-300 to-indigo-500 text-white px-4">
      <h1 className="text-2xl font-bold mb-6">📝 Kiểm tra bài học: {lesson.title} 📝</h1>
      {!quizCompleted ? (
        <>
          <motion.h2 className="text-2xl font-bold">✨ Câu Hỏi {currentQuestion + 1} / {questions.length} ✨</motion.h2>
          <motion.div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-2xl text-center">
            <h2 className="text-xl font-semibold">{questions[currentQuestion].question}</h2>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-2xl">
            {Object.entries(questions[currentQuestion].options).map(([key, value]) => (
              <motion.button key={key} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer(key)}
                className={`px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                  selectedAnswer
                    ? key === questions[currentQuestion].correct_answer
                      ? "bg-green-500"
                      : key === selectedAnswer
                      ? "bg-red-500"
                      : "bg-gray-200"
                    : "bg-gray-200 text-black hover:bg-blue-300" 
                }`}>
                {key}: {value}
              </motion.button>
            ))}
          </div>
          {selectedAnswer && (
            <motion.div className="mt-6 p-4 bg-yellow-300 text-black rounded-lg w-full max-w-2xl text-center">
              <strong>Đáp án đúng:</strong> {questions[currentQuestion].correct_answer} <br />
              <strong>Giải thích:</strong> {questions[currentQuestion].explanation}
            </motion.div>
          )}
          <div className="flex gap-4 mt-6">
            {currentQuestion > 0 && <button className="px-6 py-2 bg-gray-600 text-white rounded-lg" onClick={() => setCurrentQuestion(currentQuestion - 1)}>⬅ Trước</button>}
            {selectedAnswer && <button className="px-6 py-2 bg-blue-600 text-white rounded-lg" onClick={nextQuestion}>➡ Tiếp</button>}
          </div>
        </>
      ) : (
        <motion.div className="p-6 bg-white text-black rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">🎉 Hoàn Thành! 🎉</h2>
          <p className="text-xl mt-4">Bạn đã đạt được <strong>{score} / {questions.length}</strong> điểm.</p>
          <div className="mt-4">
            {userAnswers.map((answer, index) => (
              <div key={index} className="p-4 bg-gray-200 rounded-lg mt-2">
                <strong>{index + 1}. {answer.question}</strong><br />
                Bạn chọn: <span className={answer.selected === answer.correct ? "text-green-600" : "text-red-600"}>{answer.selected}</span><br />
                Đáp án đúng: <strong>{answer.correct}</strong><br />
                Giải thích: {answer.explanation}
              </div>
            ))}
          </div>
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-bold text-lg rounded-lg" onClick={restartQuiz}>Làm lại bài kiểm tra 🔄</button>
          <button className="mt-2 px-6 py-2 bg-gray-600 text-white rounded-lg" onClick={() => navigate("/learning-path/grammar")}>Quay lại Bài Học</button>
        </motion.div>
      )}
    </div>
  );
};

export default GrammarQuiz;
