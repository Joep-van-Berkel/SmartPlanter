#include <lmic.h>
#include <hal/hal.h>
#include <SPI.h>
#include <math.h>

#include "Waterflow.h"
#include "PHSensor.h"
#include "Temperatuur.h"
#include "LightSensor.h"
#include "ECSensor.h"

PHSensor phSensor(A0);
TemperatuurSensor TemperatuurSensor(3);
ECSensor ecSensor(A1);
LightSensor LightSensor(A2);
WaterFlow WaterflowSensorBegin(A4, 7.5);
WaterFlow WaterflowSensorEind (A5, 7.5); 

//variables
int  roundFlowBegin, roundFlowEind;
volatile int pulseCountBegin, pulseCountEind; // Volatile because it is in an interrupt context
bool stateBegin, stateEind;

// LoRaWAN NwkSKey, network session key
// This is the default Semtech key, which is used by the early prototype TTN
// network.
static const PROGMEM u1_t NWKSKEY[16] = { 0xE7, 0x80, 0x4E, 0xFE, 0xAE, 0x2E, 0x89, 0xA4, 0x9A, 0x95, 0x1E, 0x14, 0x3C, 0xE2, 0x1F, 0x51 };

// LoRaWAN AppSKey, application session key
// This is the default Semtech key, which is used by the early prototype TTN
// network.
static const u1_t PROGMEM APPSKEY[16] = { 0x8D, 0x08, 0x04, 0x95, 0xF2, 0x6C, 0xEA, 0x16, 0x86, 0x1A, 0x24, 0xF0, 0xDE, 0xCA, 0x9A, 0x61 };

// LoRaWAN end-device address (DevAddr)
static const u4_t DEVADDR = 0x260BE532;  // <-- Change this address for every node!

// These callbacks are only used in over-the-air activation, so they are
// left empty here (we cannot leave them out completely unless
// DISABLE_JOIN is set in config.h, otherwise the linker will complain).
void os_getArtEui(u1_t* buf) {}
void os_getDevEui(u1_t* buf) {}
void os_getDevKey(u1_t* buf) {}

static uint8_t mydata[] = "Hello, world!";
static osjob_t sendjob, scanjob;

// cyclus berichten sturen in secondes
const unsigned TX_INTERVAL = 20;

const unsigned SCAN_INTERVAL = 1;

// Pin mapping
const lmic_pinmap lmic_pins = {
  .nss = 10,
  .rxtx = LMIC_UNUSED_PIN,
  .rst = 9,
  .dio = { 2, 6, 7 },
};

void onEvent(ev_t ev) {
  Serial.print(os_getTime());
  Serial.print(": ");
  switch (ev) {
    case EV_SCAN_TIMEOUT:
      Serial.println(F("EV_SCAN_TIMEOUT"));
      break;
    case EV_BEACON_FOUND:
      Serial.println(F("EV_BEACON_FOUND"));
      break;
    case EV_BEACON_MISSED:
      Serial.println(F("EV_BEACON_MISSED"));
      break;
    case EV_BEACON_TRACKED:
      Serial.println(F("EV_BEACON_TRACKED"));
      break;
    case EV_JOINING:
      Serial.println(F("EV_JOINING"));
      break;
    case EV_JOINED:
      Serial.println(F("EV_JOINED"));
      break;
    case EV_RFU1:
      Serial.println(F("EV_RFU1"));
      break;
    case EV_JOIN_FAILED:
      Serial.println(F("EV_JOIN_FAILED"));
      break;
    case EV_REJOIN_FAILED:
      Serial.println(F("EV_REJOIN_FAILED"));
      break;
    case EV_TXCOMPLETE:
      Serial.println(F("EV_TXCOMPLETE (includes waiting for RX windows)"));
      if (LMIC.txrxFlags & TXRX_ACK)
        Serial.println(F("Received ack"));
      if (LMIC.dataLen) {
        Serial.println(F("Received "));
        Serial.println(LMIC.dataLen);
        Serial.println(F(" bytes of payload"));
      }
      // Schedule next transmission
      os_setTimedCallback(&sendjob, os_getTime() + sec2osticks(TX_INTERVAL), do_send);
      break;
    case EV_LOST_TSYNC:
      Serial.println(F("EV_LOST_TSYNC"));
      break;
    case EV_RESET:
      Serial.println(F("EV_RESET"));
      break;
    case EV_RXCOMPLETE:
      // data received in ping slot
      Serial.println(F("EV_RXCOMPLETE"));
      break;
    case EV_LINK_DEAD:
      Serial.println(F("EV_LINK_DEAD"));
      break;
    case EV_LINK_ALIVE:
      Serial.println(F("EV_LINK_ALIVE"));
      break;
    default:
      Serial.println(F("Unknown event"));
      break;
  }
}

