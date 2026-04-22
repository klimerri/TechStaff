import './App.css'
import { LogIn } from './pages/Login/LoginPage';
import { Calendar } from './pages/Calendar/CalendarPage';
import { WorkersList } from './pages/WorkersList/WorkersListPage';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/workers-list" element={<WorkersList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
