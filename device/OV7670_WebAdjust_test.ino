#include <Wire.h>
#include <WiFi.h>
#include "BLEDevice.h"
#include "BLEServer.h"
#include <EEPROM.h>
#include "esp_log.h"
#include "OV7670.h"

//==========|Параметры для подключения к wifi|==========/
String ssid;
String password;
//======================================================/

//==========|Параметры для подключения bluetooth|==========/
#define EEPROM_SIZE 512
#define SERVICE_UUID "3a38eab7-d5a1-44e3-9a7f-ccaf11faf364"
#define CHARATERISTIC_DATA_UUID "7c4c7b38-20b3-4c28-81a3-e367165bb041"

BLEService *pService;
BLEAdvertising *pAdvertising;
bool _messageReceivedComplete = false;
std::string _message;
//========================================================/

//==========|Параметры для подключения к серверу|==========/
String host;
int port;  
//=========================================================/

#define SETTINGS_PIN 2

#define LED_BLUETOOTH 27
#define LED_WIFI 26
#define LED_SEND 25

#define UNIT_SIZE  1280 //стандартная длина пакета для передачи
uint8_t *camData; //ссылка на буфер данных

String idKey;
int settings = LOW;
int delaySec = 0;
int maxDelay = 60;
bool deviceConnected = false;


//==========|Параметры для конфигурации камеры|==========/
const camera_config_t cam_conf = {
	.D0	= 5,
	.D1 = 18,
	.D2 = 19,
	.D3 = 15, //2
	.D4 = 14,
	.D5 = 13,
	.D6 = 12,
	.D7 = 4,
	.XCLK = 32,	
	.PCLK = 33,
	.VSYNC = 34,
	.xclk_freq_hz = 10000000,				// XCLK 10MHz
	.ledc_timer		= LEDC_TIMER_0,
	.ledc_channel = LEDC_CHANNEL_0	
};
//	SSCB_SDA(SIOD) 	--> 21(ESP32)
//	SSCB_SCL(SIOC) 	--> 22(ESP32)
//	RESET   --> 3.3V
//	PWDN		--> GND
//	HREF		--> NC
//=======================================================/

//==========|Выбор разрешения камеры|==========/
#define CAM_RES			VGA			// Разрешение камеры
#define CAM_WIDTH		640			// Ширина камеры
#define CAM_HEIGHT	480			// Высота камеры
#define CAM_DIV			 15			// Количество делений экрана

//#define CAM_RES			CIF			
//#define CAM_WIDTH		352			
//#define CAM_HEIGHT	288			
//#define CAM_DIV				4			

//#define CAM_RES			QVGA		
//#define CAM_WIDTH		320			
//#define CAM_HEIGHT	240			
//#define CAM_DIV				4		

//#define CAM_RES			QCIF		
//#define CAM_WIDTH		176			
//#define CAM_HEIGHT	144			
//#define CAM_DIV				1			

//#define CAM_RES			QQVGA		
//#define CAM_WIDTH		160			
//#define CAM_HEIGHT	120			
//#define CAM_DIV				1			
//=============================================/

OV7670 cam; // Инициализация объекта камеры
WiFiClient client; //Инициализация объекта wifi клиента

//==========|Подключение к wifi сети|==========/
bool wifiConnect() {
  WiFi.begin(ssid.c_str(), password.c_str()); //Подключение к wifi
	Serial.print("Connecting Wifi");

  //Ожидание подключения
  int i = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    i++;
    if(i > 20) {
       Serial.println();
      return false;
    }
  }
  digitalWrite(LED_WIFI, HIGH);
  //Вывод дополнительной информации
  Serial.println();
	Serial.println(("--- WiFi connected ---"));
 	Serial.print("SSID: ");
	Serial.println( WiFi.SSID() );
	Serial.print(F("IP Address: "));
	Serial.println( WiFi.localIP() );
  return true;
}
//=============================================/

void wifiDisconnect() {
  delay(500);
  WiFi.disconnect(); //Отключение от wifi
  digitalWrite(LED_WIFI, LOW);
  Serial.println("Wifi stop");
}


//==========|Настройка bluetooth|==========/

class ServerReadCallbacks: public BLECharacteristicCallbacks
{
    void onWrite(BLECharacteristic *pCharacteristic)
    {
      _message = pCharacteristic->getValue();
      _messageReceivedComplete = true;
    }
};

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };
 
    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};

void settingsBluetooth() {
  BLEDevice::init("Camera"); 
    // Создаем BLE-сервер:
  BLEServer *pServer = BLEDevice::createServer();
  
  pServer->setCallbacks(new MyServerCallbacks());

  // Создаем BLE-сервис:
  pService = pServer->createService(SERVICE_UUID);
  
  // Создаем BLE-характеристику:
  BLECharacteristic *pCharacteristicData;
  pCharacteristicData = pService->createCharacteristic(
                          CHARATERISTIC_DATA_UUID,
                          BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
                        );
  pCharacteristicData->setCallbacks(new ServerReadCallbacks());

  // запускаем оповещения (advertising):
  pAdvertising = pServer->getAdvertising();

  pService->start();

  pCharacteristicData->setValue(EEPROM.readString(0).c_str());
}


