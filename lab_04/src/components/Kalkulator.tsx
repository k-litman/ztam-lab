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
  const [currentEquation, setCurrentEquation] = useState<Equation | null>(null);
  const [prevNumber, setPrevNumber] = useState<number | null>(null);
  const [currentNumber, setCurrentNumber] = useState<string>('0');
  const [startNewNumber, setStartNewNumber] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleNumericInput = (digit: string) => {
    if (startNewNumber || error) {
      setStartNewNumber(false);
      setError(false);
      setCurrentNumber(digit);
      return;
    }
    if (currentNumber === '0') setCurrentNumber(digit);
    else setCurrentNumber(prev => prev + digit);
  }

  const handleDot = () => {
    if (startNewNumber || error) {
      setStartNewNumber(false);
      setError(false);
      setCurrentNumber('0.');
      return;
    }
    if (currentNumber.includes('.')) return;
    setCurrentNumber(prev => prev + '.');
  };

  const handleEquationInput = (equation: Equation) => {
    if (error) return;
    if (currentEquation !== null && prevNumber !== null && !startNewNumber) {
      const result = calculate(prevNumber, currentEquation, +currentNumber);
      if (result === null) {
        handleError();
        return;
      }
      setPrevNumber(result);
      setCurrentNumber(String(result));
    } else {
      setPrevNumber(+currentNumber);
    }
    setCurrentEquation(equation);
    setStartNewNumber(true);
  }

  const handleEqualSign = () => {
    if (error || currentEquation === null || prevNumber === null) return;
    const result = calculate(prevNumber, currentEquation, +currentNumber);
    if (result === null) {
      handleError();
      return;
    }
    setCurrentNumber(String(result));
    setPrevNumber(null);
    setCurrentEquation(null);
    setStartNewNumber(true);
  }

  const handleError = () => {
    setError(true);
    setPrevNumber(null);
    setCurrentEquation(null);
    setStartNewNumber(true);
  }

  const handleClear = () => {
    setCurrentEquation(null);
    setPrevNumber(null);
    setCurrentNumber('0');
    setStartNewNumber(false);
    setError(false);
  }

  const calculate = (a: number, eq: Equation, b: number): number | null => {
    let result = 0;

    switch(eq) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/':
        if (b === 0) return null;
        result = a / b;
        break;
    }

    return parseFloat(result.toFixed(10));
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
        <h1 className="ion-text-right">{error ? 'Nie można dzielić przez zero' : currentNumber}</h1>
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
