import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import './Tab1.css';

type Item = {
  src: string;
  text: string;
};

const items: Item[] = [
  { src: 'https://picsum.photos/id/10/200/200', text: 'Las' },
  { src: 'https://picsum.photos/id/15/200/200', text: 'Rzeka' },
  { src: 'https://picsum.photos/id/29/200/200', text: 'Góry' },
  { src: 'https://picsum.photos/id/57/200/200', text: 'Miasto' },
  { src: 'https://picsum.photos/id/1043/200/200', text: 'Plaża' },
];

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Obrazki</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Obrazki</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {items.map((image) => (
            <IonItem key={image.src}>
              <IonThumbnail slot="start">
                <img src={image.src} alt={image.text} loading="lazy" />
              </IonThumbnail>
              <IonLabel>{image.text}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
