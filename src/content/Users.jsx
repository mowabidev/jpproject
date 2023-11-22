import React, { useState, useEffect } from 'react';
import { Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Avatar, HStack, Button, Checkbox, Flex, Input, Divider, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, useDisclosure, Select, Center, FormErrorMessage
} from '@chakra-ui/react';
import { MdDelete, MdRemoveRedEye, MdMode, MdFileDownload, MdPersonAdd, MdSearch } from 'react-icons/md';
import { useForm, Controller } from 'react-hook-form';

const Users = () => {
  const {
    handleSubmit,
    register,
    getValues,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      garantId: '', // ou la valeur par défaut appropriée
    },
    mode: 'onBlur'
  })
  const [users, setUsers] = useState([]);
  const [garant, setGarant] = useState([]);
  const [userId, setUserId] = useState(null);

  const { isOpen: isOpenNew, onOpen: onOpenNew, onClose: onCloseNew } = useDisclosure();
  const { isOpen: isOpenRemove, onOpen:onOpenRemove, onClose: onCloseRemove } = useDisclosure();


  const saveSubscription = async (userId) => {
    const amount = 0;
    const total = 0;
    try {
      const response = await fetch('http://localhost:5000/subscriptions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, total, userId: userId, createdAt: new Date() }),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      // Faites quelque chose avec la réponse du serveur si nécessaire
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des données :', error);
    }
  };
  
  


  const saveUser = () => {
    fetch('http://localhost:5000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(getValues()),
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error("Erreur" + response.status)
    })
    .then(data => {
      setUsers(prevUsers => [data.user, ...prevUsers]);
      for (let i = 0; i < 12; i++) {
        saveSubscription(data.user.id);
      }
    })
    .catch(error => {
      console.error('Erreur lors de l\'enregistrement des données :', error);
    });
    reset();
    onCloseNew();
  };

  const deleteUserById = async (userId) => {
    try {
      console.log(userId)
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur lors de la suppression : ${errorText}`);
      }
  
      // Mise à jour de l'état local en excluant l'utilisateur supprimé
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  
      return 'Utilisateur supprimé avec succès';
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  
  

  const fetchUserDetailsById = (userId) => {
    fetch(`http://localhost:5000/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUserId(data.user.id); // Mise à jour de userId avec l'ID récupéré
        return Promise.all([
          setValue('firstname', data.user.firstname),
          setValue('lastname', data.user.lastname),
          setValue('email', data.user.email),
          setValue('phone', data.user.phone),
          setValue('address', data.user.address),
          setValue('garantId', data.user.garantId) 
        ]); 
      })
      .then(() => {
        onOpenRemove();
      })
      .catch(error => console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error));
  };
  
  const checkEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/users/checkEmail/${email}`);
      if (response.ok) {
        const data = await response.json();
        if (data === null ) {
          return true;
        } else if(data !== null && data.id == userId){
          return true
        } else {
          return 'Cet email est déjà utilisé !'
        }
      } throw new Error(`Erreur lors de la requête : ${response.statusText}`);
    } catch (error) {
      console.error('Erreur lors de la requête :', error.message);
    }
  };

  const checkPhone = async (phone) => {
    try {
      const response = await fetch(`http://localhost:5000/users/checkPhone/${phone}`);
      if (response.ok) {
        const data = await response.json();
        if (data === null ) {
          return true;
        } else if(data !== null && data.id == userId){
          return true
        } else {
          return 'Cet phone est déjà utilisé !'
        }
      } throw new Error(`Erreur lors de la requête : ${response.statusText}`);
    } catch (error) {
      console.error('Erreur lors de la requête :', error.message);
    }
  };
  
  const editUser = () => {
    fetch(`http://localhost:5000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(getValues()),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Erreur" + response.status);
      })
      .then(data => {
        // Mettez à jour l'état avec le nouvel utilisateur
        setUsers(prevUsers => prevUsers.map(user => (user.id === userId ? data.user : user)));
      })
      .catch(error => {
        console.error('Erreur lors de l\'enregistrement des données :', error);
      })
      .finally(() => {
        reset();
        onCloseRemove();
      });
  };

  
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/users'),
      fetch('http://localhost:5000/garants')
    ])
    .then(async values => {
      const [usersResponse, garantsResponse] = values;
      if(garantsResponse.ok && usersResponse.ok) {
        const {users} = await values[0].json();
        const {garants} = await values[1].json();
        setGarant(garants);
        setUsers(users); 
      } else if(!garantsResponse.ok) {
        throw new Error(`Le serveur des garants a répondu avec une erreur ${garantsResponse.status}`)
      } else {
        throw new Error(`Le serveur des utilisateurs a répondu avec une erreur ${usersResponse.status}`)
      }
    })
    .catch(errors => console.log(errors));

  }, []);

  return (
    <div>
      <Heading as="h1" fontSize="1.5rem" mb="2em">
        MEMBRES
      </Heading>
      <TableContainer>
        <Flex justifyContent="space-between">
          <HStack>
            <Button leftIcon={<MdDelete />} flexShrink={0}>
              Supprimer
            </Button>
            <HStack>
              <Input placeholder="Rechercher" pr="3em" />
              <Box ml="-2.5em">
                <MdSearch />
              </Box>
            </HStack>
          </HStack>
          <HStack>
            <Button leftIcon={<MdFileDownload />} flexShrink={0}>
              Importer
            </Button>
            <Button onClick={onOpenNew} leftIcon={<MdPersonAdd />} flexShrink={0}>
              Nouveau
            </Button>
          </HStack>
        </Flex>
        <Divider borderColor="#d1d1d1" m=".5rem 0 1rem" />
        <Table size="sm" variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>
                <Checkbox spacing="1rem" bg="#fff"></Checkbox>
              </Th>
              <Th>Identifiant</Th>
              <Th>Membre</Th>
              <Th>Téléphone</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              users.length > 0 ? users.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <Checkbox spacing="1rem" bg="#fff"></Checkbox>
                </Td>
                <Td>{item.id}</Td>
                <Td>
                  <HStack>
                    <Avatar name={`${item.firstname} ${item.lastname}`} size="sm" src="" />{' '}
                    <span>{item.email}</span>
                  </HStack>
                </Td>
                <Td>{item.phone}</Td>
                <Td>
                  <HStack>
                    <Button size="xs" colorScheme="teal" variant="solid">
                      <a href={`/membres/view/${item.id}`}>
                        <MdRemoveRedEye />
                      </a>
                    </Button>
                    <Button size="xs" colorScheme="yellow" variant="solid" onClick={() => fetchUserDetailsById(item.id)}>
                      <MdMode /> 
                    </Button>
                    <Button size="xs" colorScheme="red" variant="solid" onClick={() => deleteUserById(item.id)}>
                      <MdDelete />
                    </Button>
                  </HStack>
                </Td>
              </Tr>
              )) : <Tr><Td colSpan="5" py="2em"><Center>Aucun membre pour l'instant</Center></Td></Tr>
            }
          </Tbody>
        </Table>
      </TableContainer>

      <Modal size="xl" isOpen={isOpenNew} onClose={onCloseNew}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter un nouveau membre</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(saveUser)}>
              <HStack mb={6}>
                <FormControl isInvalid={errors.firstname}>
                  <FormLabel>Prénom(s)</FormLabel>
                  <Input
                    type="text"
                    placeholder="John"
                    {...register('firstname', {
                      required: 'Ce champ est obligatoire',
                      minLength: { value: 2, message: 'Le prénom doit faire au moins 2 lettres' },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.firstname && errors.firstname.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.lastname}>
                  <FormLabel>Nom</FormLabel>
                  <Input
                    placeholder="Doe"
                    {...register('lastname', {
                      required: 'Ce champ est obligatoire',
                      minLength: { value: 2, message: 'Le nom doit faire au moins 2 lettres' },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.lastname && errors.lastname.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack mb={6}>
                <FormControl isInvalid={errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    placeholder="johndoe@mt.com"
                    {...register('email', {
                      minLength: { value: 2, message: 'L\'email doit faire au moins 2 lettres' }
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.phone}>
                  <FormLabel>Téléphone</FormLabel>
                  <Input
                    placeholder="+22997000000"
                    {...register('phone', {
                      required: 'Ce champ est obligatoire',
                      minLength: { value: 8, message: 'Le téléphone doit faire exactement 8 chiffres' },
                      maxLength: { value: 8, message: 'Le téléphone doit faire exactement 8 chiffres' }
                    })}
                  />
                  <FormErrorMessage>
                    {errors.phone && errors.phone.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack mb={6}>
                <FormControl isInvalid={errors.address}>
                  <FormLabel>Adresse</FormLabel>
                  <Input
                    type="text"
                    placeholder="Adresse de John Doe"
                    {...register('address', {
                      required: 'Ce champ est obligatoire',
                      minLength: { value: 2, message: 'L\'adresse doit faire au moins 2 lettres' },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.address && errors.address.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.garantId}>
                    <FormLabel>Garant</FormLabel>
                    <Select 
                    {...register('garantId', {
                      required: 'Ce champ est obligatoire',
                    })}>
                      {garant && garant.map((item, index) => ( 
                        <option key={index} value={item.id}>
                          {item.firstname} {item.lastname}
                        </option>
                      ))} 
                    </Select>
                  <FormErrorMessage>
                    {errors.garantId && errors.garantId.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack justifyContent="end">
                <Button type='submit' colorScheme="blue" mr={3}>
                  Enregistrer
                </Button>
                <Button onClick={onCloseNew}>Retour</Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      
      <Modal size="xl" isOpen={isOpenRemove} onClose={onCloseRemove}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modifier un membre</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(editUser)}>
              <HStack mb={6}>
                <FormControl isInvalid={errors.firstname}>
                  <FormLabel>Prénom(s)</FormLabel>
                  <Input
                    type="text"
                    placeholder="John"
                    {...register('firstname', {
                      required: 'Ce champ est obligatoire',
                      minLength: { value: 2, message: 'Le prénom doit faire au moins 2 lettres' }
                    })}
                  />
                  <FormErrorMessage>
                    {errors.firstname && errors.firstname.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.lastname}>
                  <FormLabel>Nom</FormLabel>
                  <Input
                    type="text"
                    placeholder="Doe"
                    {...register('lastname', {
                      required: 'Ce champ est obligatoire',
                      minLength: { value: 2, message: 'Le prénom doit faire au moins 2 lettres' }
                    })}
                  />
                  <FormErrorMessage>
                    {errors.lastname && errors.lastname.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack mb={6}>
                <FormControl isInvalid={errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    placeholder="johndoe@mt.com"
                    {...register('email', {
                      minLength: { value: 2, message: 'L\'email doit faire au moins 2 lettres' },
                      validate: checkEmail
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.phone}>
                  <FormLabel>Téléphone</FormLabel>
                  <Input
                    placeholder="+22997000000"
                    {...register('phone', {
                      required: 'Ce champ est obligatoire',
                      minLength: { value: 8, message: 'Le téléphone doit faire exactement 8 chiffres' },
                      maxLength: { value: 8, message: 'Le téléphone doit faire exactement 8 chiffres' },
                      validate: checkPhone
                    })}
                  />
                  <FormErrorMessage>
                    {errors.phone && errors.phone.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack mb={6}>
                <FormControl isInvalid={errors.address}>
                  <FormLabel>Adresse</FormLabel>
                  <Input
                    type="text"
                    placeholder="Adresse de John Doe"
                    {...register('address', {
                      required: 'Ce champ est obligatoire',
                      minLength: { value: 2, message: 'L\'adresse doit faire au moins 2 lettres' },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.address && errors.address.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.garantId}>
                    <FormLabel>Garant</FormLabel>
                    <Select 
                    {...register('garantId', {
                      required: 'Ce champ est obligatoire',
                    })}>
                      {garant && garant.map((item, index) => ( 
                        <option key={index} value={item.id}>
                          {item.firstname} {item.lastname}
                        </option>
                      ))} 
                    </Select>
                  <FormErrorMessage>
                    {errors.garantId && errors.garantId.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack justifyContent="end">
                <Button type='submit' colorScheme="blue" mr={3}>
                  Enregistrer
                </Button>
                <Button onClick={onCloseRemove}>Retour</Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Users;
