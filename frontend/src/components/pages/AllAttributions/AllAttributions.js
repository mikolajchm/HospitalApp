import styles from './AllAttributions.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAttributions, deleteAttribution } from '../../../redux/attributionsRedux';
import { getAllPatients, getPatientById } from '../../../redux/patientsRedux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { API_URL } from '../../../config';

const AllAttributions = () => {
  
  const dispatch = useDispatch();
  const attributions = useSelector(getAllAttributions);
  const patients = useSelector(getAllPatients); 

  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  if (!attributions || attributions.length === 0 || !patients || patients.length === 0) {
    return <p className={styles.loadingText}>Loading...</p>;
  }

  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedId(null);
  };

  const handleRemove = () => {
    if (!selectedId) return;

    const options = { method: 'DELETE' };

    fetch(`${API_URL}/attribution/${selectedId}`, options)
      .then(res => {
        if (res.status === 200) {
          dispatch(deleteAttribution(selectedId));
          handleClose();
        } else {
          console.error('Remove failed');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className={styles.attributionsContainer}>
      {attributions.map((attribution) => {
        const patient = getPatientById({ patients }, attribution.idPatient);

        return (
          <div key={attribution._id} className={styles.attributionCard}>
            <div className={styles.attributionId}>
              <strong>Numer ID Karty Przypisania:</strong> {attribution._id}
            </div>

            <div className={styles.patientId}>
              <strong>Numer ID Pacjenta:</strong> {attribution.idPatient}
            </div>

            {patient && (
              <div className={styles.patientInfo}>
                <div className={styles.patientName}>
                  <strong>Pacjent:</strong> {patient.firstName} {patient.lastName}
                </div>
                <div className={styles.patientPesel}>
                  <strong>Numer PESEL Pacjenta:</strong> {patient.peselNum}
                </div>
              </div>
            )}

            <div className={styles.actionButtons}>
              <Link to={`/attribution/${attribution._id}`} className={styles.readMoreButton}>
                Pokaż Więcej
              </Link>

              <button
                className={styles.buttonRed}
                onClick={() => handleShow(attribution._id)}
              >
                Usuń
              </button>
            </div>
          </div>
        );
      })}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Czy jesteś pewien?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ta operacja jest nieodwracalna. Czy chcesz kontynuować?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zamknij
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Usuń
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllAttributions;