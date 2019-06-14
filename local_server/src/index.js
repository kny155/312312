import express from 'express';
import bodyParser from 'body-parser'
import net from 'net'
import dotenv from 'dotenv';
import createServer from './net/createSocketServer'
import detectCars from './detect/detectCars';
import cv from 'opencv4nodejs';

const app = express();
dotenv.config();

const socketPort = process.env.SOCKET_PORT || 9095;
const serverPort = process.env.SERVER_PORT || 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('../data'));

app.get('/', async (req, res) => {
  const img = cv.imread('./data/img/kek1.jpg');
  const count = await detectCars(img, "FG9G3HD9D");
  res.send({ statue: 'ok', detect: count });
});

const server = net.createServer(createServer);

server.listen(socketPort, "");

app.listen(serverPort, () => {
  console.log('Server started');
});

