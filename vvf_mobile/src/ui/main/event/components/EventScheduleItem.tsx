import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {EventSchedule} from '@data/eventSchedule';
import {calculateMinute} from 'src/utils/dateTimeUtil';
import Divider from '@components/Divider';
import {useAppColor} from 'src/hooks/useAppColor';

interface Prop {
  item: EventSchedule;
}

const EventScheduleItem = (prop: Prop) => {
  const {item} = prop;
  const theme = useAppColor();
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={{color: theme.onPrimary}}>
          {item.startTime} - {item.endTime}
        </Text>

        {item.startTime && item.endTime && (
          <Text style={{color: theme.textSecondary}}>
            ({calculateMinute(item.startTime, item.endTime)})
          </Text>
        )}
      </View>
      <Divider type="vertical" />
      <View style={styles.descriptionContainer}>
        <Text style={{color: theme.onPrimary}}>{item.description}</Text>
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
});

export default EventScheduleItem;
