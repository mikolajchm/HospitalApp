import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
    };

    fetch(`${API_URL}/auth/logout`, options)
      .then(() => {
          dispatch(logOut());
          navigate('/login');
        })
  }, [dispatch, navigate]);

  return null;
};

export default Logout;