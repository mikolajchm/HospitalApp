import styles from './Home.module.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { updatePatients } from '../../../redux/patientsRedux';
import { updateAttributions } from '../../../redux/attributionsRedux';
import { useSelector } from 'react-redux';
import { getHospitals, getHospitalById } from '../../../redux/hospitalsRedux';
import { getBranches } from '../../../redux/branchesRedux';
import { API_URL } from '../../../config';
import { getUser } from '../../../redux/userRedux'; 

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser); 
  const hospitals = useSelector(getHospitals);
  const branches = useSelector(getBranches);

  useEffect(() => {
    const options = { method: 'GET' };

    fetch(`${API_URL}/allPatients`, options)
      .then((res) => res.json())
      .then((data) => dispatch(updatePatients(data)));

    fetch(`${API_URL}/attributions`, options)
      .then((res) => res.json())
      .then((data) => dispatch(updateAttributions(data)));

  }, [dispatch, navigate]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hospitals || hospitals.length === 0 || !branches || branches.length === 0) {
    return <p className={styles.loadingText}>Loading...</p>;
  }

  return (
    <div className={styles.homeContainer}>
      <section className={styles.actionPanel}>
        <Link to="/addPatient" className={styles.actionButton}>
          Dodaj pacjenta
        </Link>
        <Link to="/addAttribution" className={styles.actionButton}>
          Dodaj kartę przypisania
        </Link>
        <Link to="/allPatients" className={styles.actionButton}>
          Baza pacjentów
        </Link>
        <Link to="/allAttributions" className={styles.actionButton}>
          Baza kart przypisań
        </Link>
      </section>

      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>Szpitale</h1>
        <div className={styles.cardsGrid}>
          {hospitals.map(hospital => (
            <div key={hospital._id} className={styles.hospitalCard}>
              <h2 className={styles.hospitalName}>{hospital.name}</h2>
              <p className={styles.hospitalAddress}>📍Adres: {hospital.address}</p>
              <p className={styles.hospitalPhone}>📞Tel: {hospital.phone}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>Oddziały</h1>
        <div className={styles.cardsGrid}>
          {branches.map(branch => {
            const hospitalNames = branch.idHospitals
              .map(id => {
                const hospital = getHospitalById({ hospitals }, id);
                return hospital ? hospital.name : 'Nieznany szpital';
              });

            return (
              <div key={branch._id} className={styles.branchCard}>
                <h2 className={styles.branchName}>{branch.name}</h2>
                <p className={styles.numOfPlaces}>Ilość miejsc: {branch.numOfPlaces}</p>
                <p className={styles.numOfPlacesUrgent}>Ilość miejsc pilnych: {branch.numOfPlacesUrgent}</p>
                <p className={styles.hospitalNames}>
                  Szpitale: {hospitalNames.join(', ')}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;