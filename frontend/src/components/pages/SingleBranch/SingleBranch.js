import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllAttributions } from "../../../redux/attributionsRedux";
import styles from './SingleBranch.module.scss'; 
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getUser } from "../../../redux/userRedux";

const SingleBranch = () => {

  const { id } = useParams(); 
  const attributions = useSelector(getAllAttributions); 
  const user = useSelector(getUser);

  const branchAttributions = attributions.filter(attr => attr.idBranch === id);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {branchAttributions.map(attr => (
          <div key={attr._id} className={styles.card}>
            <p><strong>Id karty przypisania:</strong> {attr._id}</p>
            <p><strong>Id pacjenta: </strong> {attr.idPatient}</p>
            <p><strong>Data przypisania:</strong> {attr.date}</p>
            <Link to={`/attribution/${attr._id}`} className={styles.readMoreButton}>
              Pokaż Więcej
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleBranch;
