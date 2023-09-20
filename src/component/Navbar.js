import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { database } from '../firebase.config';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const [isLoggedIn, setIsLoggedIn] = useState(database.currentUser);

  const history = useNavigate();
  const handleSignOut = () => {
    signOut(database)
      .then(() => {
        console.log('logout successful');
      })
      .catch((error) => {
        console.log(error);
      });
    history('/');
  };

  useEffect(() => {
    database.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const ShowSignIn = () => {
    return (
      <>
        <NavLink to="/" className="btn ms-2" aria-label="logout button">
          <i className="fa fa-sign-in"></i>
        </NavLink>
      </>
    );
  };

  const ShowSignOut = () => {
    return (
      <>
        <button
          onClick={handleSignOut}
          className="btn ms-2"
          aria-label="logout button"
        >
          <i className="fa fa-sign-out"></i>
        </button>
      </>
    );
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4" to="/products">
            Shop
          </NavLink>
          <div className="buttons">
            <NavLink to="/cart" className="btn" aria-label="cart button">
              <i className="fa fa-shopping-cart"></i>{' '}
              <span className="badge bg-primary rounded-pill">
                {state.length}
              </span>
            </NavLink>
            <NavLink to="" className="btn ms-2" aria-label="user button">
              <i className="fa fa-user"></i>
            </NavLink>
            {isLoggedIn ? <ShowSignOut /> : <ShowSignIn />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
