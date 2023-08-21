import React, { useState } from "react";
import { loginUser } from "../features/registerPage/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData)=>({...prevFormData, [name]:value}))
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Dispatch the loginUser action with the form data
      await dispatch(loginUser(formData)); // Assuming you have `dispatch` available

      navigate("/homepage");
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="loginPage">
      <form>
        <fieldset>
          <h1 id="registerTitle">Login User</h1>
          <div className="form-group">
            <label htmlFor="email" className="form-label mt-4">
              Email Id
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Email Id"
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password" className="form-label mt-4">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="Password"
              placeholder="Password"
              onChange={handleInputChange}
              name="password"
            />
          </div>
          <button id="registerBtn" type="submit" className="btn btn-primary" onClick={handleLogin}>
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginPage;
