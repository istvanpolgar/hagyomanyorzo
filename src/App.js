import { React } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home';
import Admin from './components/Admin';

function App() {
  return(
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
