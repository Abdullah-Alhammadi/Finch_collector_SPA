import "./styles.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as finchAPI from "../../utilities/finch-api";
import finchFly from "../../assets/finch_fly.png";

export default function FinchFormPage({ createFinch, editFinch, deleteFinch }) {
    const initialState = { name: "", breed: "", description: "", age: 0 };
    const [formData, setFormData] = useState(initialState);
    const [currFinch, setCurrFinch] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getFinch() {
            try {
                const finch = await finchAPI.show(id);
                setCurrFinch(finch);
                setFormData(finch);
            } catch (err) {
                console.error(err);
            }
        }
        if ((editFinch || deleteFinch) && id) getFinch();
    }, [id, editFinch, deleteFinch]);

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            if (editFinch) {
                const updated = await finchAPI.update(formData, currFinch.id);
                navigate(`/finches/${updated.id}`);
            } else {
                const created = await finchAPI.create(formData);
                navigate(`/finches/${created.id}`);
            }
        } catch (err) {
            console.log("Error submitting finch:", err);
        }
    }

    async function handleDelete(evt) {
        evt.preventDefault();
        try {
            const response = await finchAPI.deleteFinch(currFinch.id);
            if (response.success) {
                navigate("/finches");
            }
        } catch (err) {
            console.log("Error deleting finch:", err);
        }
    }

    if (deleteFinch && !currFinch) return <h1>Loading...</h1>;

    if (deleteFinch && currFinch) return (
        <section className="finch-form-page">
            <h1>Delete Finch?</h1>
            <img src={finchFly} alt="Flying Finch" className="detail-img" />
            <h2>Are you sure you want to delete <strong>{currFinch.name}</strong>?</h2>
            <form onSubmit={handleDelete}>
                <Link to={`/finches/${currFinch.id}`} className="btn secondary">Cancel</Link>
                <button type="submit" className="btn danger">Yes, Delete</button>
            </form>
        </section>
    );

    return (
        <section className="finch-form-page">
            <h1>{editFinch ? `Edit ${formData.name}` : "Add a New Finch"}</h1>
            <form onSubmit={handleSubmit} className="form-container">
                {!editFinch && (
                    <label>Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                )}
                <label>Breed:
                    <input
                        type="text"
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
                <label>Age:
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="0"
                    />
                </label>
                <button type="submit" className="btn submit">Submit!</button>
            </form>
        </section>
    );
}
