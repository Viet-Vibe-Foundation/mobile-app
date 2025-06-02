import {
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  View,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import axiosInstance from 'src/services/apis/axios';
import {Post} from '@data/post';
import ResponseDTO from '@data/responseDTO';
import HtmlComponent from '@components/HtmlComponent';
import FloatingButton from '@components/FloatingButton';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/libs/redux/store';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {storagePropertiesName} from '@constants';
import {User} from '@data/user';
import {mmkvStorage} from 'src/libs/mmvkStorage';
import {likePost} from 'src/libs/redux/postSlice';

type PostScreenParams = {
  postId: string;
};

const PostScreen = () => {
  const route = useRoute<RouteProp<{params: PostScreenParams}, 'params'>>();
  const {postId} = route.params;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<Post | null>(null);
  const [isLiked, setLiked] = useState<boolean>(postContent?.liked || false);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [user, _] = useMMKVStorage<User | null>(
    storagePropertiesName.userInfo,
    mmkvStorage,
    null,
  );

  useEffect(() => {
    const fetchPostContent = async (requestPostId: String) => {
      try {
        setLoading(true);
        const res = await axiosInstance.get<ResponseDTO<Post>>(
          `/posts/get?postId=${requestPostId}`,
        );
        if (res.data && res.data.data) {
          setPostContent(res.data.data);
          setLiked(res.data.data.liked || false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostContent(postId);
  }, [postId]);

  const handleLikePost = async () => {
    try {
      const res = await axiosInstance.patch(`/posts/likes/${postId}`, {
        userId: user?.id,
        action: `${isLiked === false ? 'like' : 'dis-like'}`,
      });
      if (res.status === 200) {
        dispatch(
          likePost({postId, action: isLiked === false ? 'like' : 'dislike'}),
        );
        setLiked(prev => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.wrapper}>
      {auth.isAuth ? (
        <FloatingButton
          icon={isLiked ? 'thumb-down' : 'thumb-up'}
          onPress={handleLikePost}
        />
      ) : null}
      <ScrollView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size={'large'} style={styles.activityIndicator} />
        ) : (
          <>
            {postContent?.content ? (
              <>
                <Text style={styles.postTitle}>{postContent.title}</Text>
                <HtmlComponent html={postContent.content} />
              </>
            ) : null}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 25,
  },
  activityIndicator: {
    position: 'absolute',
    bottom: (Dimensions.get('window').height - 40) / 2,
    left: Dimensions.get('window').width / 2,
  },
  postTitle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PostScreen;
