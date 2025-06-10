import { useParams, Link } from "react-router-dom";
import { getAllAttributions, getAttributionById } from "../../../redux/attributionsRedux";
import { getHospitals, getHospitalById } from "../../../redux/hospitalsRedux";
import { getBranches, getBranchesById } from "../../../redux/branchesRedux";
import { getAllPatients, getPatientById } from "../../../redux/patientsRedux";
import { useSelector } from "react-redux";
import styles from './SingleAttribution.module.scss';

const SingleAttribution = () => {

  const { id } = useParams();

  const attributions = useSelector(getAllAttributions);
  const attribution = getAttributionById({ attributions }, id);

  const hospitals = useSelector(getHospitals);
  const branches = useSelector(getBranches);
  const patients = useSelector(getAllPatients);

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
        <button className={styles.buttonRed}>Usuń</button>
      </div>
    </div>
  );
}

export default SingleAttribution;