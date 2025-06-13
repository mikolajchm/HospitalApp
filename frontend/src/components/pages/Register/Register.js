import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { API_URL } from '../../../config';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (status === 'success') {
      const timeout = setTimeout(() => {
        navigate('/home');
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [status, navigate]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!firstName || !lastName || !login || !password || !role) {
      setStatus('danger');
      return;
    }

    const options = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        firstName, 
        lastName,
        login, 
        password, 
        role 
      }),
    };

    setStatus('loading');
    fetch(`${API_URL}/auth/register`, options)
      .then(res => {
        if (res.status === 201) setStatus('success');
        else if (res.status === 409) setStatus('warning');
        else setStatus('danger');
      })
      .catch(() => setStatus('serverError'));
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.formWrapper}>
      <Row className="justify-content-center">
        <Col xxl={5} xl={6} lg={7} md={8}>
          <h2 className={styles.heading}>Załóż konto</h2>

          {status === 'success' && (
            <Alert variant="success" className={styles.alert}>Rejestracja zakończona sukcesem!</Alert>
          )}
          {status === 'danger' && (
            <Alert variant="danger" className={styles.alert}>Uzupełnij wszystkie pola.</Alert>
          )}
          {status === 'warning' && (
            <Alert variant="warning" className={styles.alert}>Ten login jest już zajęty.</Alert>
          )}
          {status === 'serverError' && (
            <Alert variant="danger" className={styles.alert}>Błąd serwera – spróbuj ponownie.</Alert>
          )}
          {status === 'loading' && (
            <div className={styles.spinner}>
              <Spinner animation="border" />
            </div>
          )}

          <Form.Group className={styles.inputGroup}>
            <Form.Label className={styles.label}>Imię</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="Jan"
              className={styles.input}
            />
          </Form.Group>

          <Form.Group className={styles.inputGroup}>
            <Form.Label className={styles.label}>Nazwisko</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="Kowalski"
              className={styles.input}
            />
          </Form.Group>

          <Form.Group className={styles.inputGroup}>
            <Form.Label className={styles.label}>Login</Form.Label>
            <Form.Control
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
              placeholder="j.kowalski"
              className={styles.input}
            />
          </Form.Group>

          <Form.Group className={styles.inputGroup}>
            <Form.Label className={styles.label}>Hasło</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="********"
              className={styles.input}
            />
          </Form.Group>

          <Form.Group className={styles.inputGroup}>
            <Form.Label className={styles.label}>Rola:</Form.Label>
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="User">Użytkownik</option>
              <option value="Admin">Administrator</option>
            </Form.Select>
          </Form.Group>

          <div className={styles.buttonWrapper}>
            <Button variant="info" size="lg" type="submit" className={styles.button}>
              Zarejestruj się
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;