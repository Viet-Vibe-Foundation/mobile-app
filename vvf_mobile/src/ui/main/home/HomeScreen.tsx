import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import EventCard from './components/EventCard';
import PostListItem from './components/PostListItem';
import {useTranslation} from 'react-i18next';
import {getPosts} from 'src/services/postService';
import {getEvents} from 'src/services/eventService';
import ResponseDTO from '@data/responseDTO';
import {Event} from '@data/event';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/libs/redux/store';
import {updatePost} from 'src/libs/redux/postSlice';

const HomeScreen = () => {
  const {t} = useTranslation();
  const posts = useSelector((state: RootState) => state.post);
  const [postPageNum, setPostPageNum] = useState<number>(0);
  const [events, setEvents] = useState<ResponseDTO<Event[]>>({
    data: [],
    pageNum: 0,
    total: 0,
  });
  const dispatch = useDispatch();

  // Event doesn't need to update anything
  useEffect(() => {
    getEventByPageNum(events.pageNum ?? 0);
  }, [events.pageNum]);

  useEffect(() => {
    const getPostsByPageNum = async (pageNum: number) => {
      const postResponse = await getPosts(pageNum);
      dispatch(updatePost(postResponse));
    };
    getPostsByPageNum(postPageNum);
  }, [postPageNum, dispatch]);

  const handlePostEndReached = () => {
    if ((posts.data?.length ?? 0) < (posts.total ?? 0)) {
      setPostPageNum(prev => prev + 1);
    }
  };

  const handleEventEndReached = () => {
    if ((events.data?.length ?? 0) < (events.total ?? 0)) {
      setEvents(prev => ({...prev, pageNum: (prev.pageNum ?? 0) + 1}));
    }
  };

  const getEventByPageNum = async (pageNum: number) => {
    const eventResponse = await getEvents(pageNum);
    setEvents(prev => ({
      ...prev,
      data: [...(prev.data ?? []), ...(eventResponse?.data ?? [])],
      total: eventResponse?.total ?? 0,
    }));
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
            showsVerticalScrollIndicator={true}
            ListFooterComponent={
              events.data &&
              events.total &&
              events.data?.length < events.total ? (
                <ActivityIndicator
                  style={styles.rightIndicator}
                  size={'large'}
                />
              ) : null
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
      ListFooterComponent={
        posts.data && posts.total && posts.data?.length < posts.total ? (
          <ActivityIndicator style={styles.bottomIndicator} size={'large'} />
        ) : null
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
  bottomIndicator: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  rightIndicator: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    bottom: (Dimensions.get('window').height - 40) / 2,
    left: Dimensions.get('window').width / 2,
  },
});

export default HomeScreen;
