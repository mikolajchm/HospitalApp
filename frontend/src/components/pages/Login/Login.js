import React, { useState } from 'react';
import { Form, FormGroup, Button, Spinner, Alert, Container, Card } from 'react-bootstrap';
import styles from './Login.module.scss';
import { logIn } from '../../../redux/userRedux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { API_URL } from '../../../config';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (status === 'success') {
      const timeout = setTimeout(() => {
        navigate('/home');
      }, 500);

      return () => clearTimeout(timeout); 
    }
  }, [status, navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        login, 
        password
      })
    };

    const option = {
      method: 'GET',
    };

   
  fetch(`${API_URL}/auth/login`, options)
    .then(res => {
      if (res.status === 200) {
        setStatus('success');
        return fetch(`${API_URL}/auth/logged`, option)
          .then(res => {
            if (res.status === 200) {
              return res.json();
            } else {
              throw new Error('Failed to fetch logged user');
            }
          })
          .then(data => {
            dispatch(logIn(data)); 
          });
      } else if (res.status === 400) {
        setStatus('clientError');
        throw new Error('Client Error');
      } else {
        setStatus('serverError');
        throw new Error('Server Error');
      }
    })
    .catch(err => {
      setStatus('serverError');
      console.error(err);
    });
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
              <Alert.Heading>Incorrect data</Alert.Heading>
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
            />
          </FormGroup>

          <Button variant="primary" type="submit" className={styles.loginButton}>
            Log in
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;