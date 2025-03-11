import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import axiosInstance from 'src/services/apis/axios';
import {Post} from 'src/data/post';
import {Event} from 'src/data/event';
import ResponseDTO from 'src/data/responseDTO';
import EventCard from './components/EventCard';
import PostListItem from './components/PostListItem';

const HomeScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getPosts();
    getEvents();
    setLoading(false);
  }, []);

  const getPosts = async () => {
    try {
      const res = await axiosInstance.get<ResponseDTO<Post[]>>('/posts');
      setPosts(res.data?.data || []);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'Failed to load posts. Please try again.');
    }
  };

  const getEvents = async () => {
    try {
      const res = await axiosInstance.get<ResponseDTO<Event[]>>('/events');
      setEvents(res.data?.data || []);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load events. Please try again.');
    }
  };

  return isLoading ? (
    <ActivityIndicator size={'large'} />
  ) : (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <View>
          <Text style={styles.sectionHeader}>Events</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {events.length > 0 ? (
              events.map(event => <EventCard key={event.id} event={event} />)
            ) : (
              <Text style={styles.emptyText}>No events available</Text>
            )}
          </ScrollView>

          <Text style={styles.sectionHeader}>Posts</Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
      data={posts}
      keyExtractor={(item, index) => item.id?.toString() ?? `post-${index}`}
      renderItem={({item}) => <PostListItem post={item} />}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No posts available</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
    color: 'gray',
  },
});

export default HomeScreen;
