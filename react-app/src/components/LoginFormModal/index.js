import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { getMatches } from "../../store/match";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      dispatch(getMatches())
    }
  };

  return (
    <>
      <div className="loginWindow">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className="login-main">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="login-buttons">
            <button type="submit">Log In</button>
            <button onClick={() => (
              setEmail('demo@aa.io'),
              setPassword('password')
            )
            }>Demo User</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
