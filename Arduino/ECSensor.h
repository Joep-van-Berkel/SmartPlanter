#ifndef ECSENSOR_H
#define ECSENSOR_H

#include <Arduino.h>

class ECSensor {
  public:
    ECSensor(int pin);
    void begin();
    float readEC(); // Returns EC value in mS/cm
  private:
    int _pin;
};

#endif
