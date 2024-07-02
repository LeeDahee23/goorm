import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { delItem } from '../redux/action/index';
import { NavLink } from 'react-router-dom';

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const handleClose = (item) => {
    dispatch(delItem(item));
  };

  let total = 0;
  const cartItems = (cartItem) => {
    total += cartItem.price;
    return (
      <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
        <div className="container py-4">
          <button
            onClick={() => handleClose(cartItem)}
            className="btn-close float-end"
            aria-label="Close"
          ></button>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <img
                src={cartItem.image}
                alt={cartItem.title}
                height="200px"
                width="180px"
              />
            </div>
            <div className="col-md-4">
              <h3>{cartItem.title}</h3>
              <p className="lead fw-bold">${cartItem.price}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>장바구니가 비어있습니다.</h3>
          </div>
        </div>
      </div>
    );
  };

  const button = () => {
    return (
      <NavLink
        to="/checkout"
        className="btn btn-outline-primary text-center align-self-center px-3 py-3 "
      >
        계산하기
      </NavLink>
    );
  };

  return (
    <>
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(cartItems)}
      <div className="container my-3 px-5 d-flex float-right">
        <div className="mx-4 px-4 py-2 fs-2 text-center justify-content-between bg-warning">
          <span>합계: </span>
          <strong>${total}</strong>
        </div>
        {state.length !== 0 && button()}
      </div>
    </>
  );
};

export default Cart;
