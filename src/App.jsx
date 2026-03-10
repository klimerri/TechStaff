import './App.css'
import { LogIn } from './pages/Login/LoginPage';
import { Calendar } from './pages/Calendar/Calendar';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
