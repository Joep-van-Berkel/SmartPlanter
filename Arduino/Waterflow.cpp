#include "WaterFlow.h"

WaterFlow* WaterFlow::instance = nullptr;
// pointer omdat een interruptfunctie niet direct object kan werken 

WaterFlow::WaterFlow(byte pin, float calibrationFactor) {
// door het object geef je aan op welke pin de sensor zit en de hoeveelheid pulsen per liter
  this->pin = pin;
  this->calibrationFactor = calibrationFactor;

// begin waardes op 0 en 
  pulseCount = 0;
  flowRate = 0.0;
  lastTime = 0;

// koppelt de statische verwijzing aan dit object. 
  instance = this;
}

void WaterFlow::begin() {
  pinMode(pin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(pin), WaterFlow::pulseCounter, FALLING);
  lastTime = millis();
}

// puls binnenkomt wordt count één hoger. instance vanwege statisch
void WaterFlow::pulseCounter() {
  if (instance != nullptr) {
    instance->pulseCount++;
  }
}
// reken flowrate uit - interrupt uit
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
