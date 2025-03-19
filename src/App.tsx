import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Location from './pages/Location';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Location />} />
      </Routes>
    </Router>
  );
}

export default App;
