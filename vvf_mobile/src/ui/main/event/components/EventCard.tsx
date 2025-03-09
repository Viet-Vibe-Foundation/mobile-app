import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React from 'react';
import {Event} from 'src/data/event';
import IconTextComponent from './IconTextComponent';
import {dateToString} from 'src/utils/dateTimeUtil';
import OutlinedButtonComponent from 'src/ui/components/OullinedButtonComponent';

interface Prop {
  event: Event;
}

const EventCard = (prop: Prop) => {
  const {event} = prop;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          event.imgUrl != null
            ? {uri: event.imgUrl}
            : require('@assets/images/default_avatar.jpg')
        }
      />
      <Text style={styles.title}>{event.title}</Text>
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
            text={event.location ?? 'N/a'}
            iconSize={15}
            textSize={15}
            textColor="gray"
            iconColor="gray"
          />
          <OutlinedButtonComponent onPress={() => {}} title="Read more" />
        </View>
      </View>
      <View style={styles.timeContainer}>
        <IconTextComponent
          icon="calendar-today"
          text={dateToString(event.startDate)}
          iconSize={15}
          textSize={15}
        />
        <Text style={{fontSize: 15}}>at {event.startTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.65,
    aspectRatio: 0.8, // Height = 2 * width
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: '50%',
    objectFit: 'cover',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  infoContainer: {
    margin: 10,
    gap: 10,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeContainer: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#eed7d7',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EventCard;
