import React from "react";

export const DashHome = () => {
    return (
      <div className='container-fluid mt-2'>
        <div className='card card-man' >
          <div className='card-body'>
            <h5 className='card-title'> Hola, Usuario</h5>
            <p>Como esta todo? Que deseas hacer hoy?</p>
          </div>
        </div>
  
        <div className='card-task m-3 d-flex '>
  
          <div className='card m-2' >
            <div className='card-body d-flex'>
              <div className='m-2'>
                <img src='https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_article/public/cgov_image/media_image/100/800/8/files/ocean-sunset-view-mykonos-spanish-article.jpeg?h=190fd85d&itok=RUaJVYtB' />
              </div>
              <div>
                <h5 className='card-title'> Habitos</h5>
              </div>
            </div>
          </div>
  
          <div className='card m-2' >
            <div className='card-body d-flex'>
              <div className='m-2'>
                <img src='https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_article/public/cgov_image/media_image/100/800/8/files/ocean-sunset-view-mykonos-spanish-article.jpeg?h=190fd85d&itok=RUaJVYtB' />
              </div>
              <div>
                <h5 className='card-title'>Calendario</h5>
              </div>
            </div>
          </div>
  
          <div className='card m-2' >
            <div className='card-body d-flex'>
              <div className='m-2'>
                <img src='https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_article/public/cgov_image/media_image/100/800/8/files/ocean-sunset-view-mykonos-spanish-article.jpeg?h=190fd85d&itok=RUaJVYtB' />
              </div>
              <div>
                <h5 className='card-title'>Estado de animo</h5>
              </div>
            </div>
          </div>
        </div>
  
        <div className='calendar'>
          <img src='https://blog.logrocket.com/wp-content/uploads/2021/08/default-styling-react-calendar.png'/>
        </div>
  
      </div>
    );
  };