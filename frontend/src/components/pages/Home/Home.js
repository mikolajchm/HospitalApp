import styles from './Home.module.scss';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getHospitals, getHospitalById } from '../../../redux/hospitalsRedux';
import { getBranches } from '../../../redux/branchesRedux';
import { getUser } from '../../../redux/userRedux'; 

const Home = () => {

  const user = useSelector(getUser); 
  const hospitals = useSelector(getHospitals);
  const branches = useSelector(getBranches);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hospitals || hospitals.length === 0 || !branches || branches.length === 0) {
    return <p className={styles.loadingText}>Loading...</p>;
  }

  return (
    <div className={styles.homeContainer}>
      <section className={styles.actionPanel}>
        <button className={styles.actionButton}>Dodaj pacjenta</button>
        <button className={styles.actionButton}>Dodaj kartę przypisania</button>
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