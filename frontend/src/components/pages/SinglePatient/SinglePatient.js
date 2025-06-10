import { useParams, Link } from "react-router-dom";
import { getAllPatients, getPatientById } from "../../../redux/patientsRedux";
import { useSelector } from "react-redux";
import styles from './SinglePatient.module.scss';

const SinglePatient = () => {
  const { id } = useParams();
  const patients = useSelector(getAllPatients);
  const patient = getPatientById({ patients }, id);

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
          <Link to={`/attribution/${patient.attribution}`} className={styles.readMoreButton}>
            Pokaż Więcej
          </Link>
        </p>
        <p><strong>ID Pacjenta:</strong> {patient._id}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.buttonRed}>A</button>
        <button className={styles.buttonBlue}>B</button>
      </div>
    </div>
  );
}

export default SinglePatient;