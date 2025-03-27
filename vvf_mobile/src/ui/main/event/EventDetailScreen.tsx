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
import axiosInstance from 'src/services/apis/axios';
import ResponseDTO from 'src/data/responseDTO';
import ImageInfo from './components/ImageInfo';
import {Event} from '../../../data/event';
import HtmlComponent from 'src/ui/components/HtmlComponent';
import FilledButtonComponent from 'src/ui/components/FilledButtonComponent';
import {dateToString} from 'src/utils/dateTimeUtil';
import EventScheduleItem from './components/EventScheduleItem';
import Divider from 'src/ui/components/Divider';

type EventDetailScreenParams = {
  eventId: string;
};

const EventDetailScreen = () => {
  const route =
    useRoute<RouteProp<{params: EventDetailScreenParams}, 'params'>>();
  const {eventId} = route.params;

  const [isLoading, setLoading] = useState<boolean>(true);
  const [eventInfo, setEventInfo] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEventInfo();
  }, [eventId]);

  const getEventInfo = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get<ResponseDTO<Event>>(
        `/events/get?eventId=${eventId}`,
      );
      if (res.data?.data) {
        setEventInfo(res.data.data);
      } else {
        setError('Event data is unavailable.');
      }
    } catch (error: any) {
      setError('Failed to load event details.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!eventInfo) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.errorText}>No event details available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        {eventInfo.imgUrl && (
          <ImageInfo imageUrl={eventInfo.imgUrl} style={styles.imageInfo} />
        )}

        <View style={styles.eventTitleInfoContainer}>
          <Text style={[styles.eventTitleInfoText]}>
            {`${dateToString(eventInfo.startDate, 'DD/MM/YYYY hh:mm')} | ${
              eventInfo.location
            }`}
          </Text>
          <Text style={[styles.eventTitleInfoText, styles.title]}>
            {eventInfo.title}
          </Text>
          <FilledButtonComponent
            style={styles.reserveBtn}
            onPress={handleReserve}
            title="Reserve"
          />
        </View>
      </View>
      <SectionTitle title="Time and Location" />
      <View style={styles.timeAndLocationContainer}>
        <Text>Date: {dateToString(eventInfo.startDate, 'DD/MM/YYYY')}</Text>
        <Text>Time: {eventInfo.startTime}</Text>
        <Text>Location: {eventInfo.location}</Text>
      </View>

      <SectionTitle title="About The Event" />
      {eventInfo.description && <HtmlComponent html={eventInfo.description} />}

      <SectionTitle title="Schedule" />
      <Text style={styles.subTitle}>
        {'(May change according to instructor)'}
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
  );
};

const SectionTitle = ({title}: {title: string}) => (
  <Text style={styles.title}>{title}</Text>
);

const styles = StyleSheet.create({
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
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
  },
  eventTitleInfoText: {
    color: 'white',
    textAlign: 'center',
  },
  reserveBtn: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subTitle: {
    color: 'grey',
  },
  timeAndLocationContainer: {
    gap: 5,
    fontSize: 18,
    marginTop: 10,
  },
  eventScheduleList: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
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
