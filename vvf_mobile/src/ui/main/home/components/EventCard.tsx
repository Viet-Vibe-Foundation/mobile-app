import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Event} from '@data/event';
import IconTextComponent from './IconTextComponent';
import {dateToString} from 'src/utils/dateTimeUtil';
import {useNavigation} from '@react-navigation/native';
import {appColor} from '@styles/appColor';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '@custom-types/navigationType';

interface Prop {
  event: Event;
}

type MainNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Index'
>;

const EventCard = ({event}: Prop) => {
  const navigation = useNavigation<MainNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.push('EventDetail', {eventId: event.id!})}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={
            event.imgUrl && event.imgUrl.trim() !== ''
              ? {uri: event.imgUrl}
              : require('@assets/images/default_avatar.jpg')
          }
          resizeMode="cover"
        />
        <View style={styles.typeContainer}>
          <Text style={styles.typeText}>{event.eventType}</Text>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {event.title}
      </Text>

      <View style={styles.infoContainer}>
        <View style={styles.section}>
          <IconTextComponent
            icon="sell"
            text={`$${event.price}`}
            iconSize={15}
            textSize={15}
          />
          <IconTextComponent
            icon="confirmation-number"
            text={`${event.remainingTicket} remaining`}
            iconSize={15}
            textSize={15}
          />
        </View>
        <View style={styles.section}>
          <IconTextComponent
            icon="location-on"
            text={event.location ?? 'N/A'}
            iconSize={15}
            textSize={15}
            textColor="gray"
            iconColor="gray"
          />
        </View>
      </View>

      <View style={styles.timeContainer}>
        <IconTextComponent
          icon="calendar-today"
          text={dateToString(event.startDate, 'DD/MM/YY')}
          iconSize={15}
          textSize={15}
        />
        <Text style={styles.timeText}>at {event.startTime}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 250,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 1.5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  typeContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: appColor.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  typeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    color: '#333',
  },
  infoContainer: {
    margin: 10,
    gap: 10,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8e1e1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default EventCard;
