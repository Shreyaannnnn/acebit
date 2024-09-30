import './App.css';
import Nav from './components/Nav';
import Buy_Sell_Swap from './components/Buy_Sell_Swap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/buy_sell_swap" element={<Buy_Sell_Swap />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