void do_scan(osjob_t* j) {
  // Hier worden de pulsen geteld en berekent 
  float flowRateBegin = pulseCountBegin / 7.5;
  float flowRateEind = pulseCountEind / 7.5;
  // Hier worden de komma getallen afgerond naar hele getallen, op die manier zijn het kleinere datapakketjes.
  roundFlowBegin = (int)round(flowRateBegin);
  roundFlowEind = (int)round(flowRateEind);

  // Serial.println("begin = " + String(roundFlowBegin));
  // Serial.println("eind  = " + String(roundFlowEind));
  
  // Hier worden de pulsen weer omgezet naar 0 voor de volgende meeting.
  pulseCountBegin=0;
  pulseCountEind=0;

  // Schedule next transmission
  os_setTimedCallback(&scanjob, os_getTime() + sec2osticks(SCAN_INTERVAL), do_scan);

}


void do_send(osjob_t* j) {

    // sensor waarde ophalen
    float temperatuurValue = TemperatuurSensor.readTemperatureC();
    float phValue = phSensor.readPH(temperatuurValue);
    uint16_t lightVal = LightSensor.readLight(); //lichtsensor
    uint8_t startFlow = roundFlowBegin;  //1e flowsensor
    uint8_t endFlow = roundFlowEind; //Veranderen naar 2e sensor wanneer deze beschikbaar is
    float ecVal = ecSensor.readEC(); 

    // Converteer naar integer 
    uint16_t phInt = (uint16_t)(phValue * 100);
    
    // Conventeer naar integer 
    uint16_t  tempInt = temperatuurValue * 100;  

    uint16_t ecInt = ecVal * 100;

    // Bouw payload (9 bytes)
    uint8_t payload[9];
    payload[0] = highByte(phInt);
    payload[1] = lowByte(phInt);
    payload[2] = highByte(tempInt);
    payload[3] = lowByte(tempInt);
    payload[4] = highByte(lightVal);
    payload[5] = lowByte(lightVal);
    payload[6] = startFlow;
    payload[7] = endFlow;
    payload[8] = highByte(ecInt);
    payload[9] = lowByte(ecInt);

    // Check of er al een TX bezig is
    if (LMIC.opmode & OP_TXRXPEND) {
        Serial.println(F("OP_TXRXPEND, not sending"));
    } else {
        LMIC_setTxData2(1, payload, sizeof(payload), 0);
    }
}

ISR (PCINT1_vect)
{
  // Interrupt for Port C
  // Invert toggle state

  // Als de reading hoog is 1 van de 0 of 1 én de statebegin staat uit doe er dan een bij -> doe daarna de statebegin aan en check of de pulse bezig is. 
  bool reading = digitalRead(A4);
  if (reading && !stateBegin) {
    pulseCountBegin = pulseCountBegin + digitalRead(A4);
    stateBegin = !stateBegin;
  }
  // als de reading laag is en de beginstate staat uit dan moet de beginstate uit zodat die klaar is voor weer een hoge pulse
  if (!reading && stateBegin) {
    stateBegin = !stateBegin;
  }

  bool reading2 = digitalRead(A5);
  if (reading2 && !stateEind) {
    pulseCountEind = pulseCountEind + digitalRead(A5);
    stateEind = !stateEind;
  }
  if (!reading2 && stateEind) {
    stateEind = !stateEind;
  }
}


