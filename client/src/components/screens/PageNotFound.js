import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
    return(
        <div className="welcome-screen screen">
            <h1 className="welcome-header">Woops...404</h1>
            <p>Page not found</p>
            
            <Link className='btn btn-3 pad-2' to='/' style={{color:'var(--blanco2)'}}>Go home...</Link>
        </div>
    )
}

export default PageNotFound