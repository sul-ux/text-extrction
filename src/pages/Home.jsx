import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [medicines, setMedicines] = useState([]);

  const loadData = async () => {
    const querySnapshot = await getDocs(collection(db, 'medicines'));
    const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setMedicines(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="home">
      <h1>Medicine Expiry Tracker</h1>
      <Link to="/scan"><button>Scan New Medicine</button></Link>
      <ul>
        {medicines.map(med => (
          <li key={med.id} style={{ color: med.isExpired ? 'red' : 'green' }}>
            {med.medicineName || 'Unnamed'} - Expires: {med.expiryDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
