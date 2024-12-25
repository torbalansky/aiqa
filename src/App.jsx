import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AItools from './components/AItools';
import Highlights from './components/Highlights';
import Recommendations from './components/Recommendations';
import TopPick from './components/Toppick';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <div id="home">
        <Home />
      </div>
      <div id="aitools">
        <AItools />
      </div>
      <div id="highlights">
        <Highlights />
      </div>
      <div id="recommendations">
        <Recommendations />
      </div>
      <div id="toppick">
        <TopPick />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
