#include "WaterFlow.h"

WaterFlow* WaterFlow::instance = nullptr;

WaterFlow::WaterFlow(byte pin, float calibrationFactor) {
  this->pin = pin;
  this->calibrationFactor = calibrationFactor;

  pulseCount = 0;
  flowRate = 0.0;
  lastTime = 0;

  instance = this;
}

void WaterFlow::begin() {
  pinMode(pin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(pin), WaterFlow::pulseCounter, FALLING);
  lastTime = millis();
}

void WaterFlow::pulseCounter() {
  if (instance != nullptr) {
    instance->pulseCount++;
  }
}

void WaterFlow::calculateFlow() {
  unsigned long currentTime = millis();
  unsigned long timePassed = currentTime - lastTime;

  if (timePassed >= 1000) {
    noInterrupts();
    unsigned long pulses = pulseCount;
    pulseCount = 0;
    interrupts();

    // Bereken L/min
    flowRate = ((float)pulses / calibrationFactor);

    lastTime = currentTime;
  }
}
