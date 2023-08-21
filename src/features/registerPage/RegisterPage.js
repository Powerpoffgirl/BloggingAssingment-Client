import React, { useState } from "react";
import "../../Styles.css";
import { useDispatch } from "react-redux"; // Import useDispatch
import { registerUser } from "./userSlice"; 
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch(); // Initialize useDispatch
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  // const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add new user
      const newUser = {
        ...user,
      };

      // Dispatch the registerUser action with the new user data
      await dispatch(registerUser(newUser)); // Dispatch the action and wait for it

      navigate("/login")
      // Reset form
      setUser({
        name: "",
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };
  
  console.log("user", user);
  // console.log("users", users);


  return (
    <div className="registerPage">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h1 id="registerTitle">Register User</h1>
          <div class="form-group">
            <label for="name" class="form-label mt-4">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              value={user.name}
              placeholder="Name"
              onChange={handleChange}
            />
          </div>
          <div class="form-group">
            <label for="username" class="form-label mt-4">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="Username"
              onChange={handleChange}
              name="username"
              value={user.username}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1" class="form-label mt-4">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={handleChange}
              name="email"
              value={user.email}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1" class="form-label mt-4">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={user.password}
            />
          </div>
          <button id="registerBtn" type="submit" class="btn btn-primary">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterPage;
