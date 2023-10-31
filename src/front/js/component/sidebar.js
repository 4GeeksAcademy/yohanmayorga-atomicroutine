import React, { useState } from 'react';



export const Sidebar = () => {
    const[active, setActive] = useState(1);
    return (
        <div className='sidebar d-flex justify-content-between flex-column  text-white py-3 ps-3 pe-5 vh-100'>
            <div>
                <a href='' className='p-3 text-decoration-none text-dark'>
                <i className="fa-solid fa-atom me-2 fs-4"></i>
                    <span className='fs-4'>
                        <strong>
                        Atomic Routine
                        </strong>
                    </span>
                </a>
                <hr className='text-dark mt-2' />
                <ul className='nav nav-pills flex-column mt-3 text-dark'>
                    <li className={active  ===1 ? 'active nav-item' : "nav-item"} onClick={e => setActive(1)}>
                        <span href='' className='p-3'>
                        <i className="fa-solid fa-house me-2 fs-4"></i>
                            <span className='fs-4'><strong>Dashboard</strong></span>
                        </span>    
                    </li>
                    <li className={active  ===2 ? 'active nav-item' : "nav-item"} onClick={e => setActive(2)}>
                        <span href='' className='p-3'>
                        <i className="fa-solid fa-list me-2 fs-4"></i>
                            <span className='fs-4'><strong>Habitos</strong></span>
                        </span>
                    </li>
                    <li className={active  ===3 ? 'active nav-item' : "nav-item"} onClick={e => setActive(3)}>
                        <span href='' className='p-3'>
                        <i className="fa-solid fa-star me-2 fs-4"></i>
                            <span className='fs-4'><strong>Favoritos</strong></span>
                        </span>
                    </li>
                    <li className={active  ===4 ? 'active nav-item' : "nav-item"} onClick={e => setActive(4)}>
                        <span href='' className='p-3'>
                        <i className="fa-solid fa-person me-2 fs-4"></i>
                            <span className='fs-4'><strong>Estado de animo</strong></span>
                        </span>    
                    </li>

                    

                </ul>
            </div>
            <div>
                <hr className='text-dark' />
                <div>
                    <a href='' className='p-3  text-decoration-none text-dark'>
                    <span href='' className='p-3'>
                        <i className="fa-solid fa-gear me-2 fs-4"></i>
                            <span className='fs-4'><strong>Configuracion</strong></span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
};