void setup() {
  Serial.begin(115200);
  phSensor.begin();
  TemperatuurSensor.begin();
  WaterflowSensorBegin.begin();
  WaterflowSensorEind.begin();

#ifdef VCC_ENABLE
  // For Pinoccio Scout boards
  pinMode(VCC_ENABLE, OUTPUT);
  digitalWrite(VCC_ENABLE, HIGH);
  delay(1000);
#endif


// Enable PCIE1 Bit2 = 1 (Port C) ->Hier worden de pin change interrupts ingeschakeld, ze worden interruptgevoelig, zodat de Arduino een melding krijgt zodra de sensorpuls verandert.
  PCICR |= B00000010;
  // Select PCINT12 Bit5 = 1 (Pin A4 + A5)
  PCMSK1 |= B00110000;
  // LMIC init
  os_init();
  // Reset the MAC state. Session and pending data transfers will be discarded.
  LMIC_reset();

// Set static session parameters. Instead of dynamically establishing a session
// by joining the network, precomputed session parameters are be provided.
#ifdef PROGMEM
  // On AVR, these values are stored in flash and only copied to RAM
  // once. Copy them to a temporary buffer here, LMIC_setSession will
  // copy them into a buffer of its own again.
  uint8_t appskey[sizeof(APPSKEY)];
  uint8_t nwkskey[sizeof(NWKSKEY)];
  memcpy_P(appskey, APPSKEY, sizeof(APPSKEY));
  memcpy_P(nwkskey, NWKSKEY, sizeof(NWKSKEY));
  LMIC_setSession(0x1, DEVADDR, nwkskey, appskey);
#else
  // If not running an AVR with PROGMEM, just use the arrays directly
  LMIC_setSession(0x1, DEVADDR, NWKSKEY, APPSKEY);
#endif

#if defined(CFG_eu868)
  // Set up the channels used by the Things Network, which corresponds
  // to the defaults of most gateways. Without this, only three base
  // channels from the LoRaWAN specification are used, which certainly
  // works, so it is good for debugging, but can overload those
  // frequencies, so be sure to configure the full frequency range of
  // your network here (unless your network autoconfigures them).
  // Setting up channels should happen after LMIC_setSession, as that
  // configures the minimal channel set.
  // NA-US channels 0-71 are configured automatically
  LMIC_setupChannel(0, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7), BAND_CENTI);   // g-band
  LMIC_setupChannel(1, 868300000, DR_RANGE_MAP(DR_SF12, DR_SF7B), BAND_CENTI);  // g-band
  LMIC_setupChannel(2, 868500000, DR_RANGE_MAP(DR_SF12, DR_SF7), BAND_CENTI);   // g-band
  LMIC_setupChannel(3, 867100000, DR_RANGE_MAP(DR_SF12, DR_SF7), BAND_CENTI);   // g-band
  LMIC_setupChannel(4, 867300000, DR_RANGE_MAP(DR_SF12, DR_SF7), BAND_CENTI);   // g-band
  LMIC_setupChannel(5, 867500000, DR_RANGE_MAP(DR_SF12, DR_SF7), BAND_CENTI);   // g-band
  LMIC_setupChannel(6, 867700000, DR_RANGE_MAP(DR_SF12, DR_SF7), BAND_CENTI);   // g-band
  LMIC_setupChannel(7, 867900000, DR_RANGE_MAP(DR_SF12, DR_SF7), BAND_CENTI);   // g-band
  LMIC_setupChannel(8, 868800000, DR_RANGE_MAP(DR_FSK, DR_FSK), BAND_MILLI);    // g2-band
// TTN defines an additional channel at 869.525Mhz using SF9 for class B
// devices' ping slots. LMIC does not have an easy way to define set this
// frequency and support for class B is spotty and untested, so this
// frequency is not configured here.
#elif defined(CFG_us915)
  // NA-US channels 0-71 are configured automatically
  // but only one group of 8 should (a subband) should be active
  // TTN recommends the second sub band, 1 in a zero based count.
  // https://github.com/TheThingsNetwork/gateway-conf/blob/master/US-global_conf.json
  LMIC_selectSubBand(1);
#endif

  // Disable link check validation
  LMIC_setLinkCheckMode(0);

  // TTN uses SF9 for its RX2 window.
  LMIC.dn2Dr = DR_SF9;

  // Set data rate and transmit power for uplink (note: txpow seems to be ignored by the library)
  LMIC_setDrTxpow(DR_SF7, 14);

  // Start job
  do_send(&sendjob);
  do_scan(&scanjob);
}

void loop() {
  os_runloop_once();

}
