import { Link } from "react-router-dom";
import { closest } from "color-2-name";

export default function DisplayToys({ toy, submitFunction, formAction }) {
  let colorName = toy.color;
  try {
    if (toy.color.startsWith("#")) {
      colorName = closest(toy.color).name;
    }
  } catch (err) {
    console.warn("⚠️ Failed to convert color:", toy.color, err.message);
  }

  return (
    <div className="toy-container">
      <div className="toy-info">
        <Link to={`/toys/${toy.id}`}>
          <p>A {colorName} {toy.name}</p>
        </Link>
        <div className="color-block" style={{ backgroundColor: toy.color }}></div>
      </div>
      <form onSubmit={(evt) => submitFunction(evt, toy.id)}>
        <button type="submit" className="btn submit">{formAction}</button>
      </form>
    </div>
  );
}
