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
import React, {useEffect, useState} from 'react';
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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState<Event>();

  useEffect(() => {
    getEventInfo();
  }, []);

  const getEventInfo = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get<ResponseDTO<Event>>(
        `/events/${eventId}`,
      );
      if (res.data && res.data.data) {
        setEventInfo(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = () => {
    try {
      eventInfo?.formLink && Linking.openURL(eventInfo?.formLink);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : eventInfo ? (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        {eventInfo.imgUrl && (
          <ImageInfo imageUrl={eventInfo.imgUrl} style={styles.imageInfo} />
        )}
        <View style={styles.eventTitleInfoContainer}>
          <Text style={[styles.eventTitleInfoText]}>{`${dateToString(
            eventInfo.startDate,
          )} | ${eventInfo.location}`}</Text>
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
      <Text style={styles.title}>Time and location</Text>
      <View style={styles.timeAndLocationContainer}>
        <Text>Date: {dateToString(eventInfo.startDate)}</Text>
        <Text>Time: {eventInfo.startTime}</Text>
        <Text>Location: {eventInfo.location}</Text>
      </View>
      <Text style={styles.title}>About The Event</Text>
      {eventInfo.description ? (
        <HtmlComponent html={eventInfo.description} />
      ) : null}
      <Text style={styles.title}>Schedule</Text>
      <Text style={styles.subTile}>
        {'( May change according to instructor)'}
      </Text>
      <View style={styles.eventScheduleList}>
        {eventInfo.eventSchedules?.map((schedule, index) => (
          <View key={index}>
            <EventScheduleItem item={schedule} />
            <Divider type="horizontal" />
          </View>
        ))}
      </View>
    </ScrollView>
  ) : null;
};

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
  subTile: {
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
});

export default EventDetailScreen;
