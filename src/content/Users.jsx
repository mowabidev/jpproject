import { Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Avatar, HStack, Button, Checkbox, Flex, Input, Divider, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdDelete, MdRemoveRedEye, MdMode, MdFileDownload, MdPersonAdd, MdSearch } from 'react-icons/md'

const Users = () => {

    const [user, setUser] = useState([]);
    const { isOpen: isOpenNouveau, onOpen: onOpenNouveau, onClose: onCloseNouveau } = useDisclosure()
    const { isOpen: isOpenAutre, onOpen: onOpenAutre, onClose: onCloseAutre } = useDisclosure()

    useEffect(() => {
      fetch('http://localhost:5000/user')
        .then(response => response.json())
        .then(data => setUser(data.users))
        .catch(error => console.error('Erreur lors de la récupération des données :', error));
    }, []);

  return (
    <div>
        <Heading as={"h1"} textTransform={"uppercase"} fontSize={"1.5rem"} mb={"2em"}>Membres</Heading>
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
                    <Button onClick={onOpenNouveau} leftIcon={<MdPersonAdd />} flexShrink={0}>
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
                    <Th>Téléphone</Th>
                    <Th>Action</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {user.map((item, index) => (
                        <Tr key={index}>
                            <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                            <Td>{item.id}</Td>
                            <Td><HStack><Avatar name={`${item.firstname} ${item.lastname}`} size='sm' src='https://bit.ly/dan-abramov' /> <span>{item.firstname + ' ' + item.lastname}</span></HStack></Td>
                            <Td>{item.phone}</Td>
                            <Td>
                                <HStack>
                                    <Button onClick={onOpenAutre} size={"xs"} colorScheme='teal' variant='solid'>
                                        <MdRemoveRedEye />
                                    </Button>
                                    <Button size={"xs"} colorScheme='yellow' variant='solid'>
                                        <MdMode />
                                    </Button>
                                    <Button size={"xs"} colorScheme='red' variant='solid'>
                                        <MdDelete />
                                    </Button>
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
        <Modal size={'xl'} isOpen={isOpenNouveau} onClose={onCloseNouveau}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter un nouveau membre</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack mb={6}>
              <FormControl>
                <FormLabel>Membre</FormLabel>
                <Input type='text' placeholder='John' />
              </FormControl>

              <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input placeholder='Doe' />
              </FormControl>
            </HStack>
            <HStack mb={6}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='text' placeholder='johndoe@mt.com' />
              </FormControl>

              <FormControl>
                <FormLabel>Téléphonr</FormLabel>
                <Input placeholder='+229 97 00 00 00' />
              </FormControl>
            </HStack>
            <HStack mb={6}>
              <FormControl>
                <FormLabel>Adresse</FormLabel>
                <Input type='text' placeholder='Adresse de John Doe' />
              </FormControl>

              <FormControl>
                <FormLabel>Garant</FormLabel>
                <Input placeholder='Jean Lasale' />
              </FormControl>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Enregister
            </Button>
            <Button onClick={onCloseNouveau}>Retour</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
        <Modal isOpen={isOpenAutre} onClose={onCloseAutre}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></ModalHeader>
            <ModalCloseButton />
            <ModalBody>

            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onCloseAutre}>
                Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default Users
