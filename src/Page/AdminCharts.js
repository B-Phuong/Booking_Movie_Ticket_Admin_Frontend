import React from "react";
import { Routes, Route } from "react-router-dom";
import "../App.css";
import { Link, NavLink } from "react-router-dom";
import ChartArea from "./ChartsArea/ChartsArea";

export default function AdminCharts() {
    return (
        // <div className="admin-page">
        /* <HeaderAdmin /> */
        <div style={{ marginTop: "1em" }}>
            <Routes>
                <Route path="/" element={<ChartArea />} />
            </Routes>
        </div>
    );
}
