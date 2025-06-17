import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Post} from '@data/post';
import {dateToString} from 'src/utils/dateTimeUtil';
import IconTextComponent from './IconTextComponent';
import {useNavigation} from '@react-navigation/native';
import {useAppColor} from 'src/hooks/useAppColor';

interface Prop {
  post: Post;
}

const PostListItem = (props: Prop) => {
  const {post} = props;
  const navigation = useNavigation<any>();
  const theme = useAppColor();
  const handleOnPress = (id: string | null) => {
    if (!id) {
      return;
    }
    navigation.push('Post', {postId: post.id});
  };

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: theme.cardColor}]}
      onPress={() => handleOnPress(post.id)}>
      {post.imgUrl ? (
        <Image source={{uri: post.imgUrl}} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.blankView]} />
      )}

      <View style={styles.infoContainer}>
        <Text
          style={[styles.title, {color: theme.onPrimary}]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {post.title}
        </Text>
        <Text style={{color: theme.textSecondary}}>
          {dateToString(post.updatedAt, 'DD/MM/YY hh:mm')}
        </Text>
        <Text
          style={[styles.sumary, {color: theme.textSecondary}]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {post.summary ?? 'No content'}
        </Text>
        <View style={styles.statisticContainer}>
          <IconTextComponent
            icon="thumb-up"
            text={`${post._count.postLikes}`}
            iconColor={theme.textSecondary}
            textColor={theme.textSecondary}
          />
          <IconTextComponent
            icon="bar-chart"
            text={`${post._count.postVisits}`}
            iconColor={theme.textSecondary}
            textColor={theme.textSecondary}
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
    fontSize: 15,
    flexShrink: 1,
  },
  statisticContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  blankView: {
    backgroundColor: 'black',
    borderRadius: 20,
  },
});

export default PostListItem;
