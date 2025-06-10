import { API_URL } from '../../../config';
import { useEffect } from 'react';
import styles from './AllPatients.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPatients, updatePatients } from '../../../redux/patientsRedux';

const AllPatients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      method: 'GET',
    };

    fetch(`${API_URL}/allPatients`, options)
      .then((res) => res.json())
      .then((data) => dispatch(updatePatients(data)));
  }, [dispatch]);

  const patients = useSelector(getAllPatients);

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
          <button className={styles.readMoreButton}>Read more</button>
        </div>
      ))}
    </div>
  );
};

export default AllPatients;