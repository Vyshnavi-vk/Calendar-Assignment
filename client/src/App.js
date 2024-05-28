import './App.css';
import Calendar from './components/Calendar';
import Login from './components/Login';
import Events from './components/Events';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/events' element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
