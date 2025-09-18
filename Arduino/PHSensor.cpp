#include "PHSensor.h"
#include <Arduino.h>

PHSensor::PHSensor(int pin) {
    _pin = pin;
}

void PHSensor::begin() {
    _ph.begin();
}

float PHSensor::readPH(float temperature) {
    float voltage = analogRead(_pin) / 1024.0 * 5000;
    return _ph.readPH(voltage, temperature);
}