//=============================================/

//==========|Обработка данных с  bluetooth|==========/
void writeBluetooth() {
  if (_messageReceivedComplete)
  {
    _messageReceivedComplete = false;
    
    int k = 0; 
    String buffer;
    for(int i = 0; i <  _message.length(); i++) {

      if(_message[i] == ',') {
        if(k > 5) {
          break;
        }
        Serial.println("test: " + buffer);
        if (buffer.length() < 64 && buffer.length() > 0) {
          EEPROM.writeString(64 * k, buffer.c_str());
        }
        buffer = "";
        k++;
      } else {
        buffer += _message[i];
      }       
    }
    EEPROM.commit();
  }
}
//=============================================/

void BluetoothOn() {

  digitalWrite(LED_BLUETOOTH, HIGH);
  delay(500);

  pAdvertising->start();
  Serial.println("Bluetooth ON");
}


void BluetoothOff() {

  digitalWrite(LED_BLUETOOTH, LOW);
  delay(500);
  ESP.restart(); 
  Serial.println("Bluetooth OFF");
}


//==========|Подключение к серверу|==========/
bool clientConnect() {
  client.connect(host.c_str(), port);
  delay(500);
  if (!client.connected()) {
    Serial.println("connection failed");
    return false;
  }
  Serial.println("connection OK");
  return true;
}
//===========================================/

void clientDisconnect() {
  delay(500);
  client.stop(); // Отключение от сервера
  Serial.println("client stop");
}

//==========|Отправка изображения|==========/
void sendRowImg(uint16_t len) {
  uint16_t send_size;
  uint8_t *pData;
  pData = camData;
  
/*
  
  client.write(pData, len ); // передача данных через на сервер
*/
  
  
  while(len > 0){
    send_size = (len > UNIT_SIZE) ? UNIT_SIZE : len; 
    client.write(pData, send_size ); // передача данных через на сервер
    
    len -= send_size;
    pData += send_size;
  }
  
}
//===========================================/

void sendFullImg() {
  uint16_t y,dy;
  Serial.println("send photo...");
  dy = CAM_HEIGHT / CAM_DIV;          // Количество строк, отправленных за один раз

  int lamp = LOW;
  
  for( y = 0; y < CAM_HEIGHT; y += dy){
    lamp = lamp == LOW ? HIGH : LOW;
    
    digitalWrite(LED_SEND, lamp);
    cam.getLines( y+1 , camData , dy);  // Запись строк изображения в буфер
    sendRowImg(dy*CAM_WIDTH*2); // Отправка изображения
    
  }
  digitalWrite(LED_SEND, LOW);
}

void sendKey() {
  client.write(idKey.c_str());
  
}
    
void setup() {
  Serial.begin(115200);
  Serial.println("Start"); 
  EEPROM.begin(EEPROM_SIZE);
	Wire.begin();
	Wire.setClock(400000);


  pinMode(SETTINGS_PIN, INPUT);
 
  pinMode(LED_BLUETOOTH, OUTPUT);
  pinMode(LED_WIFI, OUTPUT);
  pinMode(LED_SEND, OUTPUT);

  
  //достаем данные из пзу
  ssid = EEPROM.readString(0);
  password = EEPROM.readString(64);
  host = EEPROM.readString(128);
  port = EEPROM.readString(192).toInt();
  maxDelay = EEPROM.readString(256).toInt();
  idKey = EEPROM.readString(320);


  camData = (uint8_t*)malloc(CAM_HEIGHT / CAM_DIV * CAM_WIDTH * 2); //Выделение памяти под буфер

  esp_err_t err = cam.init(&cam_conf, CAM_RES, RGB565);    // Инициализировать камеру (PCLK 20 МГц)
  if(err != ESP_OK)   Serial.println(F("cam.init ERROR"));

  cam.setPCLK(2, DBLV_CLK_x4);  // Изменение PCLK: 10 МГц / (предварительно + 1) * 4-> 13,3 МГц 

  //cam.vflip( false );   // Поворот экрана на 180 градусов

settingsBluetooth();
	 
}

void loop(void) {

  if(settings != digitalRead(SETTINGS_PIN)) {
    settings = digitalRead(SETTINGS_PIN);
      if(settings == HIGH) {
        BluetoothOn();
      }
      else {
        BluetoothOff();
      }
  }

  if(settings == HIGH) {
      writeBluetooth();
  } 
  else {
    if(delaySec > maxDelay && wifiConnect()) { // Подключение к wifi
      if(clientConnect()) { // Подключение к серверу
       sendKey();
       sendFullImg();
       clientDisconnect();
      }
      Serial.println("TEST");
      wifiDisconnect();
      delaySec = 0;
    }
  }


  delaySec++;
  delay(1000); 
}
