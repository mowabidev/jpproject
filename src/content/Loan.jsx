import { Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Avatar, HStack, Button, Checkbox, Flex, Input, Divider, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Select, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdDelete, MdFileDownload, MdPersonAdd, MdSearch } from 'react-icons/md'

const Loan = () => {  
    const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
        userId:'',
        amount:'',
        nb_ref: ''
    },
    mode: 'onBlur'
  })
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const [users, setUsers] = useState([])
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then(response => response.json())
      .then(data => setUsers(data.users)) 
      .catch(error => console.error('Erreur lors de la récupération des données :', error)); 
  });

  const saveLoan = () => {
    const amount  = getValues().nb_part * 2000
    fetch(`http://localhost:5000/subscriptions/${subscriptionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        updatedAt: new Date(),
      }),
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error("Erreur" + response.status)
    })
    .then(data => {
      setSubscriptions(prevSubscriptions => 
        prevSubscriptions.map(sub => 
          sub.id === subscriptionId
            ? { ...sub, amount: data.Subscription.amount, updatedAt: data.Subscription.updatedAt }
            : sub
        )
      );
      
    })
    .catch(error => {
      console.error('Erreur lors de l\'enregistrement des données :', error);
    })
    reset();
    onClose();
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
                    <Th>Date du 1er paiement</Th>
                    <Th>Action</Th>
                </Tr>
                </Thead>
            </Table>
        </TableContainer>
        <Modal size={'xs'}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nouveau prêt</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack mb={6}>
                <form onSubmit={handleSubmit(saveLoan)}>
                    <FormControl isInvalid={errors.userId}>
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

                    <FormControl>
                        <FormLabel>Montant</FormLabel>
                        <Input
                            type="number"
                            placeholder="10000"
                            {...register('amount', {
                            required: 'Ce champ est obligatoire',
                            minLength: { value: 4, message: 'Montant minimum insuffisant' },
                            })}
                        />
                        {errors.amount && (
                          <FormErrorMessage>{errors.amount.message}</FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl>
                        <FormLabel>Nombre de remboursement</FormLabel>
                        <Input
                        type="number"
                        placeholder="4"
                        {...register('nb_ref', {
                            required: 'Ce champ est obligatoire',
                        })}
                        />
                        {errors.nb_ref && (
                          <FormErrorMessage>{errors.nb_ref.message}</FormErrorMessage>
                        )}
                    </FormControl>
                </form>
            </VStack>
            <HStack justifyContent="end">
              <Button type='submit' colorScheme="blue" mr={3}>
                Enregistrer
              </Button>
              <Button onClick={onClose}>Retour</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
        </Modal>
    </div>
  )
}

export default Loan
