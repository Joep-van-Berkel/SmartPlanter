#include "Temperatuur.h"

TemperatuurSensor::TemperatuurSensor(uint8_t pin)
  : oneWire(pin), sensors(&oneWire) {
}

void TemperatuurSensor::begin() {
  sensors.begin();
}

float TemperatuurSensor::readTemperatureC() {
  sensors.requestTemperatures();
  return sensors.getTempCByIndex(0);
}

float TemperatuurSensor::readTemperatureF() {
  sensors.requestTemperatures();
  return sensors.getTempFByIndex(0);
}
