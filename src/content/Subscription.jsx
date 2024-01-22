import { Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Avatar, HStack, Button, Checkbox, Flex, Input, Divider, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, useDisclosure, VStack, Center, FormErrorMessage } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdMode, MdSearch } from 'react-icons/md'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'

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
      nb_part: null,
      checkboxField: false
    },
    mode: 'onBlur'
  })

  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionId, setSubscriptionId] = useState();
  const [userId, setUserId] = useState();
  const [users, setusers] = useState([]);
  const [dateString, setDateString] = useState();
  const [nb_parts, setNb_parts] = useState(); 
  const [month, setMonth] = useState(); 
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

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

  const fetchSubscriptionDetailsById = (subscriptionId) => {
    fetch(`http://localhost:5000/subscriptions/${subscriptionId}`)
      .then(response => response.json())
      .then(data => {
        setSubscriptionId(data.Subscription.id);
        setUserId(data.Subscription.userId);
        setDateString(data.Subscription.updatedAt);
      })
      .then(() => {
        onOpen();
      })
      .catch(error => console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error));
  };

  function creditCalculate(mois, nombreDeParts) {
    // Vérifier si le mois est valide (entre 1 et 12)
    if (mois < 1 || mois > 12) {
      console.log("Mois invalide.");
      return 0;
    }
  
    // Calculer le nombre de points en fonction du mois
    const points = 12 - mois;
  
    // Attribuer des points en fonction du nombre de parts
    const totalPoints = points * nombreDeParts;
  
    return totalPoints;
  }
  
  const saveCredit = async (subscriptionId, userId, dateString, nb_parts) => {
    console.log(subscriptionId, userId, dateString, nb_parts)
    const isoDateString = new Date(dateString).toISOString();
    const dateObject = new Date(isoDateString);
    const intMonth = dateObject.getMonth() + 1;
    const intHour = dateObject.getHours(); console.log(dateObject, intHour)
    const credit = creditCalculate(intMonth, nb_parts); console.log(intMonth,credit)
  
    try {
      const response = await fetch('http://localhost:5000/credits/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new: credit,
          userId: userId,
          subscriptionId: subscriptionId
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }else {
        console.log("Nouveau credit OK !!!")
      }

    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des données :', error);
    }
  };

  const updateCredit = async (creditId, dateString, nb_parts) => {
    try {
      const isoDateString = new Date(dateString).toISOString();
      const dateObject = new Date(isoDateString);
      const intMonth = dateObject.getMonth() + 1;
  
      const credit = creditCalculate(intMonth, nb_parts);  console.log(intMonth, nb_parts)
  
      const response = await fetch(`http://localhost:5000/credits/${creditId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new: credit,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      } else {
        console.log("Modif OK !!!");
      }
    } catch (error) {
      console.error('Erreur lors de la modification des données :', error);
    }
  };
  
  const savePayment = async () => {
    setNb_parts(getValues().nb_part); 
    const nb = saveNb_parts(getValues().nb_part);
    const penality = getValues().checkboxField;
  
    const amount = nb * 2000; 
  
    try {
      const response = await fetch(`http://localhost:5000/subscriptions/${subscriptionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          updatedAt: new Date(),
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }else {
        if(penality == true) {
          try {
            const response = await fetch(`http://localhost:5000/penalities`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: userId,
                subscriptionId: subscriptionId,
                amount: 500
              }),
            });
          }  catch (error) {
            console.error('Erreur lors de l\'enregistrement de la pénalité :', error);
          }
        }
      }
  
      const data = await response.json();
  
      setSubscriptions(prevSubscriptions =>
        prevSubscriptions.map(sub =>
          sub.id === subscriptionId
            ? { ...sub, amount: data.Subscription.amount, updatedAt: data.Subscription.updatedAt }
            : sub
        )
      );
      
      (async () => {
        try {
          const response = await fetch(`http://localhost:5000/credits/subscriptionId/${subscriptionId}`);
          if (!response.ok) {
            console.error(`Erreur lors de la récupération des détails du crédit pour le subscriptionId ${subscriptionId}`);
            return; // Sortir de la fonction si la requête échoue
          }
      
          const data = await response.json();
          if (data && data.length > 0) {
            updateCredit(data[0].id, dateString, nb)
          } else {
            // S'il y a des données de crédit, exécutez saveCredit
            const creditDetails = data[0]; // Utilisez le premier élément si plusieurs crédits sont retournés
            await saveCredit(subscriptionId, userId, dateString, nb);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des détails de crédit :', error);
          // Gérez l'erreur ici si nécessaire
        }
      })();
      
      reset();
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des données :', error);
    }
  };
  
  const saveNb_parts = (nbp) => nbp;

  

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
        <Table>
          <Accordion defaultIndex={[0]} allowMultiple>
            {users.length > 0 ? users.map((user, userIndex) => (
              <AccordionItem key={userIndex}>
                <h2>
                  <AccordionButton>
                    <Table bg="#dbdbdb">
                      <Tr>
                        <Th>{user.firstname} {user.lastname}</Th>
                        <Th></Th>
                      </Tr>
                    </Table>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {subscriptions.length > 0 ? subscriptions
                    .filter(subscription => subscription.user.id === user.id) // Filtrer les souscriptions par utilisateur
                    .map((subscription, subIndex) => (
                      <Table key={subIndex}>
                        <Tr>
                          <Td>
                            <Checkbox spacing="1rem" bg="#fff"></Checkbox>
                          </Td>
                          <Td>{subscription.user.id}</Td>
                          <Td>
                            <HStack>
                              <Avatar name={`${subscription.user.firstname} ${subscription.user.lastname}`} size="sm" src="" />{' '}
                              <span>{subscription.user.firstname} {subscription.user.lastname}</span>
                            </HStack>
                          </Td>
                          <Td>{subscription.amount}</Td>
                          <Td>{subscription.updatedAt}</Td>
                          <Td>
                            <HStack>
                              <Button size={"xs"} colorScheme='yellow' variant='solid' onClick={() => fetchSubscriptionDetailsById(subscription.id)}>
                                <MdMode />
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      </Table>
                    )) : <Tr><Td colSpan="5" py="2em"><Center>Aucune souscription pour l'instant</Center></Td></Tr>
                  }
                </AccordionPanel>
              </AccordionItem>
            )) : <Tr><Td colSpan="5" py="2em"><Center>Aucun user pour l'instant</Center></Td></Tr>}
          </Accordion>
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
          <form onSubmit={handleSubmit(savePayment)}  >
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
                  {...register('checkboxField')}
                >
                  Pénalité
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
