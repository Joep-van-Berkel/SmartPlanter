#ifndef WATERFLOW_H
#define WATERFLOW_H

#include <Arduino.h>
#include <math.h>

class WaterFlow {
public:
    // Constructor met pin en calibratiefactor
    WaterFlow(byte pin, float calibrationFactor);

    void begin();
    void calculateFlow();

    int getFlowInt() { return (int)round(flowRate); }
    float getFlow() { return flowRate; }

private:
    byte pin;
    float calibrationFactor;

    volatile unsigned long pulseCount;
    float flowRate;

    unsigned long lastTime;

    static WaterFlow* instance;

    // ISR
    static void pulseCounter();
};

#endif
