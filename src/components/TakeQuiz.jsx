import React, { useState } from "react";
import grammarData from "../data/grammarData";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDd7KrRUvSafwJkh5j1d40OubayQTeJSZM");

const GrammarLessons = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  const handleLessonClick = (index) => {
    setSelectedLesson(index);
    setShowQuiz(false);
    setShowResults(false);
    setUserAnswers({});
  };

  const generateQuiz = async () => {
    setLoadingQuiz(true);
    const lessonTitle = grammarData[selectedLesson].title;
    const prompt = `Generate 5 multiple-choice questions about ${lessonTitle}. Provide four options per question and indicate the correct answer.`;
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const response = await model.generateText({ prompt });
      const quizData = JSON.parse(response.text());
      setQuizQuestions(quizData.questions);
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
    setLoadingQuiz(false);
  };

  const handleStartQuiz = async () => {
    await generateQuiz();
    setShowQuiz(true);
    setShowResults(false);
    setUserAnswers({});
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    quizQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Grammar Lessons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {grammarData.map((lesson, index) => (
          <button
            key={index}
            onClick={() => handleLessonClick(index)}
            className="bg-blue-500 text-white p-3 rounded-lg shadow hover:bg-blue-600"
          >
            {lesson.title}
          </button>
        ))}
      </div>
      {selectedLesson !== null && (
        <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-600">{grammarData[selectedLesson].title}</h2>
          <p className="text-gray-700 mt-2">{grammarData[selectedLesson].content}</p>
          <button
            onClick={handleStartQuiz}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={loadingQuiz}
          >
            {loadingQuiz ? "Generating Quiz..." : "Take Quiz"}
          </button>
        </div>
      )}
      {showQuiz && selectedLesson !== null && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-600">Quiz</h2>
          {quizQuestions.map((question, index) => (
            <div key={index} className="mt-4">
              <p className="text-lg font-medium">{question.question}</p>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="block bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleAnswerChange(index, option)}
                      checked={userAnswers[index] === option}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmitQuiz}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Quiz
          </button>
        </div>
      )}
      {showResults && (
        <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-600">Your Score: {score} / {quizQuestions.length}</h2>
        </div>
      )}
    </div>
  );
};

export default GrammarLessons;
