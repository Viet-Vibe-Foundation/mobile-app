import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Post} from '@data/post';
import {dateToString} from 'src/utils/dateTimeUtil';
import IconTextComponent from '../../home/components/IconTextComponent';
import {useNavigation} from '@react-navigation/native';

interface Prop {
  post: Post;
}

const PostListItem = (props: Prop) => {
  const {post} = props;
  const navigation = useNavigation<any>();

  const handleOnPress = (id: string | null) => {
    if (!id) return;
    navigation.push('Post', {postId: post.id});
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleOnPress(post.id)}>
      {post.imgUrl ? (
        <Image source={{uri: post.imgUrl}} style={styles.image} />
      ) : (
        <View
          style={[
            styles.image,
            {backgroundColor: 'black', borderRadius: 20},
          ]}></View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {post.title}
        </Text>
        <Text>{dateToString(post.updatedAt, 'DD/MM/YY hh:mm')}</Text>
        <Text style={styles.sumary} numberOfLines={2} ellipsizeMode="tail">
          {post.summary ?? 'No content'}
        </Text>
        <View style={styles.statisticContainer}>
          <IconTextComponent
            icon="thumb-up"
            text={`${post._count.postVisits}`}
          />
          <IconTextComponent
            icon="bar-chart"
            text={`${post._count.postVisits}`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    maxHeight: 150,
    flexDirection: 'row',
    paddingRight: 5,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    gap: 10,
  },
  infoContainer: {
    flex: 1,
    gap: 5,
    paddingBottom: 5,
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  sumary: {
    color: 'gray',
    fontSize: 15,
    flexShrink: 1,
  },
  statisticContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});

export default PostListItem;
