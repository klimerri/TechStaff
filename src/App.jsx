import './App.css'
import { LogIn } from './pages/Login/LoginPage';
import { Calendar } from './pages/Calendar/CalendarPage';
import { WorkersList } from './pages/WorkersList/WorkersListPage';
import { Worker } from './pages/Worker/Worker';
import { Ticket } from './pages/Ticket/Ticket';
import { LayoutWithDrawer } from './components/LayoutWithDrawer/LayoutWithDrawer';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Requests } from './pages/Requests/Requests';
import { PrivateRoutes } from './components/ProtectedRoute/ProtectedRoute';
import { Statistics } from './pages/Statistics/Statistics';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<LayoutWithDrawer />}>
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/workers" element={<WorkersList />} />
              <Route path="/worker/:id" element={<Worker />} />
              <Route path="/ticket/:id" element={<Ticket />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/statistics" element={<Statistics />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
