import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Center, Checkbox, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Table, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure
} from '@chakra-ui/react';
import { MdMode, MdPersonAdd, MdRemoveRedEye } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const View = () => {

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
    },
    mode: 'onBlur'
  })

  
  const {
    handleSubmit: handleSubmitForm2,
    register: registerForm2,
    getValues: getValuesForm2,
    setValue: setValueForm2,
    reset: resetForm2,
    formState: { errors: errorsForm2, isSubmitting: isSubmittingForm2 },
  } = useForm({
    defaultValues: {
      amount: null,
    },
  });

  const {
    handleSubmit: handleSubmitForm3,
    register: registerForm3,
    getValues: getValuesForm3,
    setValue: setValueForm3,
    reset: resetForm3,
    formState: { errors: errorsForm3, isSubmitting: isSubmittingForm3 },
  } = useForm({
    defaultValues: {
      amount: null,
      refund: null
    },
  });

  const [user, setUser] = useState({});
  const [subById, setSubById] = useState([]); 
  const [loanById, setLoanById] = useState([]); 
  const [savingById, setSavingById] = useState([]); 
  const [creditById, setCreditById] = useState([]); 
  const { id } = useParams();

  const [subscriptionId, setSubscriptionId] = useState();
  const [userId, setUserId] = useState();
  const [dateString, setDateString] = useState();
  const [nb_parts, setNb_parts] = useState(); 

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenSub, onOpen: onOpenSub, onClose: onCloseSub } = useDisclosure();  
  const { isOpen: isOpenSavList, onOpen: onOpenSavList, onClose: onCloseSavList } = useDisclosure();  
  const { isOpen: isOpenSav, onOpen: onOpenSav, onClose: onCloseSav } = useDisclosure();  
  const { isOpen: isOpenLoanList, onOpen: onOpenLoanList, onClose: onCloseLoanList } = useDisclosure();  
  const { isOpen: isOpenLoan, onOpen: onOpenLoan, onClose: onCloseLoan } = useDisclosure();  

  const totalAmountSub = subById.reduce((acc, obj) => acc + obj.amount, 0);
  const totalAmountLoan = loanById.reduce((acc, obj) => acc + obj.amount, 0);
  const totalAmountSaving = savingById.reduce((acc, obj) => acc + obj.amount, 0); 

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril',
    'Mai', 'Juin', 'Juillet', 'Août',
    'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data.user)) 
      .catch(error => console.error('Erreur lors de la récupération des données :', error)); 
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/subscriptions/userId/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Réponse réseau incorrecte');
        }
        return response.json();
      })
      .then(data => setSubById(data))
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/loans/userId/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Réponse réseau incorrecte');
        }
        return response.json();
      })
      .then(data => setLoanById(data))
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/savings/userId/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Réponse réseau incorrecte');
        }
        return response.json();
      })
      .then(data => setSavingById(data))
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/credits/userId/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Réponse réseau incorrecte');
        }
        return response.json();
      })
      .then(data => setCreditById(data))
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
  }, [id]);

  function credit(table) {
    let sum = 0;
    table.forEach(objet => {
      sum += objet.new;
    });
    return sum;
  }

  const totalAmountCredit = credit(creditById); 

  const fetchSubscriptionDetailsById = (subscriptionId) => {
    fetch(`http://localhost:5000/subscriptions/${subscriptionId}`)
      .then(response => response.json())
      .then(data => {
        setSubscriptionId(data.Subscription.id);
        setUserId(data.Subscription.userId);
        setDateString(data.Subscription.updatedAt);
      })
      .then(() => {
        onOpenSub();
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
      }
      
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
      onCloseSub();
      onClose()
      window.location.reload()
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des données :', error);
    }
  };
  
  const saveNb_parts = (nbp) => nbp;

  const saveSaving = () => {
    const amount = parseInt(getValuesForm2().amount)

    console.log(id, amount)
  
    fetch('http://localhost:5000/savings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        user: id
      }),
    })
      .then(response => {
        console.log('Réponse du serveur :', response);
  
        if (response.ok) {
          return response.json();
        }
        throw new Error("Erreur" + response.status);
      })
      .catch(error => {
        console.error('Erreur lors de l\'enregistrement des données :', error);
      })
      .finally(() => {
        resetForm2();
        onCloseSav();
        onCloseSavList();
        window.location.reload(true);
      });
  };

  const saveLoan = () => {
    const amount = parseInt(getValuesForm3().amount)
    const refund = parseInt(getValuesForm3().refund)

    console.log(refund, amount, id)
  
    fetch('http://localhost:5000/loans/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: parseInt(id),
        amount: amount,
        refund: refund
      }),
    })
      .then(response => {
        console.log('Réponse du serveur :', response);
  
        if (response.ok) {
          return response.json();
        }
        throw new Error("Erreur" + response.status);
      })
      .catch(error => {
        console.error('Erreur lors de l\'enregistrement des données :', error);
      })
      .finally(() => {
        resetForm3();
        onCloseLoan();
        onCloseLoanList(),
        window.location.reload()
      });
  };

  return (
    <>
      <Heading as={"h1"} fontSize={"1.5rem"} mb={"2em"}><a href={`/membres/`}>MEMBRES</a> &gt; {user.firstname + ' ' + user.lastname}</Heading>
      <VStack align="start" spacing={8} p={8}>

        <Divider border={"1px solid gray"} />

        <HStack w="100%" justifyContent="space-between">
          <HStack>
            <Avatar name={`${user.firstname} ${user.lastname}`} size="xl" src="" />
            <VStack align="start">
              <Text fontWeight={'bold'}>Prénom: <span> {user.firstname} </span> </Text> 
              <Text fontWeight={'bold'}>Nom: <span> {user.lastname}  </span> </Text> 
              <Text fontWeight={'bold'}>Email: <span> {user.email}  </span> </Text> 
              <Text fontWeight={'bold'}>Téléphone: <span> {user.phone}  </span> </Text> 
            </VStack>
          </HStack>
          <Button>Points : {totalAmountCredit}</Button>
          <Button>Crédit : 1000</Button>
        </HStack>

        <Divider border={"1px solid gray"} />

        <HStack w="100%" justifyContent="space-between" spacing={8}>
          <Card w={"15rem"} h={"15rem"} bg={"#d7dce3"}>
            <CardHeader>
              <Heading size="md">SOUSCRIPTIONS</Heading>
            </CardHeader>
            <CardBody fontSize={"1.5rem"}>{totalAmountSub} XOF</CardBody>
            <CardFooter>
              <Button onClick={onOpen} size="xs" colorScheme="teal" variant="solid">
                Voir plus...
              </Button>
            </CardFooter>
          </Card>

          <Card w={"15rem"} h={"15rem"} bg={"#d7dce3"}>
            <CardHeader>
              <Heading size="md">EPARGNE</Heading>
            </CardHeader>
            <CardBody fontSize={"1.5rem"}>{totalAmountSaving} XOF</CardBody>
            <CardFooter>
              <Button onClick={onOpenSavList} size="xs" colorScheme="teal" variant="solid">
                Voir plus...
              </Button>
            </CardFooter>
          </Card>

          <Card w={"15rem"} h={"15rem"} bg={"#d7dce3"}>
            <CardHeader>
              <Heading size="md">PRÊTS</Heading>
            </CardHeader>
            <CardBody fontSize={"1.5rem"}>{totalAmountLoan} XOF</CardBody>
            <CardFooter>
              <Button onClick={onOpenLoanList} size="xs" colorScheme="teal" variant="solid">
                Voir plus...
              </Button>
            </CardFooter>
          </Card>
        </HStack>
      </VStack>

      <Modal size={'6xl'} scrollBehavior='inside' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Liste des souscriptions</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Table size='sm' variant='striped' colorScheme='blackAlpha'>
              <Thead>
                <Tr>
                  <Th>Mois</Th>
                  <Th>Membre</Th>
                  <Th>Montant</Th>
                  <Th>Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {subById.length > 0 ? subById.map((item, index) => (
                  <Tr key={index}>
                    <Td>
                      <HStack>
                        <strong>{months[index]}</strong>
                      </HStack>
                    </Td>
                    <Td>
                      <HStack>
                        <span>{item.user.firstname} {item.user.lastname}</span>
                      </HStack>
                    </Td>
                    <Td>{item.amount}</Td>
                    <Td>{item.createdAt}</Td>
                    <Td>
                      <HStack>
                        <Button size={"xs"} colorScheme='yellow' variant='solid' onClick={() => fetchSubscriptionDetailsById(item.id)}>
                          <MdMode />
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                )) : <Tr><Td colSpan="5" py="2em"><Center>Aucune souscription pour l'instant</Center></Td></Tr>
                }
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal size={'xs'}
        isOpen={isOpenSub}
        onClose={onCloseSub}>
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
              <Button onClick={onCloseSub}>Retour</Button>
            </HStack>
          </form>

          </ModalBody>
        </ModalContent>
      </Modal>


      <Modal size={'6xl'} scrollBehavior='inside' isOpen={isOpenSavList} onClose={onCloseSavList}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Liste des épargnes</ModalHeader>
            
            <Button onClick={onOpenSav} leftIcon={<MdPersonAdd />} flexShrink={0}>
                Nouveau
            </Button>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Table size='sm' variant='striped' colorScheme='blackAlpha'>
              <Thead>
                <Tr>
                  <Th><Checkbox spacing='1rem' bg={"#fff"}></Checkbox></Th>
                  <Th>Membre</Th>
                  <Th>Montant</Th>
                  <Th>Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {savingById.length > 0 ? savingById.map((item, index) => (
                  <Tr key={index}>
                    <Td>
                      <Checkbox spacing="1rem" bg="#fff"></Checkbox>
                    </Td>
                    <Td>
                      <HStack>
                        <Avatar name={`${item.user.firstname} ${item.user.lastname}`} size="sm" src="" />{' '}
                        <span>{item.user.firstname} {item.user.lastname}</span>
                      </HStack>
                    </Td>
                    <Td>{item.amount}</Td>
                    <Td>{item.createdAt}</Td>
                    <Td>
                      <HStack>
                        <Button size={"xs"} colorScheme='yellow' variant='solid' onClick={() => fetchSubscriptionDetailsById(item.id)}>
                          <MdMode />
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                )) : <Tr><Td colSpan="5" py="2em"><Center>Aucune souscription pour l'instant</Center></Td></Tr>
                }
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal size={'xs'}
        isOpen={isOpenSav}
        onClose={onCloseSav}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nouvelle épargne</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack mb={6}>
                <form onSubmit={handleSubmitForm2(saveSaving)}>

                    <FormControl isInvalid={errorsForm2.amount}>
                        <FormLabel>Montant de l'épargne</FormLabel>
                        <Input
                            type="number"
                            placeholder="10000"
                            {...registerForm2('amount', {
                            required: 'Ce champ est obligatoire',
                            minLength: { value: 4, message: 'Montant minimum insuffisant' },
                            })}
                        />
                        <FormErrorMessage>
                          {errorsForm2.amount && errorsForm2.amount.message}
                        </FormErrorMessage>
                    </FormControl>
                    <HStack justifyContent="end" mt={"30px"}>
                      <Button type='submit' colorScheme="blue" mr={3} isLoading={isSubmitting}>
                        Enregistrer
                      </Button>
                      <Button onClick={onCloseSav}>Retour</Button>
                    </HStack>
                </form>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      
      
      <Modal size={'6xl'} scrollBehavior='inside' isOpen={isOpenLoanList} onClose={onCloseLoanList}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Liste des prêts</ModalHeader>
            
            <Button onClick={onOpenLoan} leftIcon={<MdPersonAdd />} flexShrink={0}>
                Nouveau
            </Button>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
                    loanById.length > 0 ? loanById.map((item, index) => (
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
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal size={'xs'}
        isOpen={isOpenLoan}
        onClose={onCloseLoan}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nouveau prêt</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack mb={6}>
                <form onSubmit={handleSubmitForm3(saveLoan)}>
                    <FormControl isInvalid={errorsForm3.amount}>
                        <FormLabel>Montant du prêt</FormLabel>
                        <Input
                            type="number"
                            placeholder="10000"
                            {...registerForm3('amount', {
                            required: 'Ce champ est obligatoire',
                            minLength: { value: 4, message: 'Montant minimum insuffisant' },
                            })}
                        />
                        <FormErrorMessage>
                          {errorsForm3.amount && errorsForm3.amount.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errorsForm3.refund}>
                        <FormLabel>Montant de remboursement</FormLabel>
                        <Input
                        type="number"
                        placeholder="5000"
                        {...registerForm3('refund', {
                            required: 'Ce champ est obligatoire',
                        })}
                        />
                        <FormErrorMessage>
                          {errorsForm3.refund && errorsForm3.refund.message}
                        </FormErrorMessage>
                    </FormControl>
                    <HStack justifyContent="end" mt={"30px"}>
                      <Button type='submit' colorScheme="blue" mr={3} isLoading={isSubmittingForm3}>
                        Enregistrer
                      </Button>
                      <Button onClick={onClose}>Retour</Button>
                    </HStack>
                </form>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default View;
