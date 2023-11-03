import React from "react";


export const Journal = ({openJournal, open}) => {
    if (!open) return null;
    return (
        <>
        <h1>Diario {openJournal}</h1>
        </>
    );
};