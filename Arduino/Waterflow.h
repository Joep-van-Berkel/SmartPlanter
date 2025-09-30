#ifndef WATERFLOW_H
#define WATERFLOW_H

#include <Arduino.h>

class WaterFlow {
public:
    WaterFlow(byte pinIn, float calibrationFactor = 7.5);

    void begin();
    void update();

    float getFlow() { return flowRate; }
    void setMinFlow(float minValue) { minFlow = minValue; }
    bool isBelowMinimum() { return flowRate < minFlow; }

    float getFlowIn()  { return flowRateIn; }
    float getDifference() { return flowRateIn; }

  private:
    byte pinIn;

    volatile unsigned long pulseCountIn;
    float flowRate;
    float minFlow;

    float calibrationFactor; // meestal rond 7.5, maar testen!

    unsigned long lastTime;
    float flowRateIn;

    // pointers om naar huidig object te verwijzen
    static WaterFlow* instance;

};


#endif
