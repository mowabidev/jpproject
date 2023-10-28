import React from 'react'
import './Dashbord.css';
import { useState, useEffect } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, ChakraProvider } from "@chakra-ui/react";

const Dashbord = () => {
    const [user, setUser] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
      fetch('http://localhost:5000/user')
        .then(response => response.json())
        .then(data => setUser(data.users))
        .catch(error => console.error('Erreur lors de la récupération des données :', error));
    }, []);
    
  return (
    <section className="" id="content">
        <main>
        <div className="head-title">
            <div className="left">
            <h1>Tableau de bord</h1>
            </div>
        </div>

        <div className="table-data">
            <div className="order">
            <div className="head">
                <h3>Liste des membres</h3>
                <i className='bx bx-search' ></i>
                <i className='bx bx-filter' ></i>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Voir plus</th>
                </tr>
                </thead>
                <tbody>
                    {user.map((item, index) => (
                        <tr key={index}>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>
                                <span className="status completed" onClick={onOpen}>Completed</span>
                            </td>
                        </tr>
                    ))};
                </tbody>
            </table>
            </div>
        </div>

        
        <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus ducimus quasi pariatur placeat atque! Velit doloribus omnis, deleniti aliquid necessitatibus laborum nostrum nam cupiditate esse ex ut iure quidem modi.</p>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </main>
    </section>
  );
}

export default Dashbord;

