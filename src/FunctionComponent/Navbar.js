import React from 'react'
import { useNavigate, NavLink, Link  } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    const Logout = () => {
        debugger
        localStorage.removeItem('JWTToken');
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <a className="navbar-brand" href="#" onClick={Logout}>Logout</a>
                {/* <Link className="navbar-brand" onClick={Logout}>Logout</Link> */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item" >
                            {/* <a className="nav-link" href="home">Home</a> */}
                            <NavLink className="nav-link"  to="/home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            {/* <a className="nav-link" href="blog">Blog</a> */}
                            <NavLink className="nav-link"  to="/blog">Blog</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar