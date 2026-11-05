import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow } from '@ionic/react';
import { useState } from 'react';

type Equation = '+' | '-' | '*' | '/';

const buttonRows = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['C', '0', '.', '+'],
];

const Kalkulator = () => {
  const [currentEquation, setCurrentEquation] = useState<Equation>('+');
  const [prevNumber, setPrevNumber] = useState<number>(0);
  const [currentNumber, setCurrentNumber] = useState<string>('');
  const [lastButtonPressedEqualSign, setLastButtonPressedEqualSign] = useState<boolean>(false);
  const [dotUsed, setDotUsed] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleNumericInput = (digit: string) => {
    setCurrentNumber(prev => prev + digit);
  }

  const handleEquationInput = (equation: Equation) => {
    if (currentNumber === '') {
      setCurrentEquation(equation);
      return;
    }
    calculate();
    setCurrentEquation(equation);
    // setPrevNumber(+currentNumber);
    setDotUsed(false);
    setCurrentNumber('');
  }

  const handleDot = () => {
    if (dotUsed) return;
    setDotUsed(true);
    setCurrentNumber(prev => prev + '.');
  };

  const handleClear = () => {
    setCurrentEquation('+');
    setPrevNumber(0);
    setCurrentNumber('');
    setLastButtonPressedEqualSign(false);
    setDotUsed(false);
  }

  const handleEqualSign = () => {}

  const calculate = () => {
    const a = prevNumber;
    const eq = currentEquation;
    const b = +currentNumber;
    let result: number | null = null;

    switch(eq) {
      case '+': result = a + b;
      case '-': result = a - b;
      case '*': result = a * b;
      case '/':
    }
  }

  const handleButton = (label: string) => {
    if (label === '.') handleDot();
    else if (label === 'C') handleClear();
    else if (label === '=') handleEqualSign();
    else if (['+', '-', '*', '/'].includes(label)) handleEquationInput(label as Equation);
    else handleNumericInput(label);
  }

  return (
    <IonCard>
      <IonCardContent>
        <h1 className="ion-text-right">{currentNumber || '0'}</h1>
        <IonGrid>
          {buttonRows.map((row, i) => (
            <IonRow key={i}>
              {row.map(label => (
                <IonCol key={label} size="3">
                  <IonButton expand="block" onClick={() => handleButton(label)}>
                    {label}
                  </IonButton>
                </IonCol>
              ))}
            </IonRow>
          ))}
          <IonRow>
            <IonCol>
              <IonButton expand="block" color="success" onClick={() => handleButton('=')}>
                =
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default Kalkulator;
