import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import VectorImage from 'react-native-vector-image';
import {socialButtonData} from '@constants';
import {useTranslation} from 'react-i18next';
import {cardStyles} from '@styles/cardStyles';
import {openFacebook, openInstagram} from 'src/utils/socialDeepLinkUtil';
import {useAppColor} from 'src/hooks/useAppColor';

const SocialContactComponent = () => {
  const {t} = useTranslation();
  const theme = useAppColor();
  return (
    <View
      style={[
        styles.container,
        cardStyles,
        {backgroundColor: theme.cardColor},
      ]}>
      <Text style={[styles.title, {color: theme.onPrimary}]}>
        {t('contact_us')}
      </Text>

      <View style={styles.iconContainer}>
        {socialButtonData.map(item => (
          <TouchableOpacity
            key={`socialIcon_${item.label}`}
            style={styles.button}
            onPress={() => {
              item.platform === 'facebook' ? openFacebook() : openInstagram();
            }}>
            <VectorImage source={item.icon} width={40} height={40} />
            <Text style={[styles.label, {color: theme.onPrimary}]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {alignItems: 'center'},
  label: {marginTop: 6, fontSize: 14},
});

export default SocialContactComponent;
