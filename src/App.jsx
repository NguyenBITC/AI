import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LearningPath from './components/LearningPath';
import PlacementTest from './components/PlacementTest';
import GrammarPractice from './components/GrammarPractice';
import ProgressReport from './components/ProgressReport';
// import PdfUploader from './components/PdfUploader';
import Navbar from './components/Navbar';
import VocabularyPractice from './components/VocabularyPractice';
import Lesson from "./components/Lesson";
import GrammarLessons from './components/GrammarA!1';
const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learning-path" element={<LearningPath />} />
          <Route path="/lesson/:level/:lessonId" element={<Lesson />} />

          <Route path="/learning-path/grammar" element={<GrammarLessons />} />          
          <Route path="/placement-test" element={<PlacementTest />} />
          <Route path="/grammar-practice" element={<GrammarPractice />} />
          <Route path="/progress-report" element={<ProgressReport />} />
          <Route path="/vocabulary-practice" element={<VocabularyPractice />} />
          {/* <Route path="/pdfuploader"  element={<PdfUploader/>}/> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
