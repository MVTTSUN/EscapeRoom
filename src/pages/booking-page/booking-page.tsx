import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCurrentQuest, getQuestBookingInfo } from '../../store/quests-data/selectors';
import { useEffect, useState } from 'react';
import { getQuestAction, getQuestBookingInfoAction } from '../../store/api-actions';
import { resetCurrentQuest, resetQuestBookingInfo } from '../../store/quests-data/quests-data';
import { QuestBookingInfo } from '../../types/quest-data';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { ACTIVE_MARKER_ICON, DEFAULT_MARKER_ICON, LAYER_MAP } from '../../const';
import { Icon } from 'leaflet';
import { BookingForm } from '../../components/booking-form/booking-form';

export function BookingPage() {
  const dispatch = useAppDispatch();
  const questBookingInfo = useAppSelector(getQuestBookingInfo);
  const currentQuest = useAppSelector(getCurrentQuest);
  const { id } = useParams();
  const [selectedQuestBookingInfo, setSelectedQuestBookingInfo] = useState<null | QuestBookingInfo>(null);

  useEffect(() => {
    if (questBookingInfo !== undefined && questBookingInfo.length !== 0) {
      setSelectedQuestBookingInfo(questBookingInfo[0]);
    }
  }, [questBookingInfo]);

  useEffect(() => {
    if (id) {
      dispatch(getQuestAction(id));
      dispatch(getQuestBookingInfoAction(id));
    }

    return () => {
      dispatch(resetCurrentQuest());
      dispatch(resetQuestBookingInfo);
    };
  }, []);

  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"/>
          <img src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt=""/>
        </picture>
      </div>
      <div className="container container--size-s">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
          </h1>
          <p className="title title--size-m title--uppercase page-content__title">{currentQuest.title}</p>
        </div>
        <div className="page-content__item">
          <div className="booking-map">
            <div className="map">
              {selectedQuestBookingInfo !== null && questBookingInfo && (
                <MapContainer className="map__container" center={[59.9386, 30.3141]} zoom={10}>
                  <TileLayer url={LAYER_MAP}/>
                  {questBookingInfo.map((place) => (
                    <Marker
                      key={place.id}
                      icon={new Icon(selectedQuestBookingInfo.id === place.id ? ACTIVE_MARKER_ICON : DEFAULT_MARKER_ICON)}
                      position={place.location.coords}
                      eventHandlers={{
                        click: () => setSelectedQuestBookingInfo(place),
                      }}
                    />
                  ))}
                </MapContainer>
              )}
            </div>
            <p className="booking-map__address">Вы&nbsp;выбрали: {selectedQuestBookingInfo?.location.address}</p>
          </div>
        </div>
        <BookingForm questBookingInfo={selectedQuestBookingInfo} peopleMinMax={currentQuest.peopleMinMax} />
      </div>
    </main>
  );
}
