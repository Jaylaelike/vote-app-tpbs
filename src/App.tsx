import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigating';
import CreativeVote from './page/CreativeVote';
import Results from './page/Results';
import About from './page/About';
import PopularVote from './page/PopularVote';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navigation />
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<CreativeVote />} />
            <Route path="/vote2" element={<PopularVote />} />
            <Route path="/results" element={<Results />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;