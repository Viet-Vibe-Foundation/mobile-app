import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {EventSchedule} from '@data/eventSchedule';
import {calculateMinute} from 'src/utils/dateTimeUtil';
import Divider from '@components/Divider';

interface Prop {
  item: EventSchedule;
}

const EventScheduleItem = (prop: Prop) => {
  const {item} = prop;

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text>
          {item.starTime} - {item.endTime}
        </Text>
        {item.starTime && item.endTime && (
          <Text style={styles.timeText}>
            {calculateMinute(item.starTime, item.endTime)} minutes
          </Text>
        )}
      </View>
      <Divider type="vertical" />
      <View style={styles.descriptionContainer}>
        <Text>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    width: '25%',
  },
  descriptionContainer: {
    width: '75%',
  },
  timeText: {
    color: 'grey',
  },
});

export default EventScheduleItem;
