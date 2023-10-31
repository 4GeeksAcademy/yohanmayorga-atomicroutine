import React from "react";


export const Nav = ({ Toggle }) => {
    return (
        <nav className=" nav navbar navbar-expand-lg navbar-light bg-transparent sticky-top">
            <div className="container-fluid">

                <a className="navbar-brand" onClick={Toggle} href="#">
                    <i className="fa-solid fa-bars"></i>
                </a>
                <div className="dropdown">
                    <button className="btn btn dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img className="perfil-image" src="https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_article/public/cgov_image/media_image/100/800/8/files/ocean-sunset-view-mykonos-spanish-article.jpeg?h=190fd85d&itok=RUaJVYtB"/>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end " aria-labelledby="dropdownMenuButton2">
                        <li><a className="dropdown-item active" href="#">Perfil</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Log out</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

