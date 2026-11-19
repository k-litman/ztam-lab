import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonInput, IonRow } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';

const Czworokat = () => {
  const aRef = useRef<HTMLIonInputElement>(null);
  const bRef = useRef<HTMLIonInputElement>(null);
  const cRef = useRef<HTMLIonInputElement>(null);
  const dRef = useRef<HTMLIonInputElement>(null);
  const alphaRef = useRef<HTMLIonInputElement>(null);
  const gammaRef = useRef<HTMLIonInputElement>(null);

  const [result, setResult] = useState<string>();

  const calculate = () => {
    const values = [aRef, bRef, cRef, dRef, alphaRef, gammaRef].map(ref => ref.current!.value);

    if (values.some(v => v === undefined || v === null || v === '')) {
      setResult('Uzupełnij wszystkie pola');
      return;
    }

    const [a, b, c, d, alpha, gamma] = values.map(v => +v!);

    if ([a, b, c, d].some(side => !(side > 0))) {
      setResult('Boki muszą być dodatnie');
      return;
    }
    if ([alpha, gamma].some(angle => !(angle > 0 && angle < 360))) {
      setResult('Kąty muszą być z przedziału (0°, 360°)');
      return;
    }

    const s = (a + b + c + d) / 2;
    const halfAngle = ((alpha + gamma) / 2) * Math.PI / 180;
    const cos = Math.cos(halfAngle);
    const underRoot = (s - a) * (s - b) * (s - c) * (s - d) - a * b * c * d * cos * cos;

    if (underRoot <= 0) {
      setResult('Taki czworokąt nie istnieje');
      return;
    }

    setResult(`Pole: ${Math.sqrt(underRoot).toFixed(2)}`);
  };

  const reset = () => {
    [aRef, bRef, cRef, dRef, alphaRef, gammaRef].forEach(ref => (ref.current!.value = ''));
    setResult(undefined);
  };

  return (
    <IonCard>
      <IonCardContent>
        <h2>Pole czworokąta</h2>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonInput label="a" labelPlacement="floating" type="number" ref={aRef} />
            </IonCol>
            <IonCol>
              <IonInput label="b" labelPlacement="floating" type="number" ref={bRef} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput label="c" labelPlacement="floating" type="number" ref={cRef} />
            </IonCol>
            <IonCol>
              <IonInput label="d" labelPlacement="floating" type="number" ref={dRef} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput label="alfa (między a i d) [&deg;]" labelPlacement="floating" type="number" ref={alphaRef} />
            </IonCol>
            <IonCol>
              <IonInput label="gamma (między b i c) [&deg;]" labelPlacement="floating" type="number" ref={gammaRef} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-left">
              <IonButton onClick={calculate}>
                <IonIcon slot="start" icon={calculatorOutline} />
                Oblicz
              </IonButton>
            </IonCol>
            <IonCol className="ion-text-right">
              <IonButton onClick={reset}>
                <IonIcon slot="start" icon={refreshOutline} />
                Resetuj
              </IonButton>
            </IonCol>
          </IonRow>
          {result && (
            <IonRow>
              <IonCol>
                <h2>{result}</h2>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default Czworokat;
