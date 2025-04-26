import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// IMAGES
import finchSplash from "../../assets/Finch welcoming.png";

// APIs
import * as usersAPI from "../../utilities/users-api";

export default function HomePage({ user, setUser }) {
  const navigate = useNavigate();
  const initialState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialState);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleLogin(evt) {
    evt.preventDefault();
    const loggedInUser = await usersAPI.login(formData);
    if (loggedInUser) {
      setUser(loggedInUser);
      navigate("/finches");
    } else {
      alert("Invalid username or password");
      setUser(null);
    }
  }

  return (
    <>
      <section className="logo-container">
        <div className="home-finch-container">
          <img src={finchSplash} alt="The Finch Collector" />
        </div>
      </section>

      {!user && (
        <section>
          <form onSubmit={handleLogin} className="form-container-login">
            <h1 id="login" >Login</h1>
            <p>
              <label htmlFor="id_username">Username:</label>
              <input
                value={formData.username}
                type="text"
                name="username"
                maxLength="150"
                required
                id="id_username"
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="id_password">Password:</label>
              <input
                value={formData.password}
                type="password"
                name="password"
                required
                id="id_password"
                onChange={handleChange}
              />
            </p>
            <button type="submit" className="btn submit">Go</button>
          </form>
        </section>
      )}
    </>
  );
}
