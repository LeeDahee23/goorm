import React from 'react';
import { database } from '../firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const history = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(database, email, password).then((data) => {
      console.log(data, 'authData');
      history('/products');
    });
  };

  return (
    <>
      <div className="container w-25 m-auto my-5">
        <form className="w-200" onSubmit={handleLogin}>
          <h1 className="mb-3 fw-normal text-center">로그인</h1>

          <div className="form-floating my-2">
            <input
              type="email"
              className="form-control"
              name="email"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name="password"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2 my-4" type="submit">
            로그인
          </button>
          <div>
            <p className="text-center">
              계정이 없습니까? <a href="#">가입하기</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
