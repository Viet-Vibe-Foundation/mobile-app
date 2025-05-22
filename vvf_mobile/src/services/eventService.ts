import ResponseDTO from '@data/responseDTO';
import axiosInstance from './apis/axios';
import {Event} from '@data/event';
import {Alert} from 'react-native';

export const getEvents = async (pageNum: number = 0) => {
  try {
    const res = await axiosInstance.get<ResponseDTO<Event[]>>(
      `/events/get?isPublished=true&pageNum=${pageNum}`,
    );
    const newEvents = res.data.data || [];
    if (newEvents.length === 0) {
      return;
    }
    return {
      data: newEvents,
      total: res.data.total,
    };
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Failed to load events. Please try again.');
  }
};
