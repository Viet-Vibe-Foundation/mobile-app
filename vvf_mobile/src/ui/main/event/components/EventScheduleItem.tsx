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
          {item.startTime} - {item.endTime}
        </Text>

        {item.startTime && item.endTime && (
          <Text style={styles.timeText}>
            {calculateMinute(item.startTime, item.endTime)}
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
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  descriptionContainer: {
    width: '70%',
  },
  timeText: {
    color: 'grey',
  },
});

export default EventScheduleItem;
