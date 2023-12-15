import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, HStack, Heading, Text, VStack
} from '@chakra-ui/react';
import { MdRemoveRedEye } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const View = () => {
  const [user, setUser] = useState({});
  const [subById, setSubById] = useState([]); 
  const [loanById, setLoanById] = useState([]); 
  const [savingById, setSavingById] = useState([]); 
  const { id } = useParams();

  const totalAmountSub = subById.reduce((acc, obj) => acc + obj.amount, 0);
  const totalAmountLoan = loanById.reduce((acc, obj) => acc + obj.amount, 0);
  const totalAmountSaving = savingById.reduce((acc, obj) => acc + obj.amount, 0);

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

  return (
    <>
      <Heading as={"h1"} fontSize={"1.5rem"} mb={"2em"}>MEMBRES &gt; {user.firstname + ' ' + user.lastname}</Heading>
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

          <Button colorScheme="blue">Contacter</Button>
        </HStack>

        <Divider border={"1px solid gray"} />

        <HStack w="100%" justifyContent="space-between" spacing={8}>
          <Card w={"15rem"} h={"15rem"} bg={"#d7dce3"}>
            <CardHeader>
              <Heading size="md">SOUSCRIPTIONS</Heading>
            </CardHeader>
            <CardBody fontSize={"1.5rem"}>{totalAmountSub} XOF</CardBody>
            <CardFooter>
              <Button size="xs" colorScheme="teal" variant="solid">
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
              <Button size="xs" colorScheme="teal" variant="solid">
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
              <Button size="xs" colorScheme="teal" variant="solid">
                Voir plus...
              </Button>
            </CardFooter>
          </Card>
        </HStack>
      </VStack>
    </>
  );
};

export default View;
