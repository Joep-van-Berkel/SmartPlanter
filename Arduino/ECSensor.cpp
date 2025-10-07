#include "ECSensor.h"
#include <Arduino.h>

ECSensor::ECSensor(int pin) {
    _pin = pin;
}

void ECSensor::begin() {
    // No special initialization needed for analog EC sensor
}

float ECSensor::readEC() {
    int sensorValue = analogRead(_pin);
    float voltage = sensorValue * (5.0 / 1023.0); // Assuming 5V ADC reference
    
    // Example conversion: (calibration needed for your sensor)
    // For DFRobot SEN0244: EC (mS/cm) = (voltage - 0.4) * 6.25
    float ec = (voltage - 0.4) * 6.25;    
    if (ec < 0) ec = 0;
    return ec;
}
