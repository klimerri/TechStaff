import './App.css'
import { LogIn } from './pages/Login/LoginPage';
import { Calendar } from './pages/Calendar/CalendarPage';
import { WorkersList } from './pages/WorkersList/WorkersListPage';
import { Worker } from './pages/Worker/Worker';
import { LayoutWithDrawer } from './components/LayoutWithDrawer/LayoutWithDrawer';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />

          <Route path="/" element={<LayoutWithDrawer />}>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/workers-list" element={<WorkersList />} />
            <Route path="/worker-page" element={<Worker />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
