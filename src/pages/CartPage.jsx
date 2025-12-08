import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, deleteItem } from '../store/actions';
import PrimaryButton from '../components/UI/PrimaryButton';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const addItemHandler = (item) => {
    dispatch(addItem({ 
        id: item.id, 
        price: item.price,
        title: item.title,
        variant: item.variant 
    })); 
  };

  const removeItemHandler = (id) => {
    dispatch(removeItem(id));
  };

  const deleteItemHandler = (id) => {
    dispatch(deleteItem(id));
  };

  if (cartItems.length === 0) {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Your Cart is Empty</h2>
            <p>Add some tickets to continue.</p>
            <div style={{ marginTop: '20px' }}>
                <PrimaryButton onClick={() => navigate('/catalog')}>
                    Go to Catalog
                </PrimaryButton>
            </div>
        </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        Shopping Cart ({totalQuantity} items)
      </h2>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map((item) => (
          <li key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              borderBottom: '1px solid #eee', 
              padding: '20px 0' 
          }}>
            <div style={{ width: '40%' }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{item.title}</h3> 
              <p style={{ margin: 0, color: '#666' }}>
                  ${item.price} x {item.quantity}
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button 
                onClick={() => removeItemHandler(item.id)}
                style={{ width: '30px', height: '30px', cursor: 'pointer' }}
              >-</button>
              
              <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
              
              <button 
                onClick={() => addItemHandler(item)}
                style={{ width: '30px', height: '30px', cursor: 'pointer' }}
              >+</button>
            </div>

            <div style={{ textAlign: 'right', minWidth: '100px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>${item.totalPrice}</p>
                <button 
                    onClick={() => deleteItemHandler(item.id)}
                    style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    Remove
                </button>
            </div>
          </li>
        ))}
      </ul>


      <div style={{ textAlign: 'right', marginTop: '30px', borderTop: '2px solid #333', paddingTop: '20px' }}>
        <h2 style={{ margin: '0 0 20px 0' }}>Total Amount: ${totalAmount}</h2>
        <PrimaryButton onClick={() => navigate('/checkout')}>
            Proceed to Checkout
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CartPage;