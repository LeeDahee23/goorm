import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Checkout = () => {
  return (
    <>
      <div className="container my-5 text-center">
        <h1 className="py-3">Cart가 비어있습니다.</h1>
        <p>Cart에 상품을 넣어주세요</p>
        <NavLink to="/products" className="btn btn-outline-dark">
          계속 쇼핑하기
        </NavLink>
      </div>
    </>
  );
};

export default Checkout;
