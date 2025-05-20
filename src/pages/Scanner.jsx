import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { db } from '../firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Scanner() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setLoading(true);

    const result = await Tesseract.recognize(file, 'eng');
    const rawText = result.data.text;
    setText(rawText);
    setLoading(false);
  };

  const saveMedicine = async () => {
    const match = text.match(/(exp|expiry|expires).*?(\d{2}\/\d{2}\/\d{4})/i);
    const expiryDate = match ? match[2] : 'Unknown';

    const parts = expiryDate.split('/');
    const expDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    const isExpired = expDate < new Date();

    await addDoc(collection(db, 'medicines'), {
      medicineName: 'Unnamed',
      expiryDate,
      scannedDate: new Date().toISOString().split('T')[0],
      isExpired,
    });

    navigate('/');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Medicine Image</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {loading && <p>Processing OCR...</p>}
      {image && <img src={image} alt="preview" style={{ maxWidth: '300px' }} />}
      <pre>{text}</pre>
      {text && <button onClick={saveMedicine}>Save</button>}
    </div>
  );
}
