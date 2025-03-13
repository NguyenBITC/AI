import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GrammarPractice = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subPrompt, setSubPrompt] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!subPrompt) return;
        setLoading(true);
        setError(null);

        const genAI = new GoogleGenerativeAI("AIzaSyDd7KrRUvSafwJkh5j1d40OubayQTeJSZM");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Generate 15 diverse multiple-choice grammar questions strictly in the ${subPrompt} tense. Follow these criteria:

1. Questions should be structured using **only** the ${subPrompt} tense.
2. Each question should include **four answer choices** (A, B, C, D).
3. Indicate the **correct answer** (A, B, C, or D).
4. Provide a **clear explanation** of the correct answer and why the other choices are incorrect.
5. Use **different question types**, including:
   - Sentence completion (fill in the blank)
   - Error identification
   - Contextual understanding
   - Paraphrasing
6. Ensure **natural English usage** in various contexts like daily life, work, hobbies, and travel.

### Output Format (JSON)
Return an array of 15 objects in this format:

[
  {
    "id": "1",
    "type": "sentence_completion",
    "question": "John ___ to the office every day.",
    "question_hint": "(Which verb form correctly fits the sentence in ${subPrompt} tense?)",
    "options": { "A": "goes", "B": "go", "C": "gone", "D": "going" },
    "correct_answer": "A",
    "explanation": "'Goes' is correct because the sentence is in ${subPrompt} tense and uses third-person singular form."
  }
]`;

        const response = await model.generateContent(prompt);
        if (!response || !response.response) throw new Error("Invalid API response");

        const responseText = response.response.text();
        const jsonStart = responseText.indexOf("[");
        const jsonEnd = responseText.lastIndexOf("]") + 1;
        const jsonData = JSON.parse(responseText.slice(jsonStart, jsonEnd));

        setQuestions(jsonData);
        setAnswers({});
        setSubmitted(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to retrieve questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [subPrompt]);

  const handleAnswerSelection = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Bài Tập Ngữ Pháp</h1>
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">Chọn loại ngữ pháp:</h2>
        <div className="flex gap-4">
          {[ "Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous",
    "Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous",
    "Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"].map((tense) => (
            <button
              key={tense}
              onClick={() => setSubPrompt(tense)}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              {tense.replace(" Simple", "")}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-center text-gray-600">Đang tải câu hỏi...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {questions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          {questions.map((q, index) => (
            <div key={q.id} className="mb-6">
              <h2 className="text-lg font-bold mb-2">Câu {index + 1}: {q.question}</h2>
              <p className="text-gray-500 mb-2">{q.question_hint}</p>
              <div className="flex flex-col gap-2">
                {Object.entries(q.options).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleAnswerSelection(q.id, key)}
                    disabled={submitted}
                    className={`py-2 px-4 rounded ${answers[q.id] === key ? "bg-blue-500 text-white" : "bg-gray-200"} hover:bg-blue-600`}
                  >
                    {key}: {value}
                  </button>
                ))}
              </div>
              {submitted && (
                <div className="mt-4 text-gray-600">
                  <p><strong>Đáp án đúng:</strong> {q.correct_answer}</p>
                  <p><strong>Giải thích:</strong> {q.explanation}</p>
                  <p className={answers[q.id] === q.correct_answer ? "text-green-600" : "text-red-600"}>
                    {answers[q.id] === q.correct_answer ? "Bạn đã chọn đúng!" : "Bạn đã chọn sai!"}
                  </p>
                </div>
              )}
            </div>
          ))}
          {!submitted && (
            <button onClick={handleSubmit} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full">
              Nộp bài
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GrammarPractice;
