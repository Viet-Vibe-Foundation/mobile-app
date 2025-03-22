import {
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import axiosInstance from 'src/services/apis/axios';
import {Post} from 'src/data/post';
import ResponseDTO from 'src/data/responseDTO';
import HtmlComponent from 'src/ui/components/HtmlComponent';

type PostScreenParams = {
  postId: string;
};

const PostScreen = () => {
  const route = useRoute<RouteProp<{params: PostScreenParams}, 'params'>>();
  const {postId} = route.params;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<Post | null>(null);

  useEffect(() => {
    fetchPostContent();
  }, []);

  const fetchPostContent = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get<ResponseDTO<Post>>(
        `/posts/get?postId=${postId}`,
      );
      if (res.data && res.data.data) {
        setPostContent(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={'large'} style={styles.activityIndicator} />
      ) : (
        <>
          {postContent?.content ? (
            <HtmlComponent html={postContent.content} />
          ) : null}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default PostScreen;
