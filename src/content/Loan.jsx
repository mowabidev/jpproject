import { Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Avatar, HStack, Button, Checkbox, Flex, Input, Divider, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Select, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { MdDelete, MdRemoveRedEye, MdMode, MdFileDownload, MdPersonAdd, MdSearch } from 'react-icons/md'

const Loan = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

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
                <Tbody>
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button size={"xs"} colorScheme='teal' variant='solid'>
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
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button size={"xs"} colorScheme='teal' variant='solid'>
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
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button size={"xs"} colorScheme='teal' variant='solid'>
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
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button size={"xs"} colorScheme='teal' variant='solid'>
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
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button size={"xs"} colorScheme='teal' variant='solid'>
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
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button size={"xs"} colorScheme='teal' variant='solid'>
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
                  <Tr>
                      <Td><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Td>
                      <Td>T23MPPY</Td>
                      <Td><HStack><Avatar name='Dan Abrahmov' size='sm' src='https://bit.ly/dan-abramov' /> <span>Dan Abrahmov</span></HStack></Td>
                      <Td>10.000 XOF</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>30/10/2023 - 12:00</Td>
                      <Td>
                          <HStack>
                              <Button size={"xs"} colorScheme='teal' variant='solid'>
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
                </Tbody>
            </Table>
        </TableContainer>
        <Modal size={'xl'}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nouvelle souscription</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack mb={6}>
                <FormControl>
                    <FormLabel>Membre</FormLabel>
                    <Select>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Montant</FormLabel>
                    <Input placeholder='10000' />
                </FormControl>

                <FormControl>
                    <FormLabel>Nombre de remboursement</FormLabel>
                    <Input placeholder='4' />
                </FormControl>
            </HStack>
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

export default Loan
