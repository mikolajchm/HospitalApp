import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router';
import Spinner from 'react-bootstrap/Spinner';
import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import styles from './AddAttribution.module.scss';
import { useSelector } from 'react-redux';
import { getAllPatients } from '../../../redux/patientsRedux';
import { getHospitals } from '../../../redux/hospitalsRedux';
import { getBranches } from '../../../redux/branchesRedux';
import { getUser } from '../../../redux/userRedux';

const AddAttribution = () => {
  const navigate = useNavigate();

  const patients = useSelector(getAllPatients);
  const hospitals = useSelector(getHospitals);
  const branches = useSelector(getBranches);
  const user = useSelector(getUser);

  const [idPatient, setIdPatient] = useState('');
  const [idHospital, setIdHospital] = useState('');
  const [idBranch, setIdBranch] = useState('');
  const [idDoctor, setIdDoctor] = useState(user.id);
  const [date, setDate] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
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
    if (!idPatient || !idHospital || !idBranch || !idDoctor || !date || !condition || !description) {
      setStatus('danger');
      return;
    }

    const payload = { idPatient, idHospital, idBranch, idDoctor, date, condition, description };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    setStatus('loading');
    fetch(`${API_URL}/attribution`, options)
      .then(res => {
        if (res.status === 201) setStatus('success');
        else setStatus('danger');
      })
      .catch(() => setStatus('serverError'));
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <Form onSubmit={handleSubmit} className={styles.formWrapper}>
      <h1 className={styles.heading}>Nowe przypisanie</h1>

      {status === 'success' && <Alert variant="success" className={styles.alert}>Dodano przypisanie!</Alert>}
      {status === 'danger' && <Alert variant="danger" className={styles.alert}>Uzupełnij wszystkie pola.</Alert>}
      {status === 'serverError' && <Alert variant="danger" className={styles.alert}>Błąd serwera – spróbuj ponownie.</Alert>}
      {status === 'loading' && <div className={styles.spinner}><Spinner animation="border" /></div>}

      <Form.Group className={styles.inputGroup}>
        <Form.Label>Pacjent:</Form.Label>
        <Form.Select value={idPatient} onChange={e => setIdPatient(e.target.value)}>
          <option value=''>Wybierz pacjenta</option>
          {patients.map(p => (
            <option key={p._id} value={p._id}>{`${p.firstName} ${p.lastName} (${p.peselNum})`}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className={styles.inputGroup}>
        <Form.Label>Szpital:</Form.Label>
        <Form.Select value={idHospital} onChange={e => setIdHospital(e.target.value)}>
          <option value=''>Wybierz szpital</option>
          {hospitals.map(h => (
            <option key={h._id} value={h._id}>{h.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className={styles.inputGroup}>
        <Form.Label>Oddział:</Form.Label>
        <Form.Select value={idBranch} onChange={e => setIdBranch(e.target.value)}>
          <option value=''>Wybierz oddział</option>
          {branches.map(b => (
            <option key={b._id} value={b._id}>{b.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className={styles.inputGroup}>
        <Form.Label>Data przyjęcia:</Form.Label>
        <Form.Control
          type="date"
          value={date}
          min={minDate}
          onChange={e => setDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group className={styles.inputGroup}>
        <Form.Label>Stan pacjenta:</Form.Label>
        <Form.Control
          type="text"
          value={condition}
          onChange={e => setCondition(e.target.value)}
        />
      </Form.Group>

      <Form.Group className={styles.inputGroup}>
        <Form.Label>Opis:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Form.Group>

      <div className={styles.buttonWrapper}>
        <Button type="submit" className={styles.button}>Dodaj przypisanie</Button>
      </div>
    </Form>
  );
};

export default AddAttribution;
