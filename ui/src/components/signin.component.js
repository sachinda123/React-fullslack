import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { signup } from "../actions/signupActions";

const Signin = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, error } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const form = useRef();
  const checkBtn = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handlesignin = (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError("Password mismatch");
      setLoading(false);
    }
    dispatch(signup(firstName, lastName, email, password));

    console.log("handlesignin");
    // setLoading(true);
    // form.current.validateAll();
    // if (checkBtn.current.context._errors.length === 0) {
    //   dispatch(login(username, password))
    //     .then(() => {
    //       setLoading(false);
    //     })
    //     .catch(() => {
    //       setLoading(false);
    //     });
    // } else {
    //   setLoading(false);
    // }
  };
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="card card-container login">
      <div className="form-group">
        <label htmlFor="username">Sign Up </label>
      </div>
      <Form onSubmit={handlesignin} ref={form}>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <Input
            type="text"
            className="form-control"
            name="firstname"
            value={firstName}
            required
            onChange={(e) => {
              setFirstName(e.target.value);
              if (localError) {
                setLocalError("");
              }
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Last Name</label>
          <Input
            type="text"
            className="form-control"
            name="lastName"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (localError) {
                setLocalError("");
              }
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Email</label>
          <Input
            type="email"
            className="form-control"
            name="email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
              if (localError) {
                setLocalError("");
              }
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            className="form-control"
            name="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (localError) {
                setLocalError("");
              }
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <Input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (localError) {
                setLocalError("");
              }
            }}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-secondary btn-block signbtn" disabled={loading ? true : false}>
            {loading ? (
              <div className="spinner-border text-dark" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </div>

        {(error || localError) && (
          <span class="badge bg-danger">
            {error?.message}
            {localError}
          </span>
        )}

        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
};

export default Signin;
