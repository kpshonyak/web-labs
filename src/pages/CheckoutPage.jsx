import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/actions';
import PrimaryButton from '../components/UI/PrimaryButton';
import FormError from '../components/UI/ErrorMessage'; 

const formContainerStyle = {
  maxWidth: '600px',
  margin: '40px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
};

const inputGroupStyle = {
  marginBottom: '15px',
  textAlign: 'left'
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box'
};

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  
  const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('First Name is required'),
    
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Last Name is required'),

    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),

    phone: Yup.string()
      .matches(/^0\d{9}$/, 'Phone must be 10 digits starting with 0')
      .required('Phone is required'),

    age: Yup.number()
      .typeError('Age must be a number')
      .min(18, 'You must be at least 18 years old')
      .max(99, 'Invalid age')
      .required('Age is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Order submitted:', values);
      dispatch(clearCart());
      navigate('/success');
    },
  });

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Checkout</h2>
      <p>Total Amount: <strong>${totalAmount}</strong></p>

      <div style={formContainerStyle}>
        <form onSubmit={formik.handleSubmit}>
          
          <div style={inputGroupStyle}>
            <label htmlFor="firstName" style={labelStyle}>First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              style={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <FormError message={formik.errors.firstName} />
            )}
          </div>

          <div style={inputGroupStyle}>
            <label htmlFor="lastName" style={labelStyle}>Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              style={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <FormError message={formik.errors.lastName} />
            )}
          </div>

          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              style={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <FormError message={formik.errors.email} />
            )}
          </div>

          <div style={inputGroupStyle}>
            <label htmlFor="phone" style={labelStyle}>Phone (Format: 097xxxxxxx)</label>
            <input
              id="phone"
              name="phone"
              type="text"
              style={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <FormError message={formik.errors.phone} />
            )}
          </div>

          <div style={inputGroupStyle}>
            <label htmlFor="age" style={labelStyle}>Age (18+)</label>
            <input
              id="age"
              name="age"
              type="number"
              style={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age && (
              <FormError message={formik.errors.age} />
            )}
          </div>

          <PrimaryButton 
            type="submit" 
            style={{ width: '100%', marginTop: '20px', fontSize: '1.1em' }}
          >
            Complete Order
          </PrimaryButton>
          
          <button 
            type="button"
            onClick={() => navigate('/cart')}
            style={{ marginTop: '15px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Back to Cart
          </button>

        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;