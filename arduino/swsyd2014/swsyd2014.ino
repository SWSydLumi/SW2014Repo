int ledPin2 = 9;
int ledPin3 = 6;
int ledPin1 = 11;
int currentBrightness1 = 0;
int currentBrightness2 = 0;
int currentBrightness3 = 0;
int input;

void setup()  { 
  Serial.begin(9600);
} 

void loop()  { 
  input = Serial.read();
  
  //Serial.println("a");
  if (input == 'r') {
    analogWrite(ledPin3, 255);
    delay(150);
    analogWrite(ledPin3, 0);
  } else if (input == 'l') {
    //currentBrightness2 = 255 - currentBrightness2;
    analogWrite(ledPin2, 255);
    delay(150);
    analogWrite(ledPin2, 0);
  } else if (input == 'm') {
    currentBrightness3 = 255 - currentBrightness3;
    analogWrite(ledPin1, currentBrightness3);
  }
  delay(1);
}


