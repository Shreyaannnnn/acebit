import './App.css';
import Nav from './components/Nav';
import BuySellSwap from './components/BuySellSwap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/buy_sell_swap" element={<BuySellSwap />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
