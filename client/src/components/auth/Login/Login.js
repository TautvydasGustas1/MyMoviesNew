import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, clearUserState } from "../../../actions/auth";
import { Redirect } from "react-router-dom";

const Login = ({ isAuthenticated, login, errors, clearUserState }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  useEffect(() => {
    return () => {
      //on unmount clear user state
      clearUserState();
    };
  }, [clearUserState]);

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="card p-0 col-lg-6 col-md-10 col m-auto">
      <div className="card-header">Log in</div>
      <ul className="list-group list-group-flush">
        {isAuthenticated === false &&
          errors !== null &&
          errors.map((error, index) => (
            <li key={index} className="list-group-item bg-danger">
              {error.msg}
            </li>
          ))}
      </ul>
      <div className="card-body">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Email Adress"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <div className="invalid-feedback">Please enter valid email</div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <div className="invalid-feedback">Please enter password</div>
          </div>
          <div className="button-container text-center">
            <button type="submit" className="btn btn-block btn-success">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.array,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { login, clearUserState })(Login);
