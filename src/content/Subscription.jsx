import { Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Avatar, HStack, Button, Checkbox, Flex, Input, Divider, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, useDisclosure, VStack, Center, FormErrorMessage } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdMode, MdSearch } from 'react-icons/md'

const Subscription = () => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nb_part: '',
    },
    mode: 'onBlur'
  })

  const [subscriptions, setSubscriptions] = useState([]); 
  const [subscriptionId, setSubscriptionId] = useState([]);
  const [settings, setSettings] = useState([]);
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/subscriptions'),
      fetch('http://localhost:5000/settings')
    ])
    .then(async values => {
      const [subscriptionsResponse, settingsResponse] = values;
      if(settingsResponse.ok && subscriptionsResponse.ok) {
        const {subscriptions} = await values[0].json();
        const {settings} = await values[1].json();
        setSettings(settings); 
        setSubscriptions(subscriptions); 
      } else if(!settingsResponse.ok) {
        throw new Error(`Le serveur des settings a répondu avec une erreur ${settingsResponse.status}`)
      } else {
        throw new Error(`Le serveur des utilisateurs a répondu avec une erreur ${subscriptionsResponse.status}`)
      }
    })
    .catch(errors => console.log(errors));

  }, []);

  const fetchSubscriptionDetailsById = (subscriptionId) => {
    fetch(`http://localhost:5000/subscriptions/${subscriptionId}`)
      .then(response => response.json())
      .then(data => {
        setSubscriptionId(data.Subscription.id);
      })
      .then(() => {
        onOpen();
      })
      .catch(error => console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error));
  };

  const savePayement = () => {
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
        <Heading as={"h1"} fontSize={"1.5rem"} mb={"2em"}>
            <HStack justifyContent={"space-between"}>
                <h1>SOUSCRIPTIONS</h1>
                <Flex justifyContent={"space-between"} >
                    <HStack>
                            <Input placeholder='Rechercher'/>
                            <Box ml={"-2.5em"}><MdSearch /></Box>
                    </HStack>
                </Flex>
            </HStack>
        </Heading>
        <TableContainer>
            <Divider  borderColor={"#d1d1d1"} m={".5rem 0 1rem"} />
            <Table size='sm' variant='striped' colorScheme='blackAlpha'>
                <Thead>
                <Tr>
                    <Th><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Th>
                    <Th>Identifiant</Th>
                    <Th>Membre</Th>
                    <Th>Montant</Th>
                    <Th>Date</Th>
                </Tr>
                </Thead>
                <Tbody>
                    { 
                    subscriptions.length > 0 ? subscriptions.map((item, index) => (
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
                    )) : <Tr><Td colSpan="5" py="2em"><Center>Aucun membre pour l'instant</Center></Td></Tr>
                    }
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
          <form onSubmit={handleSubmit(savePayement)}>
            <VStack mb={6}>
              <FormControl isInvalid={errors.nb_part}>
                <FormLabel>Nombre de part</FormLabel>
                <Input
                  type="number"
                  placeholder="4"
                  {...register('nb_part', {
                    required: 'Ce champ est obligatoire',
                  })}
                />
                {errors.nb_part && (
                  <FormErrorMessage>{errors.nb_part.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.checkboxField}>
                <Checkbox
                  defaultChecked
                  {...register('checkboxField', {
                    required: 'Ce champ est obligatoire',
                  })}
                >
                  Payé
                </Checkbox>
                {errors.checkboxField && (
                  <FormErrorMessage>{errors.checkboxField.message}</FormErrorMessage>
                )}
              </FormControl>
            </VStack>
            <HStack justifyContent="end">
              <Button type='submit' colorScheme="blue" mr={3}>
                Enregistrer
              </Button>
              <Button onClick={onClose}>Retour</Button>
            </HStack>
          </form>

          </ModalBody>
        </ModalContent>
        </Modal>
    </div>
  )
}

export default Subscription
