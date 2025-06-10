import styles from './Home.module.scss';
import { API_URL } from '../../../config';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getHospitals, getHospitalById, loadHosp } from '../../../redux/hospitalsRedux';
import { getBranches, loadBranches } from '../../../redux/branchesRedux';

const Home = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    const options = {
      method: 'GET'
    };

    fetch(`${API_URL}/branches`, options)
      .then(res => res.json())
      .then(data => dispatch(loadBranches(data)));

    fetch(`${API_URL}/hospitals`, options)
      .then(res => res.json())
      .then(data => dispatch(loadHosp(data)));
  }, [dispatch]);

  const hospitals = useSelector(getHospitals);
  const branches = useSelector(getBranches);

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
        <button className={styles.actionButton}>Baza kart przypisań</button>
      </section>

      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>Szpitale</h1>
        <div className={styles.cardsGrid}>
          {hospitals.map(hospital => (
            <div key={hospital.id} className={styles.hospitalCard}>
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
              <div key={branch.id} className={styles.branchCard}>
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