import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import NotFound from './components/pages/NotFound/NotFound';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import Home from './components/pages/Home/Home';
import AllPatients from './components/pages/AllPatients/AllPatients';
import AllAttributions from './components/pages/AllAttributions/AllAttributions';
import SinglePatient from './components/pages/SinglePatient/SinglePatient';

const App = () => {

  return (
    <main>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/allPatients" element={<AllPatients />} />
          <Route path="/allAttributions" element={<AllAttributions/>} />
          <Route path="/patient/:id" element={<SinglePatient />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </main>
  )
};

export default App;