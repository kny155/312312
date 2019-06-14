import cv from 'opencv4nodejs';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const minConfidence = process.env.DETECT_CONFIDENCE || 0.5;
const objects = process.env.DETECT_OBJECTS.split(', ') || [];
const darknetPath = process.env.DARKNET_PATH;
const cfgPath = process.env.CFG_FILE;
const weightsPath = process.env.WEIGHTS_FILE;
const namesPath = process.env.NAMES_FILE;
const detectedPath = process.env.DETECTED_PATH;
const saveNumImg = process.env.SAVING_NUMBER_IMG || 50;

// replace with path where you unzipped darknet model

const cfgFile = path.resolve(darknetPath, cfgPath);
const weightsFile = path.resolve(darknetPath, weightsPath);
const labelsFile = path.resolve(darknetPath, namesPath);

const classNames = fs
  .readFileSync(labelsFile)
  .toString()
  .split('\n');

// initialize tensorflow darknet model from modelFile
const net = cv.readNetFromDarknet(cfgFile, weightsFile);
const allLayerNames = net.getLayerNames();
const unconnectedOutLayers = net.getUnconnectedOutLayers();

// determine only the *output* layer names that we need from YOLO
const layerNames = unconnectedOutLayers.map(layerIndex => {
  return allLayerNames[layerIndex - 1];
});

const classifyImg = async img => {
  //Изменяет размер исходного изображения
  const [imgHeight, imgWidth] = img.sizes;
  const cof = imgHeight > imgWidth ? 608 / imgWidth : 608 / imgHeight;
  const newWidth = Math.round(imgWidth * cof);
  const newHeight = Math.round(imgHeight * cof);
  const imgResized = await img.resizeAsync(newHeight, newWidth);

  //детектирование объекта работает с изображением 608х608
  const size = new cv.Size(608, 608);
  const vec3 = new cv.Vec(0, 0, 0);

  // сеть принимает "капли" в качестве входных данных
  const inputBlob = await cv.blobFromImageAsync(
    imgResized,
    1 / 255.0,
    size,
    vec3,
    true,
    false,
  );
  net.setInput(inputBlob);

  // прямой проход через всю сеть
  const layerOutputs = await net.forwardAsync(layerNames);

  return await getPredictions(layerOutputs, img.sizes);
};

const getPredictions = async (layerOutputs, sizes) => {
  const detectionObjs = [];
  const objectCenters = [];

  const processingObject = processingMethod(sizes, objectCenters);

  layerOutputs.forEach(mat => {
    const output = mat.getDataAsArray();
    output.forEach(async detection => {
      //получить все прогнозы объекта
      const scores = detection.slice(5);
      //получить id и название класса объекта
      const classLabel = scores.indexOf(Math.max(...scores));
      const className = classNames[classLabel];
      //получить процент уверенность объекта
      const confidence = scores[classLabel];

      //проверка на подходящий объект
      const validConfidence = confidence > minConfidence;
      const validClass = objects.some(name => className === name);

      if (validConfidence && validClass) {
        const box = detection.slice(0, 4);
        const foundObject = await processingObject(className, confidence, box);
        if (foundObject) {
          detectionObjs.push(foundObject);
        }
      }
    });
  });
  return detectionObjs;
};

const processingMethod = (sizes, objectCenters) => async (
  className,
  confidence,
  box,
) => {
  const [imgHeight, imgWidth] = sizes;
  const centerX = parseInt(box[0] * imgWidth);
  const centerY = parseInt(box[1] * imgHeight);
  const width = parseInt(box[2] * imgWidth);
  const height = parseInt(box[3] * imgHeight);

  const x = parseInt(centerX - width / 2);
  const y = parseInt(centerY - height / 2);

  const rect = new cv.Rect(x, y, width, height);
  //проверка на детектирование одного объекта как двух
  const oneObject = !objectCenters.some(item => {
    const checkX = Math.abs(centerX - item.centerX) < 10;
    const checkY = Math.abs(centerY - item.centerY) < 10;

    return checkX && checkY;
  });

  //проверка что нет объекта почти на всю картинку
  const normSizeObj = !(+box[2] > 0.8 || +box[3] > 0.8);

  if (oneObject && normSizeObj) {
    objectCenters.push({ centerX, centerY });
    return {
      className,
      confidence,
      rect,
    };
  } else {
    return null;
  }
};

const drawRect = (image, rect, color) => {
  image.drawRectangle(rect, color, 2, cv.LINE_8);
};

const drawText = (image, text, point, textColor) => {
  // put text on the object
  image.putText(text, point, cv.FONT_HERSHEY_SIMPLEX, 0.5, textColor, 1);
};

const workWithFiles = async idCam => {
  const dir = `${detectedPath}/${idCam}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.readdir(dir, (err, items) => {
    let i = 0;
    for (let item of items) {
      if (items.length - i > saveNumImg) {
        i++;
        fs.unlink(`${dir}/${item}`, err => {
          if (err) throw err;
          console.log(`successfully deleted ${dir}/${item}`);
        });
      } else {
        return;
      }
    }
  });
};

const drawClassDetections = (drawImg, predictions) => {
  predictions.forEach(p => {
    const rectangleColor = new cv.Vec(0, 0, 255);
    const textColor = new cv.Vec(0, 255, 255);

    const point = new cv.Point(p.rect.x, p.rect.y + 10);
    const text = ~~(p.confidence * 100) + '%';

    drawRect(drawImg, p.rect, rectangleColor);
    drawText(drawImg, text, point, textColor);
  });
};

export default async (img, idCam) => {
  const predictions = await classifyImg(img);

  drawClassDetections(img, predictions);

  workWithFiles(idCam);

  const timeNow = Date.now();
  cv.imwriteAsync(`${detectedPath}/${idCam}/${timeNow}.jpg`, img);

  return predictions.length;
};
