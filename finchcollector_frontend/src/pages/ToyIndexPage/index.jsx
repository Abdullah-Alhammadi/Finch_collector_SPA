// IMPORTS
import "./styles.css";
import { useState, useEffect } from "react";
import { Link } from "react-router";

// APIs
import * as toyAPI from "../../utilities/toy-api";

export default function ToyIndexPage() {
  const [allToys, setAllToys] = useState([]);

  useEffect(() => {
    async function getAllToys() {
      try {
        const toys = await toyAPI.index();
        console.log("All Toys Fetched:", toys);
        setAllToys(toys);
      } catch (err) {
        console.error("Error fetching toys:", err);
        setAllToys([]);
      }
    }
    getAllToys();
  }, []);

  return (
    <>
      <section className="page-header">
        <h1>All Finch Toys</h1>
      </section>

      <section className="toy-index-card-container">
        {allToys.map((toy) => (
          toy.id && (
            <div key={toy.id} className="toy-index-card" style={{ borderColor: toy.color }}>
              <div className="toy-index-card-bg" style={{ backgroundColor: toy.color }}></div>
              <Link to={`/toys/${toy.id}`}>
                <div className="toy-index-card-content">
                  <h2>{toy.name}</h2>
                  {/* <p>A {toy.color} toy</p> */}
                </div>
              </Link>
            </div>
          )
        ))}
      </section>
    </>
  );
}
