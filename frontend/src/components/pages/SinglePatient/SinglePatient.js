import { useParams, Link } from "react-router-dom";
import { getAllPatients, getPatientById, deletePatient } from "../../../redux/patientsRedux";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import styles from './SinglePatient.module.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { API_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

const SinglePatient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const patients = useSelector(getAllPatients);
  const patient = getPatientById({ patients }, id);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = (e) => {
    e.preventDefault(); 
    
    const options = {
      method: 'DELETE'
    };

    fetch(`${API_URL}/patient/${id}`, options)
      .then((res) => {
        if (res.status === 200) {
          setShow(false);
          dispatch(deletePatient(id));
          navigate("/home");
        } else {
          console.log('Remove failed');
        }
      });
  };

  if (!patient) {
    return <p className={styles.loadingText}>Loading patient data...</p>;
  }

  return (
    <div className={styles.patientContainer}>
      <h1 className={styles.patientTitle}>Szczegóły Pacjenta</h1>
      <div className={styles.patientInfo}>
        <p><strong>Imię:</strong> {patient.firstName}</p>
        <p><strong>Nazwisko:</strong> {patient.lastName}</p>
        <p><strong>Wiek:</strong> {patient.age}</p>
        <p><strong>Numer PESEL:</strong> {patient.peselNum}</p>
        <p><strong>Priorytet:</strong> {patient.priority}</p>
        <p>
          <strong>Karta Przypisania:</strong>{' '}
          {patient.attribution ? (
            <Link to={`/attribution/${patient.attribution}`} className={styles.readMoreButton}>
              Pokaż Więcej
            </Link>
          ) : (
            <span>Brak przypisania</span>
          )}
        </p>
        <p><strong>ID Pacjenta:</strong> {patient._id}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.buttonRed} onClick={handleShow}>Usuń z bazy</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>This operation is irreversible. Do you want to proceed?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleRemove}> 
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
        <button className={styles.buttonBlue}>Edytuj</button>
      </div>
    </div>
  );
}

export default SinglePatient;