#include <Wire.h>
#include "MAX30100_PulseOximeter.h"
#define BLYNK_PRINT Serial
#include <Blynk.h>
#include <WiFi.h>
#include <BlynkSimpleEsp32.h>
int sensorValue;
#define InPin5 32
int flg=0;
#define REPORTING_PERIOD_MS 1000
 
char auth[] = "5NWV5a1K2DhubGrEvz9HIH-XA2jaF2Zx";           // You should get Auth Token in the Blynk App.
char ssid[] = "SARNOBAT";                                     // Your WiFi credentials.
char pass[] = "sarnobat@42";
// Connections : SCL PIN - D1 , SDA PIN - D2 , INT PIN - D0
PulseOximeter pox;
 
float BPM, SpO2;
uint32_t tsLastReport = 0;
 
 
void onBeatDetected()
{
    Serial.println("Beat Detected!");
}
 
void setup()
{
    Serial.begin(115200);
    
    pinMode(19, OUTPUT);
    Blynk.begin(auth, ssid, pass);
 
    Serial.print("Initializing Pulse Oximeter..");
 
    if (!pox.begin())
    {
         Serial.println("FAILED");
         for(;;);
    }
    else
    {
         Serial.println("SUCCESS");
         pox.setOnBeatDetectedCallback(onBeatDetected);
    }
 
    // The default current for the IR LED is 50mA and it could be changed by uncommenting the following line.
        pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);

 
  // You can send any value at any time.
  // Please don't send more that 10 values per second.
  
 
}
 
void loop()
{
    pox.update();
    Blynk.run();
    BPM = pox.getHeartRate();
    SpO2 = pox.getSpO2();
    //sensorValue= 1011;
    if (millis() - tsLastReport > REPORTING_PERIOD_MS)
    {
        Serial.print("Heart rate:");
        Serial.print(BPM);
        Serial.print(" bpm / SpO2:");
        Serial.print(SpO2);
        Serial.println(" %");
        // Serial.print("sensorValue=");
        // Serial.println(sensorValue);
        
        if(flg == 0)
        {
          Blynk.virtualWrite(V0, BPM);
          Blynk.virtualWrite(V5, SpO2);
          flg = 1;
        }
        else
        {
          Blynk.virtualWrite(V0, BPM);
          Blynk.virtualWrite(V1, 1200);
          flg = 0;
        }

        
        //Blynk.virtualWrite(V1, 1200);
 
        tsLastReport = millis();
       
    }
}