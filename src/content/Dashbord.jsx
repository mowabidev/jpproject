import React from 'react'
import './Dashbord.css';
import { useState, useEffect } from 'react';

const Dashbord = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
      fetch('/backend/controllers/user.controller.js')
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error('Erreur lors de la récupération des données :', error));
    }, []);

  return (
    <section className="" id="content">
        <main>
        <div className="head-title">
            <div className="left">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
                <li>
                <a href="#">Dashboard</a>
                </li>
                <li><i className='bx bx-chevron-right' ></i></li>
                <li>
                <a className="active" href="#">Home</a>
                </li>
            </ul>
            </div>
        </div>

        <div className="table-data">
            <div className="order">
            <div className="head">
                <h3>Recent Orders</h3>
                <i className='bx bx-search' ></i>
                <i className='bx bx-filter' ></i>
            </div>
            <table>
                <thead>
                <tr>
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {user.map((item, index) => (
                        <tr key={index}>
                        <td>{item.nom}</td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                        <img src="img/people.png" alt="User" />
                        <p>John Doe</p>
                        </td>
                        <td>01-10-2021</td>
                        <td><span className="status completed">Completed</span></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
        </main>
    </section>
  );
}

export default Dashbord;
