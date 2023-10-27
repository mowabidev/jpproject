import React from 'react';
import './Navbar.css'

const Navbar = () => {
  return (
    <section id="content">
        <nav id="navbar" className="navbar">
            <a href="#" class="nav-link">Categories</a>
            <form action="#">
                <div class="form-input">
                    <input type="search" placeholder="Search..." />
                    <button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
                </div>
            </form>
            <a href="#" class="profile">
                <img src="img/people.png" />
            </a>
        </nav>
    </section>
  );
}

export default Navbar;




