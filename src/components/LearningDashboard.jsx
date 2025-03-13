import React from "react";

const grammarTopics = [
  "To be verbs (am, is, are)",
  "Personal pronouns (I, you, he, she, it, we, they)",
  "Basic sentence structures: affirmative, negative, interrogative",
  "Singular & plural forms (a/an, some/any)",
  "Present Simple Tense",
  "Imperative sentences",
  "Prepositions of place (in, on, under, next to)",
];

const vocabularyTopics = [
  "Family (father, mother, brother, sister, etc.)",
  "Numbers (one, two, three, etc.)",
  "Colors (red, blue, green, etc.)",
  "Time of day (morning, afternoon, evening, night)",
  "Basic verbs (eat, drink, go, come, have, like)",
];

const LearningDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">English Learning Hub</h1>
      
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">📚 Grammar to Learn</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {grammarTopics.map((topic, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 transition">
                ✅ {topic}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white shadow-lg p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">📌 Vocabulary by Topic</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {vocabularyTopics.map((topic, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 transition">
                📝 {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LearningDashboard;
