import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Button,
  Spinner,
  Alert,
  Container,
  Card,
} from 'react-bootstrap';
import styles from './Login.module.scss';
import { logIn } from '../../../redux/userRedux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import { loadBranches } from '../../../redux/branchesRedux';
import { loadHosp } from '../../../redux/hospitalsRedux';
import { updatePatients } from '../../../redux/patientsRedux';
import { updateAttributions } from '../../../redux/attributionsRedux';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (status === 'success') {
      const options = { method: 'GET' };

      fetch(`${API_URL}/branches`, options)
        .then((res) => res.json())
        .then((data) => dispatch(loadBranches(data)));

      fetch(`${API_URL}/hospitals`, options)
        .then((res) => res.json())
        .then((data) => dispatch(loadHosp(data)));

      fetch(`${API_URL}/allPatients`, options)
        .then((res) => res.json())
        .then((data) => dispatch(updatePatients(data)));

      fetch(`${API_URL}/attributions`, options)
        .then((res) => res.json())
        .then((data) => dispatch(updateAttributions(data)));

      const timeout = setTimeout(() => {
        navigate('/home');
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [status, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      if (loginRes.status === 200) {
        const userRes = await fetch(`${API_URL}/auth/logged`, {
          method: 'GET',
        });

        if (!userRes.ok) throw new Error('User fetch failed');

        const userData = await userRes.json();
        dispatch(logIn(userData));
        setStatus('success');
      } else if (loginRes.status === 400) {
        setStatus('clientError');
      } else {
        setStatus('serverError');
      }
    } catch (err) {
      console.error(err);
      setStatus('serverError');
    }
  };

  return (
    <Container className={styles.loginPage}>
      <Card className={styles.loginCard}>
        <Form className={styles.loginForm} onSubmit={handleSubmit}>
          <h1 className={styles.logintitle}>Login</h1>

          {status === 'success' && (
            <Alert variant="success" className={styles.loginAlert}>
              <Alert.Heading>Success!</Alert.Heading>
              <p>You have been successfully logged in!</p>
            </Alert>
          )}

          {status === 'serverError' && (
            <Alert variant="danger" className={styles.loginAlert}>
              <Alert.Heading>Something went wrong...</Alert.Heading>
            </Alert>
          )}

          {status === 'clientError' && (
            <Alert variant="danger" className={styles.loginAlert}>
              <Alert.Heading>Incorrect login or password</Alert.Heading>
            </Alert>
          )}

          {status === 'loading' && (
            <div className={styles.spinnerWrapper}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}

          <FormGroup controlId="formLogin" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Login:</Form.Label>
            <Form.Control
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Enter login"
              className={styles.formControl}
              required
            />
          </FormGroup>

          <FormGroup controlId="formPassword" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={styles.formControl}
              required
            />
          </FormGroup>

          <Button
            variant="primary"
            type="submit"
            className={styles.loginButton}
            disabled={status === 'loading'}
          >
            Log in
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;