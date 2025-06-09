import styles from './Home.module.scss';
import { API_URL } from '../../../config';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getHospitals, loadHosp } from '../../../redux/hospitalsRedux';
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

  return (
    <div> 
      <h1>home</h1>
    </div>
  )
}

export default Home;