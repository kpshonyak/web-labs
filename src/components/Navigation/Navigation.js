import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { useSelector } from 'react-redux';

const Navigation = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  
  const location = useLocation();

  const getActiveClassName = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav style={{ padding: '20px', background: '#333', color: 'white', marginBottom: '20px' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
        
        
        <li>
            <Link 
                to="/" 
                className={getActiveClassName('/')}
                style={{ color: 'white', textDecoration: 'none' }}
            >
                Home
            </Link>
        </li>

        <li>
            <Link 
                to="/catalog" 
                className={getActiveClassName('/catalog')} 
                style={{ color: 'white', textDecoration: 'none' }}
            >
                Catalog
            </Link>
        </li>
        
        <li>
            <Link 
                to="/cart" 
                className={getActiveClassName('/cart')}
                style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
            >
                Cart 
                {totalQuantity > 0 && (
                    <span style={{ 
                        marginLeft: '8px', 
                        background: 'red', 
                        color: 'white', 
                        padding: '2px 8px', 
                        borderRadius: '10px', 
                        fontSize: '0.8em' 
                    }}>
                        {totalQuantity}
                    </span>
                )}
            </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;