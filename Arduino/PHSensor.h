#ifndef PHSENSOR_H
#define PHSENSOR_H

#include "DFRobot_PH.h"

class PHSensor {
  public:
    PHSensor(int pin);
    void begin();
    float readPH(float temperature = 20.0); // default temp
  private:
    int _pin;
    DFRobot_PH _ph;
};

#endif
