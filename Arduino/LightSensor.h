#ifndef LIGHTSENSOR_H
#define LIGHTSENSOR_H

//libraries
#include <Arduino.h>

//constructor
class LightSensor {

public:
  LightSensor(int pin); //initializer
  int readLight();  //read resistor or other light sensor

  //add function to toggle LED strip based on treshhold

private:
  int _pin;
};

#endif