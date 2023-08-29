import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem('JWTToken');
        navigate("/login");
    }

  return (
    <>
        <nav class="navbar navbar-expand-lg navbar-light bg-info">
            <a class="navbar-brand" href="#" onClick={Logout}>Logout</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                <a class="nav-link" href="home">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="blog">Blog</a>
                </li>                    
            </ul>
            </div>
        </nav>
    </>
  )
}

export default Navbar