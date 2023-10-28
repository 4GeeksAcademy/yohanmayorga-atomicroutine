import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/comofunciona.css";

export const ComoFunciona = () => {
	const { store, actions } = useContext(Context);

	return (
        <h1>Cómo funciona</h1>
	);
};
