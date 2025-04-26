import "./App.css";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import HomePage from "../HomePage/index";
import AboutPage from "../AboutPage";
import FinchIndexPage from "../FinchIndexPage";
import FinchDetailPage from "../FinchDetailPage";
import FinchFormPage from "../FinchFormPage";
import ToyIndexPage from "../ToyIndexPage";
import ToyDetailPage from "../ToyDetailPage";
import ToyFormPage from "../ToyFormPage";
import SignupPage from "../SignUpPage/SignUpPage";
import Navbar from "../../components/NavBar/NavBar";

// Utilities
import { getUser } from "../../utilities/users-api";

export default function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function verifyUser() {
      const user = await getUser();
      setUser(user);
    }
    verifyUser();
  }, []);

  const routes = ["about", "finches", "toys", "home"];
  const mainCSS = routes
    .filter((r) => location.pathname.includes(r))
    .join(" ");

  const isAboutPage = location.pathname === "/about";

  return (
    <>
      {!isAboutPage && (
        <header>
          <Link to="/" className="logo-text">Finch Collector</Link>
          <nav>
            <ul>
              <Navbar user={user} setUser={setUser} />
            </ul>
          </nav>
        </header>
      )}

      <main className={mainCSS}>
        <Routes>
          <Route path="/home" element={<HomePage user={user} setUser={setUser} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<SignupPage setUser={setUser} />} />
          <Route path="/finches" element={<FinchIndexPage />} />
          <Route path="/finches/new" element={<FinchFormPage createFinch={true} />} />
          <Route path="/finches/edit/:id" element={<FinchFormPage editFinch={true} />} />
          <Route path="/finches/confirm_delete/:id" element={<FinchFormPage deleteFinch={true} />} />
          <Route path="/finches/:id" element={<FinchDetailPage />} />
          <Route path="/toys" element={<ToyIndexPage />} />
          <Route path="/toys/new" element={<ToyFormPage createToy={true} />} />
          <Route path="/toys/edit/:id" element={<ToyFormPage editToy={true} />} />
          <Route path="/toys/confirm_delete/:id" element={<ToyFormPage deleteToy={true} />} />
          <Route path="/toys/:id" element={<ToyDetailPage />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </>
  );
}
