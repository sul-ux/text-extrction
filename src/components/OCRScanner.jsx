// src/components/OCRScanner.jsx
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

export default function OCRScanner() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [expired, setExpired] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));

    Tesseract.recognize(file, 'eng')
      .then(({ data: { text } }) => {
        setText(text);
        checkExpiry(text);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to process image.');
      });
  };

  const checkExpiry = (text) => {
    const dateRegex = /\b(\d{2}\/\d{2}\/\d{4})\b/g; // e.g., 12/09/2024
    const matches = [...text.matchAll(dateRegex)];

    if (matches.length > 0) {
      const lastDate = matches[matches.length - 1][0];
      const [day, month, year] = lastDate.split('/');
      const expiryDate = new Date(`${year}-${month}-${day}`);
      const today = new Date();

      setExpired(expiryDate < today);
    } else {
      setExpired(null);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📦 Expired Medicine Alert</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Preview" style={{ width: 200, marginTop: 10 }} />}
      <div style={{ marginTop: 20 }}>
        <h4>Extracted Text:</h4>
        <pre>{text}</pre>
      </div>
      {expired !== null && (
        <h3 style={{ color: expired ? 'red' : 'green' }}>
          {expired ? '⚠️ Medicine is EXPIRED' : '✅ Medicine is NOT expired'}
        </h3>
      )}
    </div>
  );
}
