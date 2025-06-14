import { useParams, Link } from "react-router-dom";
import { getAllAttributions, getAttributionById, deleteAttribution } from "../../../redux/attributionsRedux";
import { getHospitals, getHospitalById } from "../../../redux/hospitalsRedux";
import { getBranches, getBranchesById } from "../../../redux/branchesRedux";
import { getAllPatients, getPatientById } from "../../../redux/patientsRedux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './SingleAttribution.module.scss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { API_URL } from '../../../config';


const SingleAttribution = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const attributions = useSelector(getAllAttributions);
  const attribution = getAttributionById({ attributions }, id);

  const hospitals = useSelector(getHospitals);
  const branches = useSelector(getBranches);
  const patients = useSelector(getAllPatients);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = (e) => {
    e.preventDefault(); 

    const options = { method: 'DELETE' };

    fetch(`${API_URL}/attribution/${id}`, options)
      .then(res => {
        if (res.status === 200) {
          setShow(false);
          dispatch(deleteAttribution(id));
          navigate("/home");
        } else {
          console.error('Remove failed');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const hospital = getHospitalById({ hospitals }, attribution.idHospital);
  const branch = getBranchesById({ branches }, attribution.idBranch);
  const patient = getPatientById({ patients }, attribution.idPatient);

  if (!attribution || !hospital || !branch || !patient) {
    return <p className={styles.loadingText}>Loading attribution data...</p>;
  }

  return (
    <div className={styles.attributionContainer}>
      <h1 className={styles.attributionTitle}>Szczegóły Karty Przypisania</h1>
      <div className={styles.attributionInfo}>
        <p><strong>ID Karty Przypisania:</strong> {attribution._id}</p>
        <p>
          <strong>Pacjent:</strong> {patient.firstName} {patient.lastName}
          {' '}
          <Link to={`/patient/${patient._id}`} className={styles.readMoreButton}>
            Pokaż Pacjenta
          </Link>
        </p>
        <p><strong>Szpital:</strong> {hospital.name}</p>
        <p><strong>Oddział:</strong> {branch.name}</p>
        <p><strong>ID Lekarza:</strong> {attribution.idDoctor}</p>
        <p><strong>Data:</strong> {attribution.date}</p>
        <p><strong>Stan Pacjenta:</strong> {attribution.condition}</p>
        <p><strong>Opis:</strong> {attribution.description}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <Link to={`/editAttribution/${attribution._id}`} className={styles.buttonGreen}>
          Edytuj
        </Link>
        <button className={styles.buttonRed} onClick={handleShow} >
          Usuń
        </button>
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
    </div>
  );
}

export default SingleAttribution;