import styles from './AllPatients.module.scss';
import { useSelector } from 'react-redux';
import { getAllPatients } from '../../../redux/patientsRedux';
import { Link } from 'react-router-dom';
import { getUser } from '../../../redux/userRedux';
import { Navigate } from 'react-router-dom';

const AllPatients = () => {

  const patients = useSelector(getAllPatients);
  const user = useSelector(getUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!patients || patients.length === 0) {
    return <p className={styles.loadingText}>Loading...</p>;
  }

  return (
    <div className={styles.patientsContainer}>
      {patients.map((patient) => (
        <div key={patient.id} className={styles.patientCard}>
          <h2 className={styles.patientName}>
            {patient.firstName} {patient.lastName}
          </h2>
          <p className={styles.patientPesel}>PESEL: {patient.peselNum}</p>
          <Link to={`/patient/${patient._id}`} className={styles.readMoreButton}>
            Pokaż Więcej
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllPatients;