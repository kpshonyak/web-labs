import React from 'react';
import PrimaryButton from '../components/UI/PrimaryButton';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ color: '#28a745', fontSize: '3em' }}>Success!</h1>
      <p style={{ fontSize: '1.5em', margin: '20px 0' }}>
        Your order has been placed successfully.
      </p>
      <p>Thank you for choosing our service.</p>
      
      <div style={{ marginTop: '40px' }}>
        <PrimaryButton onClick={() => navigate('/catalog')}>
            Back to Catalog
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SuccessPage;