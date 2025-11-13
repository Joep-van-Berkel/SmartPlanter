#include "LightSensor.h"
#include <Arduino.h>

LightSensor::LightSensor(int pin, int ledPin) {
  _pin = pin;
  _ledPin = ledPin;
}

//reads LDR output
int LightSensor::readLight() {
  _lightVal = analogRead(_pin);
  return _lightVal;
}

void LightSensor::ledSetup() {
  // led setup
	pinMode(_ledPin, OUTPUT);
}

void LightSensor::setLedState(bool state) {
  // switch led on or off
  // can also be used as override
  _ledState = state;
  digitalWrite(_ledPin, state);
}

void LightSensor::checkLight(int ledThresh) {
  if (_lightVal >= ledThresh && digitalRead(_ledPin) != HIGH) {
    setLedState(HIGH);
    Serial.println("turning LED on");
  } else if (_lightVal <= ledThresh && digitalRead(_ledPin) != LOW) {
    setLedState(LOW);
    Serial.println("turning LED off");
  }
}