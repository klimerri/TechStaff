import './App.css'
import { LogIn } from './pages/Login/LoginPage';
import { Calendar } from './pages/Calendar/CalendarPage';
import { WorkersList } from './pages/WorkersList/WorkersListPage';
import { Worker } from './pages/Worker/Worker';
import { Ticket } from './pages/Ticket/Ticket';
import { LayoutWithDrawer } from './components/LayoutWithDrawer/LayoutWithDrawer';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Requests } from './pages/Requests/Requests';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />

          <Route path="/" element={<LayoutWithDrawer />}>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/workers" element={<WorkersList />} />
            <Route path="/worker" element={<Worker />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
