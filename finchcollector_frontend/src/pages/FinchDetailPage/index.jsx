import "./styles.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as finchAPI from "../../utilities/finch-api";
import * as feedingAPI from "../../utilities/feeding-api";
import FeedingForm from "../../components/Forms/FeedingForm";
import DisplayToys from "../../components/DisplayToys/DisplayToys";
import AddPhotoForm from "../../components/Forms/AddPhotoForm";
import { closest } from "color-2-name";
import finchFly from "../../assets/finch_fly.png";

const MEALS = {
  B: "Breakfast",
  L: "Lunch",
  D: "Dinner",
};

export default function FinchDetailPage() {
  const [finchDetail, setFinchDetail] = useState(null);
  const [finchFeedings, setFinchFeedings] = useState([]);
  const [toysFinchHas, setToysFinchHas] = useState([]);
  const [toysFinchDoesntHave, setToysFinchDoesntHave] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getFinch() {
      try {
        const res = await finchAPI.show(id);
        setFinchDetail(res.finch);
        setFinchFeedings(res.feedings);
        setToysFinchHas(res.toysFinchHas);
        setToysFinchDoesntHave(res.toysFinchDoesntHave);
      } catch (err) {
        console.error(err);
      }
    }
    if (id) getFinch();
  }, [id]);

  async function handleAddToy(evt, toyId) {
    evt.preventDefault();
    try {
      const res = await finchAPI.addToyToFinch(id, toyId);
      setToysFinchHas(res.toysFinchHas);
      setToysFinchDoesntHave(res.toysFinchDoesntHave);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRemoveToy(evt, toyId) {
    evt.preventDefault();
    try {
      const res = await finchAPI.removeToyFromFinch(id, toyId);
      setToysFinchHas(res.toysFinchHas);
      setToysFinchDoesntHave(res.toysFinchDoesntHave);
    } catch (err) {
      console.error(err);
    }
  }

  async function addPhoto(finchId, formData) {
    try {
      const updatedFinch = await finchAPI.addPhoto(finchId, formData);
      setFinchDetail(updatedFinch);
    } catch (err) {
      console.log(err);
      setFinchDetail({ ...finchDetail });
    }
  }

  if (!finchDetail) return <h3 className="loading">Loading Finch details...</h3>;

  return (
    <>
      <section className="finch-detail-container">
        <div className="finch-info-box">
          <div className="finch-img-section">
            {finchDetail.photo?.url ? (
              <img
                src={finchDetail.photo.url}
                alt={`A photo of ${finchDetail.name}`}
                className="detail-img"
              />
            ) : (
              <img src={finchFly} alt="Flying Finch" className="detail-img" />
            )}
          </div>

          <div className="finch-text-section">
            <h1>{finchDetail.name}</h1>
            <h2>
              {finchDetail.age > 0
                ? `A ${finchDetail.age} year old ${finchDetail.breed}`
                : `A ${finchDetail.breed} chick.`}
            </h2>
            <p>{finchDetail.description}</p>

            <div className="finch-actions">
              <Link to={`/finches/edit/${finchDetail.id}`} className="btn warn">
                Edit
              </Link>
              <Link
                to={`/finches/confirm_delete/${finchDetail.id}`}
                className="btn danger"
              >
                Delete
              </Link>
            </div>
          </div>
        </div>

        <div className="photo-form-box">
          <AddPhotoForm finch={finchDetail} addPhoto={addPhoto} />
        </div>
      </section>

      <section className="feedings-toy-container">
        <section className="feedings">
          <h2>Feedings</h2>
          <FeedingForm
            catDetail={finchDetail}
            catFeedings={finchFeedings}
            setCatFeedings={setFinchFeedings}
          />
          <h3>Past Feedings</h3>
          {finchFeedings.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Meal</th>
                </tr>
              </thead>
              <tbody>
                {finchFeedings.map((f, i) => (
                  <tr key={i}>
                    <td>{f.date}</td>
                    <td>{MEALS[f.meal]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>This finch has not been fed yet!</p>
          )}
        </section>

        <section className="toys">
          <h2>{finchDetail.name}'s Toys</h2>
          <div className="subsection-content">
            {toysFinchHas.length > 0 ? (
              toysFinchHas.map((toy) => (
                <DisplayToys
                  key={toy.id}
                  toy={toy}
                  submitFunction={handleRemoveToy}
                  formAction="Take Toy"
                />
              ))
            ) : (
              <p>{finchDetail.name} doesn't have any toys!</p>
            )}
          </div>
          <h3>Available Toys</h3>
          <div className="subsection-content">
            {toysFinchDoesntHave.length > 0 ? (
              toysFinchDoesntHave.map((toy) => (
                <DisplayToys
                  key={toy.id}
                  toy={toy}
                  submitFunction={handleAddToy}
                  formAction="Give Toy"
                />
              ))
            ) : (
              <p>All toys have been given to {finchDetail.name} 🎉</p>
            )}
          </div>
        </section>
      </section>
    </>
  );
}
