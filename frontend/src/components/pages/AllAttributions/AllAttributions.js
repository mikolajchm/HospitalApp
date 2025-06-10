import styles from './AllAttributions.module.scss';
import { useSelector } from 'react-redux';
import { getAllAttributions } from '../../../redux/attributionsRedux';
import { getAllPatients, getPatientById } from '../../../redux/patientsRedux';
import { Link } from 'react-router-dom';

const AllAttributions = () => {

  const attributions = useSelector(getAllAttributions);
  const patients = useSelector(getAllPatients); 
  
  if (!attributions || attributions.length === 0 || !patients || patients.length ===0 ) {
    return <p className={styles.loadingText}>Loading...</p>;
  }

  return (
    <div className={styles.attributionsContainer}>
      {attributions.map((attribution) => {
        
        const patient = getPatientById({ patients }, attribution.idPatient);

        return (
          <div key={attribution._id} className={styles.attributionCard}>
            <div className={styles.attributionId}><strong>Numer ID Karty Przypisania:</strong> {attribution._id}</div>
            <div className={styles.patientId}><strong>Numer ID Pacjenta:</strong> {attribution.idPatient}</div>
            <div className={styles.patientName}>
              <strong>Pacjent:</strong> {patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown'}
              <strong>Numer Pesel Pacjenta:</strong><p>{patient.peselNum}</p>
            </div>
            <Link to={`/attribution/${attribution._id}`} className={styles.readMoreButton}>
              Pokaż Więcej
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AllAttributions;