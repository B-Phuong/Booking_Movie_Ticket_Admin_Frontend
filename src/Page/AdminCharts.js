import React from "react";
import { Routes, Route } from "react-router-dom";
import "../App.css";
import { Link, NavLink } from "react-router-dom";
import RevenueChartsArea from "./ChartsArea/RevenueChartsArea";
import ChartsArea from "./ChartsArea/ChartsArea";
import NotFound from "../Components/NotFound/NotFound";

export default function AdminCharts() {
    return (
        // <div className="admin-page">
        /* <HeaderAdmin /> */
        <div style={{ marginTop: "1em" }}>
            <Routes>
                <Route path="/" element={<ChartsArea />} />
                <Route path="/Revenue" element={<RevenueChartsArea />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
