#include "ECSensor.h"
#include <Arduino.h>

// Calibration factor to scale EC so that a known solution reads correctly
// This maps the current observed reading of 17.92 mS/cm to the expected 12.88 mS/cm
static const float EC_CALIBRATION_FACTOR = 12.88f / 17.92f; // ≈ 0.71875

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
    // Apply single-point calibration scaling
    ec *= EC_CALIBRATION_FACTOR;
    if (ec < 0) ec = 0;
    return ec;
}
