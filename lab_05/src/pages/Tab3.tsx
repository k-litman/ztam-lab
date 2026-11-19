import { useState } from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';

import './Tab3.css';

const Tab3: React.FC = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);

  const slideChange = (s: SwiperType) => {
    setDisablePrev(s.isBeginning);
    setDisableNext(s.isEnd);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Slajdy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Slajdy</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Swiper className="slajdy" initialSlide={0} speed={300} onSwiper={setSwiper} onSlideChange={slideChange}>
          <SwiperSlide>
            <img src="https://picsum.photos/id/10/400/300" alt="Las" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://picsum.photos/id/15/400/300" alt="Rzeka" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://picsum.photos/id/29/400/300" alt="Góry" />
          </SwiperSlide>
        </Swiper>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton expand="block" disabled={disablePrev} onClick={() => swiper?.slidePrev()}>
                PREV
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" disabled={disableNext} onClick={() => swiper?.slideNext()}>
                NEXT
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
