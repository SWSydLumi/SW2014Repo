int ledPin1 = 9;    // LED connected to digital pin 9
int ledPin2 = 10;
int currentBrightness1 = 0;
int currentBrightness2 = 0;
int input;

void setup()  { 
  Serial.begin(9600);
} 

void loop()  { 
  input = Serial.read();
  Serial.println("a");
  if (input == 'a') {
    currentBrightness1 = (currentBrightness1 + 50) % 255;
    analogWrite(ledPin1, currentBrightness1);
  } else if (input == 's') {
    currentBrightness1 = currentBrightness1 - 50;
    if (currentBrightness1 < 0) {
      currentBrightness1 = 255 - currentBrightness1;
    }
    analogWrite(ledPin1, currentBrightness1);
  } else if (input == 'd') {
    currentBrightness2 = (currentBrightness2 + 50) % 255;
    analogWrite(ledPin2, currentBrightness2);
  } else if (input == 'f') {
    currentBrightness2 = currentBrightness2 - 50;
    if (currentBrightness2 < 0) {
      currentBrightness2 = 255 - currentBrightness2;
    }
    analogWrite(ledPin2, currentBrightness2);
  }
  delay(1);
}


