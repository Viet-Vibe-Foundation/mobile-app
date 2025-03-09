import {SectionList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosInstance from 'src/services/apis/axios';
import {Post} from 'src/data/post';
import {Event} from 'src/data/event';
import ResponseDTO from 'src/data/responseDTO';
import EventCard from './components/EventCard';
import WebView from 'react-native-webview';

const EventScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getPosts();
    getEvents();
  }, []);

  const getPosts = async () => {
    try {
      const res = await axiosInstance.get<ResponseDTO<Post[]>>('/posts');
      if (res.data && res.data.data) {
        setPosts(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEvents = async () => {
    try {
      const res = await axiosInstance.get<ResponseDTO<Event[]>>('/events');
      if (res.data && res.data.data) {
        setEvents(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {events.map(item => (
        <EventCard event={item} key={item.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default EventScreen;
