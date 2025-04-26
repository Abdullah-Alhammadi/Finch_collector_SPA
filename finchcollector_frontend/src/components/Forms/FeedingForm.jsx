import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import * as feedingAPI from "../../utilities/feeding-api";

export default function FeedingForm({ catDetail, catFeedings, setCatFeedings }) {
    const [formData, setFormData] = useState({
        date: new Date(),
        meal: "B",
        finch: catDetail.id
    });

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    }

    function handleDateChange(date) {
        setFormData({ ...formData, date: date.toISOString().slice(0, 10) });
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const updatedFeedings = await feedingAPI.create(formData, catDetail.id);
            setCatFeedings(updatedFeedings);
            setFormData({
                date: new Date(),
                meal: "B",
                finch: catDetail.id
            });
        } catch (err) {
            console.log(err);
            setCatFeedings([...catFeedings]);
        }
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Feeding date:</label><br />
                <DatePicker
                    selected={new Date(formData.date)}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="custom-datepicker-input"
                />
            </div>

            <div className="form-group">
                <label>Meal:</label>
                <select name="meal" value={formData.meal} onChange={handleChange}>
                    <option value="B">Breakfast</option>
                    <option value="L">Lunch</option>
                    <option value="D">Dinner</option>
                </select>
            </div>

            <button type="submit" className="btn submit">Add Feeding</button>
        </form>
    );
}
