import React, {useEffect, useState, useTransition} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import axiosInstance from 'src/services/apis/axios';
import {Post} from 'src/data/post';
import {Event} from 'src/data/event';
import ResponseDTO from 'src/data/responseDTO';
import EventCard from './components/EventCard';
import PostListItem from './components/PostListItem';
import {useTranslation} from 'react-i18next';

const HomeScreen = () => {
  const {t} = useTranslation();
  const [posts, setPosts] = useState<ResponseDTO<Post[]>>({
    data: [],
    pageNum: 1,
    total: 0,
  });
  const [events, setEvents] = useState<ResponseDTO<Event[]>>({
    data: [],
    pageNum: 1,
    total: 0,
  });

  useEffect(() => {
    getPosts(posts.pageNum);
  }, [posts.pageNum]);

  useEffect(() => {
    getEvents(events.pageNum);
  }, [events.pageNum]);

  const getPosts = async (pageNum: number = 1) => {
    try {
      const res = await axiosInstance.get<ResponseDTO<Post[]>>(
        `/posts?pageNum=${pageNum}`,
      );
      const newPosts = res.data.data || [];
      if (newPosts.length === 0) return;
      setPosts(prev => ({
        ...prev,
        data: [...(prev.data ?? []), ...newPosts],
        total: res.data.total,
      }));
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'Failed to load posts. Please try again.');
    }
  };

  const getEvents = async (pageNum: number = 1) => {
    try {
      const res = await axiosInstance.get<ResponseDTO<Event[]>>(
        `/events?pageNum=${pageNum}`,
      );

      const newEvents = res.data.data || [];

      if (newEvents.length === 0) return;

      setEvents(prev => ({
        ...prev,
        data: [...(prev.data ?? []), ...newEvents],
        total: res.data.total,
      }));
      console.log(pageNum);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load events. Please try again.');
    }
  };

  const handlePostEndReached = () => {
    if ((posts.data?.length ?? 0) < (posts.total ?? 0)) {
      setPosts(prev => ({
        ...prev,
        pageNum: (prev.pageNum ?? 1) + 1,
      }));
    }
  };

  const handleEventEndReached = () => {
    if ((events.data?.length ?? 0) < (events.total ?? 0)) {
      setEvents(prev => ({
        ...prev,
        pageNum: (prev.pageNum ?? 1) + 1,
      }));
    }
  };

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <View>
          <Text style={styles.sectionHeader}>{t('events')}</Text>

          <FlatList
            data={events?.data}
            renderItem={({item}) => <EventCard event={item} />}
            horizontal
            keyExtractor={(item, index) => `event-${item.id}-${index}`}
            showsHorizontalScrollIndicator={false}
            onEndReached={handleEventEndReached}
            ListEmptyComponent={
              <ActivityIndicator
                style={styles.activityIndicator}
                size={'large'}
              />
            }
          />

          <Text style={styles.sectionHeader}>{t('posts')}</Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
      data={posts.data}
      keyExtractor={(item, index) => `post-${item.id}-${index}`}
      renderItem={({item}) => <PostListItem post={item} />}
      onEndReached={handlePostEndReached}
      ListEmptyComponent={
        <ActivityIndicator style={styles.activityIndicator} size={'large'} />
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
  activityIndicator: {
    position: 'absolute',
    bottom: (Dimensions.get('window').height - 40) / 2,
    left: Dimensions.get('window').width / 2,
  },
});

export default HomeScreen;
