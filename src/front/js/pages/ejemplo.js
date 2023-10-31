import React, { useState } from "react";
import { Nav } from "../component/nav";
import { Sidebar } from "../component/sidebar";
import { DashHome } from "./dashhome";
import "../../styles/ejemplo.css";


export const Ejemplo = () => {
    const [toggle, setToggle] = useState(false);
    function Toggle() {
        setToggle(!toggle)
    }
    return (
        <div className="d-flex">
            <div className={toggle ? "d-none" : "w-auto position-fixed"}>
                <Sidebar />
            </div>
            <div className={toggle ? "d-none" : "invisible"}>
                <Sidebar />
            </div>
            <div className="col overflow-auto">
                <Nav Toggle={Toggle} />
                <DashHome />
            </div>
        </div>
    )
}