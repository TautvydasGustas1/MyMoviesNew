import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register, clearUserState } from "../../../actions/auth";
import { Redirect } from "react-router-dom";

const Register = ({ isAuthenticated, register, errors, clearUserState }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  //custom hook?
  useEffect(() => {
    return () => {
      //on unmount clear user state
      clearUserState();
    };
  }, [clearUserState]);

  const [passwordMatch, setPasswordMatch] = useState(true);

  const { email, username, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      register(email, username, password);
    } else {
      setPasswordMatch(false);
    }
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="card p-0 col-lg-6 col-md-10 col m-auto">
      <div className="card-header">Register</div>
      <ul className="list-group list-group-flush">
        {isAuthenticated === false &&
          errors.map((error, index) => (
            <li key={index} className="list-group-item bg-danger">
              {error.msg}
            </li>
          ))}
        {!passwordMatch && (
          <li className="list-group-item bg-danger">Passwords do not match</li>
        )}
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
              required
            />
            <div className="invalid-feedback">Please enter valid email</div>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => onChange(e)}
              required
            />
            <div className="invalid-feedback">Please enter valid Username</div>
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
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
            <div className="invalid-feedback">Please enter password</div>
          </div>
          <div className="form-group">
            <label>Repeat password</label>
            <input
              type="password"
              name="password2"
              id="password2"
              className="form-control"
              placeholder="Repeat password"
              autoComplete="off"
              minLength="6"
              value={password2}
              onChange={(e) => onChange(e)}
            />
            <div className="invalid-feedback">Please enter password</div>
          </div>
          <div className="button-container text-center">
            <button type="submit" className="btn btn-block btn-success">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.array,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { register, clearUserState })(Register);
