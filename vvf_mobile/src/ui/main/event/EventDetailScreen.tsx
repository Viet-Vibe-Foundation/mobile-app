import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import axiosInstance from '@libs/apis/axios';
import ResponseDTO from '@data/responseDTO';
import ImageInfo from './components/ImageInfo';
import {Event} from '@data/event';
import HtmlComponent from '@components/HtmlComponent';
import FilledButtonComponent from '@components/FilledButtonComponent';
import {dateToString} from 'src/utils/dateTimeUtil';
import EventScheduleItem from './components/EventScheduleItem';
import Divider from '@components/Divider';
import {useTranslation} from 'react-i18next';
import {useAppColor} from 'src/hooks/useAppColor';

type EventDetailScreenParams = {
  eventId: string;
};

const EventDetailScreen = () => {
  const route =
    useRoute<RouteProp<{params: EventDetailScreenParams}, 'params'>>();
  const {eventId} = route.params;
  const {t} = useTranslation();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [eventInfo, setEventInfo] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const theme = useAppColor();

  useEffect(() => {
    const getEventInfo = async (requestEventId: String) => {
      try {
        setLoading(true);
        const res = await axiosInstance.get<ResponseDTO<Event>>(
          `/events/get?eventId=${requestEventId}`,
        );
        if (res.data?.data) {
          console.log(res.data.data);
          setEventInfo(res.data.data);
        } else {
          setError('Event data is unavailable.');
        }
      } catch (er: any) {
        setError('Failed to load event details.');
        console.error(er);
      } finally {
        setLoading(false);
      }
    };

    getEventInfo(eventId);
  }, [eventId]);

  const handleReserve = () => {
    if (eventInfo?.formLink) {
      Linking.openURL(eventInfo.formLink).catch(err => {
        Alert.alert('Error', 'Could not open link.');
        console.error(err);
      });
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.activityIndicator} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, {color: theme.textError}]}>
          {error}
        </Text>
      </View>
    );
  }

  if (!eventInfo) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.errorText, {color: theme.textError}]}>
          No event details available.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          {eventInfo.imgUrl && (
            <ImageInfo imageUrl={eventInfo.imgUrl} style={styles.imageInfo} />
          )}

          <View style={styles.eventTitleInfoContainer}>
            <Text
              style={[styles.eventTitleInfoText, {color: theme.textSecondary}]}>
              {`${dateToString(eventInfo.startDate, 'DD/MM/YYYY hh:mm')} | ${
                eventInfo.location
              }`}
            </Text>
            <Text
              style={[
                styles.eventTitleInfoText,
                styles.title,
                {color: theme.onPrimary},
              ]}>
              {eventInfo.title}
            </Text>
            <FilledButtonComponent
              style={styles.reserveBtn}
              onPress={handleReserve}
              title={t('reserve')}
              textStyle={styles.reserveBtnLabel}
            />
          </View>
        </View>
        <SectionTitle title={t('time_and_location')} color={theme.onPrimary} />
        <View style={styles.timeAndLocationContainer}>
          <Text style={{color: theme.onPrimary}}>
            Date: {dateToString(eventInfo.startDate, 'DD/MM/YYYY')}
          </Text>
          <Text style={{color: theme.onPrimary}}>
            Time: {eventInfo.startTime}
          </Text>
          <Text style={{color: theme.onPrimary}}>
            Location: {eventInfo.location}
          </Text>
        </View>

        <SectionTitle title={t('about_the_event')} color={theme.onPrimary} />
        {eventInfo.description && (
          <HtmlComponent html={eventInfo.description} />
        )}

        <SectionTitle title={t('schedule')} color={theme.onPrimary} />
        <Text style={{color: theme.textSecondary}}>
          {t('may_change_according_to_instructor')}
        </Text>
        <View style={styles.eventScheduleList}>
          {eventInfo.schedules?.map((schedule, index) => (
            <View key={index}>
              <EventScheduleItem item={schedule} />
              <Divider type="horizontal" />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const SectionTitle = ({title, color}: {title: string; color: string}) => (
  <Text style={[styles.title, {color: color}]}>{title}</Text>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  imageInfo: {
    width: '100%',
    height: Dimensions.get('window').height * 0.34,
    marginTop: 10,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventTitleInfoContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 10,
    alignItems: 'center',
  },
  eventTitleInfoText: {
    textAlign: 'center',
  },
  reserveBtn: {
    marginTop: 10,
  },
  reserveBtnLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },

  timeAndLocationContainer: {
    gap: 5,
    fontSize: 18,
    marginTop: 10,
  },
  eventScheduleList: {
    marginTop: 10,
    marginRight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventDetailScreen;
