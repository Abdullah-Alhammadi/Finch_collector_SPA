import "./styles.css";
import { Link } from "react-router-dom";
import finchFly from "../../assets/finch_fly.png";

export default function FinchIndexCard({ finch }) {
  return (
    <div className="finch-index-card">
      <Link to={`/finches/${finch.id}`}>
        <div className="finch-index-card-content">
          <img src={finchFly} alt="A flying finch" />
          <h2>{finch.name}</h2>
          <p>
            A {finch.age > 0 ? `${finch.age} year old ${finch.breed}` : `a ${finch.breed} chick.`}
          </p>
          <p><small>{finch.description}</small></p>
        </div>
      </Link>
    </div>
  );
}
