import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';
import { API_URL } from '../../../config';
import styles from './Users.module.scss';  
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const loggedUser = useSelector(getUser);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/users`, { method: 'GET' });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Fetch users failed', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (!loggedUser || loggedUser.role !== 'Admin') {
    return <p className={styles.loadingText}>Nie jesteś autoryzowany do wyświetlania tej strony.</p>;
  }

  if (loading) {
    return <p className={styles.loadingText}>Loading users...</p>;
  }

  const filteredUsers = users.filter(user => user._id !== loggedUser.id);

  if (filteredUsers.length === 0) {
    return <p className={styles.loadingText}>Brak innych użytkowników.</p>;
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tego użytkownika?')) return;

    try {
      const response = await fetch(`${API_URL}/auth/userremove/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        navigate('/home');
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className={styles.usersContainer}>
      {filteredUsers.map(user => (
        <div key={user._id} className={styles.userCard}>
          <p><strong>Imię:</strong> {user.firstName}</p>
          <p><strong>Nazwisko:</strong> {user.lastName}</p>
          <p><strong>Login:</strong> {user.login}</p>
          <p><strong>Rola:</strong> {user.role}</p>
          <button
            className={styles.buttonRed}
            onClick={() => handleDelete(user._id)}
          >
            Usuń
          </button>
        </div>
      ))}
    </div>
  );
};

export default Users;