import cv from 'opencv4nodejs';
import logger from '../utils/logger';
import parseImage from './parseImage';
import detectCars from '../detect/detectCars';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const parkingId = process.env.PARKING_KEY || '000000000000';

export default socket => {
  const BufferRGB565 = [];
  let deviceId;

  socket.setTimeout(5000);

  console.log('connect');
  const start = Date.now();

  //Запускается при получении данных.
  socket.on('data', data => {
    if (!deviceId) {
      if (data.length > 30) {
        deviceId = data.slice(0, 24).toString('utf8');
        BufferRGB565.push(data.slice(8));
      } else {
        deviceId = data.toString('utf8');
      }
      console.log(deviceId);
    } else {
      //console.log(data);
      BufferRGB565.push(data);
    }
  });

  //Выдается, когда другой конец сокета отправляет пакет FIN.
  socket.on('end', async () => {
    const finish = Date.now();
    console.log('Finish send data: ' + (+finish - +start) / 1000 + 's.');

    const BufferBGR888 = await parseImage(BufferRGB565);
    const img = new cv.Mat(Buffer.from(BufferBGR888), 480, 640, cv.CV_8UC3);
    const seats = await detectCars(img, deviceId);
    try {
      await axios.put(`http://192.168.43.150:5000/devices`, {
        parkingId,
        seats,
        deviceId,
      });
    } catch (e) {
      console.log(e.message);
    }

    console.log(parkingId, deviceId, seats);
    console.log('client disconnected');
  });

  //Запускается, если сокет простаивает из-за неактивности.
  socket.on('timeout', () => {
    console.log('timeout');
    logger.error(
      `Very long pause between data transfer. [Device: ${deviceId}]`,
    );
    socket.destroy();
  });

  //Запускается после полного закрытия сокета.
  socket.on('close', () => {
    const finish = Date.now();
    console.log('Finish detect: ' + (+finish - +start) / 1000 + 's.');
  });
};
