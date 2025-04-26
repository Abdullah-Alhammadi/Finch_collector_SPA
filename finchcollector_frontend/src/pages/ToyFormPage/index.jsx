import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams, Link } from "react-router";
import * as toyAPI from "../../utilities/toy-api";

export default function ToyFormPage({ createToy, editToy, deleteToy }) {
    const initialState = { name: "", color: "#ff0000" }; 
    const [currToy, setCurrToy] = useState(null);
    const [formData, setFormData] = useState(initialState);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getAndSetDetail() {
            try {
                const toy = await toyAPI.show(id);
                setFormData({ name: toy.name, color: toy.color });
                setCurrToy(toy);
            } catch (err) {
                console.log(err);
                setFormData(initialState);
                setCurrToy(null);
            }
        }
        if ((editToy || deleteToy) && id) getAndSetDetail();
    }, [id]);

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const newToy = editToy
                ? await toyAPI.update(currToy.id, formData)
                : await toyAPI.create(formData);
            setFormData(initialState);
            navigate(`/toys/${newToy.id}`);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDelete(evt) {
        evt.preventDefault();
        try {
            const response = await toyAPI.deleteToy(currToy.id);
            if (response.success) {
                setFormData(initialState);
                navigate("/toys");
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (deleteToy && !currToy) return <h1>Loading</h1>;

    if (deleteToy && currToy)
        return (
            <>
                <div className="page-header">
                    <h1>Delete Toy?</h1>
                </div>
                <h2>Are you sure you want to delete {currToy.name}?</h2>
                <form onSubmit={handleDelete}>
                    <Link to={`/toys/${currToy.id}`} className="btn secondary">
                        Cancel
                    </Link>
                    <button type="submit" className="btn danger">
                        Yes - Delete!
                    </button>
                </form>
            </>
        );

    if (editToy && !currToy) return <h1>Loading</h1>;

    if (createToy || editToy)
        return (
            <>
                <div className="page-header">
                    <h1>{editToy ? `Edit ${currToy.name}'s Info` : "Add a Toy"}</h1>
                </div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <label htmlFor="id_name">Name:</label>
                                </th>
                                <td>
                                    <input
                                        value={formData.name}
                                        type="text"
                                        name="name"
                                        minLength="3"
                                        maxLength="50"
                                        required
                                        id="id_name"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor="id_color">Color:</label>
                                </th>
                                <td>
                                    <input
                                        value={formData.color}
                                        type="color"
                                        name="color"
                                        required
                                        id="id_color"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit" className="btn end submit">
                        Submit!
                    </button>
                </form>
            </>
        );
}
