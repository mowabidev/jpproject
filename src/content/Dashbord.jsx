import React from 'react'
import './Dashbord.css';
import { useState, useEffect } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, ChakraProvider, HStack } from "@chakra-ui/react";

const Dashbord = () => {
    const [users, setusers] = useState([]);
    const [subscription, setSubscriptions] = useState([]);
    const [userId, setUserId] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        Promise.all([
          fetch('http://localhost:5000/subscriptions'),
          fetch('http://localhost:5000/users')
        ])
        .then(async values => {
          const [subscriptionsResponse, usersResponse] = values;
          if(usersResponse.ok && subscriptionsResponse.ok) {
            const {subscriptions} = await values[0].json();
            const users = await values[1].json(); 
            setusers(users); 
            setSubscriptions(subscriptions); 
          } else if(!usersResponse.ok) {
            throw new Error(`Le serveur des users a répondu avec une erreur ${usersResponse.status}`)
          } else {
            throw new Error(`Le serveur des utilisateurs a répondu avec une erreur ${subscriptionsResponse.status}`)
          }
        })
        .catch(errors => console.log(errors));
    
    }, []);
    
  return (
    <section className="" id="content">
        <main>
        <div className="head-title">
            <div className="left">
            <h1>Tableau de bord</h1>
            </div>
        </div>

        <HStack>
            <div className="table-data">
            </div>
            <div className="table-data">
            </div>
        </HStack>

        <HStack>
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
                    </tr>
                    </thead>
                    <tbody>
                        {users.map((item, index) => (
                            <tr key={index}>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                    </tr>
                    </thead>
                    <tbody>
                        {users.map((item, index) => (
                            <tr key={index}>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </HStack>
        
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

