#ifndef LIGHTSENSOR_H
#define LIGHTSENSOR_H

//libraries
#include <Arduino.h>

//constructor
class LightSensor {
private:
  //variables
  int _pin;
  int _ledPin;
  bool _ledState;
  int _lightVal;

public:
  LightSensor(int pin, int ledPin);     //initializer LDR
  int readLight();          //read LDR resistor

  void ledSetup();  //Setup led
  void setLedState(bool);   //toggle led or relay on/off
  void checkLight(int ledThresh);  //Check light and turn on led of too low
};

#endif