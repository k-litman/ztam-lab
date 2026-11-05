import {
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonRow,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { useRef, useState } from 'react';
import Kalkulator from './components/Kalkulator';

setupIonicReact();

const App: React.FC = () => {
  const weightRef = useRef<HTMLIonInputElement>(null);
  const heightRef = useRef<HTMLIonInputElement>(null);

  const [bmi, setBmi] = useState<number>();

  const calculate = () => {
    const weight = weightRef.current!.value;
    const height = heightRef.current!.value;

    if (!weight || !height) return;
    const heightMetres = +height / 100;
    const calculatedBmi = +weight / (heightMetres * heightMetres);
    // console.log(bmi);
    setBmi(calculatedBmi);
  };
  const reset = () => {
    weightRef.current!.value = '';
    heightRef.current!.value = '';
    setBmi(undefined);
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kalkulator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonInput label="Wzrost (cm)" labelPlacement="floating" type="number" ref={heightRef} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput label="Waga (kg)" labelPlacement="floating" type="number" ref={weightRef} />
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
          {bmi && (
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardContent>
                    <h2>BMI: {bmi?.toFixed(2)}</h2>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
        <Kalkulator />
      </IonContent>
    </IonApp>
  );
};

export default App;
