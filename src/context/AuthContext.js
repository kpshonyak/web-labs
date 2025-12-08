import React, { createContext, useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux'; 
import { loadCart, clearCart } from '../store/actions'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('user_email'));
  const dispatch = useDispatch(); 

  const login = (email) => {
    localStorage.setItem('user_email', email);
    setUser(email);

    const personalCart = JSON.parse(localStorage.getItem(`cart_${email}`));
    
    if (personalCart) {
      dispatch(loadCart(personalCart));
    } else {
      dispatch(clearCart());
    }
  };


  const logout = () => {
    localStorage.removeItem('user_email');
    setUser(null);
    dispatch(clearCart());
  };
  

  useEffect(() => {
     if (user) {
        const personalCart = JSON.parse(localStorage.getItem(`cart_${user}`));
        if (personalCart) {
            dispatch(loadCart(personalCart));
        }
     }
  }, [user, dispatch]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);