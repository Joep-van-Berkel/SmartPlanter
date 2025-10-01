#include "LightSensor.h"
#include <Arduino.h>

LightSensor::LightSensor(int pin) {
  _pin = pin;
}

//reads output
int LightSensor::readLight() {
  int lightVal = analogRead(_pin);
  return lightVal;
}