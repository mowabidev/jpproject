import { Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Avatar, HStack, Button, Checkbox, Flex, Input, Divider, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Select, useDisclosure, VStack, FormErrorMessage, Center } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdDelete, MdFileDownload, MdMode, MdPersonAdd, MdSearch } from 'react-icons/md'

const Saving = () => {  
    const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
        userId: null,
        amount: null
    },
    mode: 'onBlur'
  });
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const [savings, setSavings] = useState([]); 
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/users'),
      fetch('http://localhost:5000/savings')
    ])
    .then(async values => {
      const [usersResponse, savingsResponse] = values;
      if(savingsResponse.ok && usersResponse.ok) {
        const users = await values[0].json();
        const savings = await values[1].json();
        setSavings(savings);
        setUsers(users); 
      } else if(!savingsResponse.ok) {
        throw new Error(`Le serveur des savings a répondu avec une erreur ${savingsResponse.status}`)
      } else {
        throw new Error(`Le serveur des utilisateurs a répondu avec une erreur ${usersResponse.status}`)
      }
    })
    .catch(errors => console.log(errors));

  }, []);

  const saveSaving = () => {
    const userId = parseInt(getValues().userId)
    const amount = parseInt(getValues().amount)

    console.log(userId, amount)
  
    fetch('http://localhost:5000/savings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        user: userId
      }),
    })
      .then(response => {
        console.log('Réponse du serveur :', response);
  
        if (response.ok) {
          return response.json();
        }
        throw new Error("Erreur" + response.status);
      })
      .then(data => {
        setSavings(prevSavings => [data, ...prevSavings]);
      })
      .catch(error => {
        console.error('Erreur lors de l\'enregistrement des données :', error);
      })
      .finally(() => {
        reset();
        onClose();
      });
  };
  

  return (
    <div>
        <Heading as={"h1"} fontSize={"1.5rem"} mb={"2em"}>PRÊTS</Heading>
        <TableContainer>
            <Flex justifyContent={"space-between"} >
                <HStack>
                    <Button leftIcon={<MdDelete />} flexShrink={0}>
                        Supprimer
                    </Button>
                    <HStack>
                        <Input placeholder='Rechercher' pr={"3em"}/>
                        <Box ml={"-2.5em"}><MdSearch /></Box>
                    </HStack>
                </HStack>
                <HStack>
                    <Button leftIcon={<MdFileDownload />} flexShrink={0}>
                        Importer
                    </Button>
                    <Button onClick={onOpen} leftIcon={<MdPersonAdd />} flexShrink={0}>
                        Nouveau
                    </Button>
                </HStack>
            </Flex>
            <Divider  borderColor={"#d1d1d1"} m={".5rem 0 1rem"} />
            <Table size='sm' variant='striped' colorScheme='blackAlpha'>
              <Thead>
              <Tr>
                  <Th><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Th>
                  <Th>Identifiant</Th>
                  <Th>Membre</Th>
                  <Th>Montant</Th>
                  <Th>Date</Th>
                  <Th>Action</Th>
              </Tr>
              </Thead>
              <Tbody>
                    { 
                    savings && savings.length > 0 ? savings.map((item, index) => (
                    <Tr key={index}>
                        <Td>
                            <Checkbox spacing="1rem" bg="#fff"></Checkbox>
                        </Td>
                        <Td>{item.user.id}</Td>
                        <Td>
                            <HStack>
                                <Avatar name={`${item.user.firstname} ${item.user.lastname}`} size="sm" src="" />{' '}
                                <span>{item.user.firstname} {item.user.lastname}</span>
                            </HStack>
                        </Td>
                        <Td>{item.amount}</Td>
                        <Td>{item.updatedAt}</Td>
                        <Td>
                          <HStack>
                              <Button size={"xs"} colorScheme='yellow' variant='solid' onClick={() => fetchSubscriptionDetailsById(item.id)}>
                                  <MdMode />
                              </Button>
                          </HStack>
                        </Td>
                    </Tr>
                    )) : <Tr><Td colSpan="6" py="2em"><Center>Aucune souscription pour l'instant</Center></Td></Tr>
                    }
              </Tbody>
            </Table>
        </TableContainer>

        <Modal size={'xs'}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nouvelle épargne</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack mb={6}>
                <form onSubmit={handleSubmit(saveSaving)}>
                    <FormControl isInvalid={errors.userId} mb={"30px"}>
                        <FormLabel>Membre</FormLabel>
                        <Select 
                            {...register('userId', {
                            required: 'Ce champ est obligatoire',
                            })}>
                            <option value="">-Choisir un membre-</option>
                            {users && users.map((item, index) => ( 
                                <option key={index} value={item.id}>
                                {item.firstname} {item.lastname}
                                </option>
                            ))} 
                        </Select>
                        {errors.userId && (
                        <FormErrorMessage>{errors.userId.message}</FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl isInvalid={errors.amount}>
                        <FormLabel>Montant de l'épargne</FormLabel>
                        <Input
                            type="number"
                            placeholder="10000"
                            {...register('amount', {
                            required: 'Ce champ est obligatoire',
                            minLength: { value: 4, message: 'Montant minimum insuffisant' },
                            })}
                        />
                        <FormErrorMessage>
                          {errors.amount && errors.amount.message}
                        </FormErrorMessage>
                    </FormControl>
                    <HStack justifyContent="end" mt={"30px"}>
                      <Button type='submit' colorScheme="blue" mr={3} isLoading={isSubmitting}>
                        Enregistrer
                      </Button>
                      <Button onClick={onClose}>Retour</Button>
                    </HStack>
                </form>
            </VStack>
          </ModalBody>
        </ModalContent>
        </Modal>
    </div>
  )
}

export default Saving
