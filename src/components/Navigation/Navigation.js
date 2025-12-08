import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext'; // <--- Імпорт Auth

const Navigation = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // <--- Дістаємо user і logout

  const getActiveClassName = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Якщо користувача немає (ми на сторінці логіну), можна приховати меню
  // або показувати тільки базові посилання. 
  // Але за завданням, захищені сторінки недоступні, тому меню можна залишити
  // або змінити логіку. Тут я покажу повне меню тільки якщо є юзер.
  
  if (!user) {
    return (
        <nav style={{ padding: '20px', background: '#333', color: 'white', marginBottom: '20px', textAlign: 'center' }}>
            <span style={{fontWeight: 'bold'}}>Welcome to Cinema</span>
        </nav>
    );
  }

  return (
    <nav style={{ padding: '20px', background: '#333', color: 'white', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
        <li><Link to="/" className={getActiveClassName('/')} style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/catalog" className={getActiveClassName('/catalog')} style={{ color: 'white', textDecoration: 'none' }}>Catalog</Link></li>
        <li>
            <Link to="/cart" className={getActiveClassName('/cart')} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                Cart 
                {totalQuantity > 0 && (
                    <span style={{ marginLeft: '8px', background: 'red', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8em' }}>
                        {totalQuantity}
                    </span>
                )}
            </Link>
        </li>
      </ul>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <span>Hello, {user}</span>
        <button 
            onClick={handleLogout} 
            style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
        >
            Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navigation;