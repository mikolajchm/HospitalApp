import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import NotFound from './components/pages/NotFound/NotFound';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';

const App = () => {

  return (
    <main>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </main>
  )
};

export default App;