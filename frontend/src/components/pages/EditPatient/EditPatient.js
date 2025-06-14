import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { API_URL } from '../../../config';
import { getPatientById } from '../../../redux/patientsRedux'; 
import styles from './EditPatient.module.scss';

const EditPatient = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = useSelector(state => getPatientById(state, id));

  const [firstName, setFirstName] = useState(patient.firstName || '');
  const [lastName, setLastName] = useState(patient.lastName || '');
  const [peselNum, setPeselNum] = useState(patient.peselNum || '');
  const [priority, setPriority] = useState(patient.priority || '');
  const [age, setAge] = useState(patient.age || '');
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

    if (!firstName || !lastName || !peselNum || !priority || !age) {
      setStatus('danger');
      return;
    }

    const options = {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        peselNum,
        priority,
        age,
      }),
    };

    setStatus('loading');
    fetch(`${API_URL}/patient/${id}`, options)
      .then(res => {
        if (res.ok) setStatus('success');
        else if (res.status === 409) setStatus('warning');
        else setStatus('danger');
      })
      .catch(() => setStatus('serverError'));
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.formWrapper}>
      <h1 className={styles.heading}>Edytuj pacjenta</h1>

      {status === 'success' && (
        <Alert variant="success" className={styles.alert}>Pacjent został zaktualizowany!</Alert>
      )}
      {status === 'danger' && (
        <Alert variant="danger" className={styles.alert}>Uzupełnij wszystkie pola.</Alert>
      )}
      {status === 'warning' && (
        <Alert variant="warning" className={styles.alert}>Pacjent z tym numerem PESEL już istnieje.</Alert>
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
        <Form.Label className={styles.label}>Imię:</Form.Label>
        <Form.Control
          type="text"
          maxLength={20}
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          className={styles.input}
        />
      </Form.Group>

      <Form.Group className={styles.inputGroup}>
        <Form.Label className={styles.label}>Nazwisko:</Form.Label>
        <Form.Control
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          className={styles.input}
        />
      </Form.Group>

      <Form.Group className={styles.inputGroup}>
        <Form.Label className={styles.label}>PESEL:</Form.Label>
        <Form.Control
          type="text"
          minLength={11}
          maxLength={11}
          value={peselNum}
          placeholder='Numer pesel lub "Nie podano!"'
          onChange={e => setPeselNum(e.target.value)}
          className={styles.input}
        />
      </Form.Group>

      <Form.Group className={styles.inputGroup}>
        <Form.Label className={styles.label}>Priorytet:</Form.Label>
        <Form.Select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className={styles.select}
        >
          <option value="">Wybierz</option>
          <option value="high">Pilny</option>
          <option value="normal">Zwykły</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className={styles.inputGroup}>
        <Form.Label className={styles.label}>Wiek:</Form.Label>
        <Form.Control
          type="number"
          min={0}
          max={120}
          value={age}
          onChange={e => setAge(e.target.value)}
          className={styles.input}
        />
      </Form.Group>

      <div className={styles.buttonWrapper}>
        <Button type="submit" className={styles.button}>
          Zapisz zmiany
        </Button>
      </div>
    </Form>
  );
};

export default EditPatient;