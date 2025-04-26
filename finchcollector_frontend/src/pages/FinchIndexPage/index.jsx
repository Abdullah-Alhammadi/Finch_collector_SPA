// src/pages/FinchIndexPage/index.jsx
import "./styles.css";
import finchFly from "../../assets/finch_fly.png";
import FinchIndexCard from "../../components/FinchIndexCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as finchAPI from "../../utilities/finch-api";

export default function FinchIndexPage() {
    const [allFinches, setAllFinches] = useState([]);
    const location = useLocation();

    useEffect(() => {
        async function getAllFinches() {
            try {
                const finchData = await finchAPI.index();
                setAllFinches(finchData);
            } catch (err) {
                console.error("Error fetching finches:", err);
            }
        }
        getAllFinches();
    }, [location]);

    const displayAllFinches = allFinches.map((finch, index) => (
        <FinchIndexCard key={index} finch={finch} />
    ));

    return (
        <>
            <section className="page-header">
                <h1>Finch List</h1>
                <img src={finchFly} alt="A flying finch logo" />
            </section>
            <section className="index-card-container">
                {displayAllFinches}
            </section>
        </>
    );
}
