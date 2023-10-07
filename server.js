const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const router = require('./routes/routes.js');

const port = 5000;

// connexion à la base de données

// initialisation du serveur
const server = express();

// middleware permettant d'autoriser les adresses de site à accéder au serveur
server.use(cors({
  origin: "*"
}));

// middleware permettant de récupérer les données envoyées sous forme de json
server.use(express.json());

server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));

router(server);

server.listen(port, () => console.log(`Le serveur est démarré sur le port ${port}`));
