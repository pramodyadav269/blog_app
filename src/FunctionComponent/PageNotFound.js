import React from 'react';
import imgPageNotFound from '../Content/images/404_PageNotFound.jpg';

function PageNotFound() {
  return (
    <>
        <div>
            <img src={imgPageNotFound} alt="Avatar" className="avatar" style={{ width:"100%",}} />
        </div>
        <div className="row">
            <div className="col-md-5"></div>
            <div className="col-md-3">
                <a href="Login"><button type="submit" className="btn btn-primary">Go to Login Page</button></a>
            </div>
        </div>        
    </>    
  )
}

export default PageNotFound