#ifndef TEMPERATUUR_H
#define TEMPERATUUR_H

#include <OneWire.h>
#include <DallasTemperature.h>

class TemperatuurSensor {
public:
  TemperatuurSensor(uint8_t pin);   // Constructor met pin-nummer
  void begin();                     // Initialisatie
  float readTemperatureC();         // Lees temperatuur in °C
  float readTemperatureF();         // Lees temperatuur in °F

private:
  OneWire oneWire;
  DallasTemperature sensors;
};

#endif
