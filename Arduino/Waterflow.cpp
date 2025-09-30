#include "WaterFlow.h"

WaterFlow* WaterFlow::instance = nullptr;

WaterFlow::WaterFlow(byte pinIn, float calibrationFactor) {
  this->pinIn = pinIn;
  this->calibrationFactor = calibrationFactor;

  pulseCountIn = 0;
  flowRateIn = 0;

  lastTime = 0;

  instance = this; // zodat de static interrupt toegang heeft
}

void WaterFlow::begin() {
  pinMode(pinIn, INPUT_PULLUP);

}

void WaterFlow::update() {
  unsigned long currentTime = millis();
  unsigned long timePassed = currentTime - lastTime;

  if (timePassed >= 1000) { // elke seconde berekenen
    noInterrupts();
    unsigned long pulsesIn = pulseCountIn;
    pulseCountIn = 0;
    interrupts();

    flowRateIn  = ((float)pulsesIn  / calibrationFactor);

    lastTime = currentTime;
  }
}

