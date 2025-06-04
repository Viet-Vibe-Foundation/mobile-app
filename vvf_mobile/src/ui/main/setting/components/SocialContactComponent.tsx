import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import VectorImage from 'react-native-vector-image';
import {socialButtonData} from '@constants';
import {useTranslation} from 'react-i18next';
import {cardStyles} from '@styles/cardStyles';
import {openFacebook, openInstagram} from 'src/utils/socialDeepLinkUtil';

const SocialContactComponent = () => {
  const {t} = useTranslation();
  return (
    <View style={cardStyles}>
      <Text style={styles.title}>{t('contact_us')}</Text>

      <View style={styles.iconContainer}>
        {socialButtonData.map(item => (
          <TouchableOpacity
            key={`socialIcon_${item.label}`}
            style={styles.button}
            onPress={() => {
              item.platform === 'facebook' ? openFacebook() : openInstagram();
            }}>
            <VectorImage source={item.icon} width={40} height={40} />
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
