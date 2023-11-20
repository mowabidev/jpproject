import { Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Avatar, HStack, Button, Checkbox, Flex, Input, Divider, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Select, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { MdDelete, MdRemoveRedEye, MdMode, MdFileDownload, MdPersonAdd, MdSearch } from 'react-icons/md'

const Subscription = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <div>
        <Heading as={"h1"} fontSize={"1.5rem"} mb={"2em"}>SOUSCRIPTIONS</Heading>
        <TableContainer>
            <Flex justifyContent={"space-between"} >
                <HStack>
                        <Input placeholder='Rechercher'/>
                        <Box ml={"-2.5em"}><MdSearch /></Box>
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
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button onClick={onOpen} size={"xs"} colorScheme='yellow' variant='solid'>
                                  <MdMode />
                              </Button>
                          </HStack>
                      </Td>
                  </Tr>
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button onClick={onOpen} size={"xs"} colorScheme='yellow' variant='solid'>
                                  <MdMode />
                              </Button>
                          </HStack>
                      </Td>
                  </Tr>
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button onClick={onOpen} size={"xs"} colorScheme='yellow' variant='solid'>
                                  <MdMode />
                              </Button>
                          </HStack>
                      </Td>
                  </Tr>
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button onClick={onOpen} size={"xs"} colorScheme='yellow' variant='solid'>
                                  <MdMode />
                              </Button>
                          </HStack>
                      </Td>
                  </Tr>
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button onClick={onOpen} size={"xs"} colorScheme='yellow' variant='solid'>
                                  <MdMode />
                              </Button>
                          </HStack>
                      </Td>
                  </Tr>
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button onClick={onOpen} size={"xs"} colorScheme='yellow' variant='solid'>
                                  <MdMode />
                              </Button>
                          </HStack>
                      </Td>
                  </Tr>
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button onClick={onOpen} size={"xs"} colorScheme='yellow' variant='solid'>
                                  <MdMode />
                              </Button>
                          </HStack>
                      </Td>
                  </Tr>
                </Tbody>
            </Table>
        </TableContainer>
        <Modal size={'xs'}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nouvelle souscription</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack mb={6}><FormControl>
                <FormLabel>Nombre de part</FormLabel>
                <Input placeholder='4' />
              </FormControl>
              <Checkbox defaultChecked>Payé</Checkbox>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Enregister
            </Button>
            <Button onClick={onClose}>Retour</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    </div>
  )
}

export default Subscription
