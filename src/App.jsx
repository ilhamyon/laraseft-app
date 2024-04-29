import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import BottomMenu from './components/BottomMenu'
import Artikel from './pages/Artikel'
import Video from './pages/Video'
import Kesehatan from './pages/Kesehatan'
import Profile from './pages/Profile'
import DataUser from './pages/DataUser'
import Skrining from './pages/Skrining'
import Latihan from './pages/Latihan'
import Seft from './pages/Seft'
import LatihanPernapasan from './pages/LatihanPernapasan'
import Edukasi from './pages/Edukasi'
import Evaluasi from './pages/Evaluasi'

function AppContent() {
  const navigate = useLocation();

  // Mengecek apakah kita berada di halaman '/' atau '/register'
  const isHomeOrRegister = navigate.pathname === '/' || navigate.pathname === '/register' || navigate.pathname === '/data-user';

  return (
    <>
      <div className='flex justify-center'>
        {!isHomeOrRegister && <BottomMenu />}
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/seft" element={<Seft />} />
        <Route path="/latihan-pernapasan" element={<LatihanPernapasan />} />
        <Route path="/edukasi-kesehatan" element={<Edukasi />} />
        <Route path="/evaluasi" element={<Evaluasi />} />
        <Route path="/latihan" element={<Latihan />} />
        <Route path="/video" element={<Video />} />
        <Route path="/kesehatan" element={<Kesehatan />} />
        <Route path="/skrining" element={<Skrining />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/data-user" element={<DataUser />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
