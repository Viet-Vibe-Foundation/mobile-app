import {
  View,
  StyleSheet,
  Alert,
  Text,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import UserInfoComponent from '../components/UserInfoComponent';
import TextInputComponent from '@components/TextInputComponent';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {appInfo, cardStyles, storagePropertiesName} from '@constants';
import {User} from '@data/user';
import {mmkvStorage} from 'src/libs/mmvkStorage';
import axiosInstance from 'src/services/apis/axios';
import ResponseDTO from '@data/responseDTO';
import FilledButtonComponent from '@components/FilledButtonComponent';
import BottomSheet from '@components/BottomSheet';
import ImageSelectOptionBottomSheet from '../components/ImageSelectOptionBottomSheet';
import {performCamera, performGallery} from 'src/services/imageService';

const UserProfile = () => {
  const [userStorage, setUserStorage] = useMMKVStorage<User | null>(
    storagePropertiesName.userInfo,
    mmkvStorage,
    null,
  );
  const [orgiginUser, setOriginuser] = useState<User | null>(null);
  const [email, setEmail] = useState<string | null>(userStorage?.email || null);
  const [name, setName] = useState<string | null>(userStorage?.name || null);
  const [age, setAge] = useState<string | null>(userStorage?.age || null);
  const [phone, setPhone] = useState<string | null>(userStorage?.phone || null);
  const [address, setAddress] = useState<string | null>(
    userStorage?.address || null,
  );
  const [isOpenBottomSheet, setOpenBottomSheet] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasChanged, setHasChanged] = useState<{
    name?: boolean;
    age?: boolean;
    phone?: boolean;
    image?: boolean;
    address?: boolean;
  } | null>({
    age: false,
    name: false,
    phone: false,
    image: false,
    address: false,
  });
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    userStorage?.image || undefined,
  );

  const [error, setError] = useState<{
    name?: {
      isError: boolean;
      message: string;
    };
    age?: {
      isError: boolean;
      message: string;
    };
    phone?: {
      isError: boolean;
      message: string;
    };
  } | null>(null);

  const handleChanged = useCallback(() => {
    if (!orgiginUser) {
      return {
        age: false,
        name: false,
        phone: false,
        image: false,
        address: false,
      };
    }
    return {
      name: orgiginUser.name !== name,
      age: orgiginUser.age !== age,
      phone: orgiginUser.phone !== phone,
      address: orgiginUser.address !== address,
      image: orgiginUser.image !== selectedImage,
    };
  }, [name, age, phone, address, selectedImage, orgiginUser]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axiosInstance.get<ResponseDTO<User>>('/users/get');
        if (!res.data.data) {
          Alert.alert('Error', 'Something went wrong! Please try again later');
          return;
        }
        setOriginuser(res.data.data);
        setEmail(res.data.data.email ?? null);
        setName(res.data.data.name ?? null);
        setPhone(res.data.data.phone ?? null);
        setAddress(res.data.data.address ?? null);
        setAge(res.data.data.age ?? null);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    setHasChanged(handleChanged());
  }, [handleChanged]);

  const validate = () => {
    setError(null);
    let hasError = false;
    if (!name || name.length < 2) {
      setError(prev => ({
        ...prev,
        name: {
          isError: true,
          message: 'Name is not valid',
        },
      }));
      hasError = true;
    }
    const ageNumber = Number(age);
    if (!age || isNaN(ageNumber)) {
      setError(prev => ({
        ...prev,
        age: {
          isError: true,
          message: 'Age must be a number',
        },
      }));
      hasError = true;
    }
    if (!phone || phone.length !== 10 || !appInfo.phoneRegex.test(phone)) {
      setError(prev => ({
        ...prev,
        phone: {
          isError: true,
          message: 'Phone is not valid',
        },
      }));
      hasError = true;
    }

    return !hasError;
  };

  const handleSelectImage = async (option: string) => {
    if (option === 'Camera') {
      setOpenBottomSheet(false);
      const imageRes = await performCamera();
      if (!imageRes || !imageRes.assets) {
        return;
      }
      setSelectedImage(imageRes.assets[0].uri);
    } else {
      setOpenBottomSheet(false);
      const imageRes = await performGallery();
      if (!imageRes) {
        return;
      }
      setSelectedImage(imageRes);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!validate()) {
        return;
      }

      setLoading(true);

      let responseImageUrl: {
        id: string;
        name: string;
        url: string;
      } | null = null;

      if (hasChanged?.image && selectedImage) {
        const formData = new FormData();
        const filename = selectedImage.split('/').pop() || 'avatar.jpg';
        const fileType = filename.split('.').pop();

        formData.append('file', {
          uri: selectedImage,
          name: filename,
          type: `image/${fileType}`,
        } as any);

        const responseImage = await axiosInstance.post<{
          id: string;
          name: string;
          url: string;
        }>('users/avatars', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 10000,
        });

        responseImageUrl = responseImage.data;
      }

      const userEdited: User = {
        ...orgiginUser!,
        name: hasChanged?.name ? name ?? orgiginUser?.name : orgiginUser?.name,
        age: hasChanged?.age ? age ?? orgiginUser?.age : orgiginUser?.age,
        phone: hasChanged?.phone
          ? phone ?? orgiginUser?.phone
          : orgiginUser?.phone,
        address: hasChanged?.address
          ? address ?? orgiginUser?.address
          : orgiginUser?.address,
        image: hasChanged?.image
          ? responseImageUrl?.url ?? orgiginUser?.image
          : orgiginUser?.image,
      };
      const response = await axiosInstance.put<ResponseDTO<User>>(
        'users/edit',
        userEdited,
      );
      if (response.data.data) {
        setOriginuser(response.data.data);
        setUserStorage(prev => ({
          ...prev,
          image: response.data.data?.image || prev?.image,
          name: response.data.data?.name || prev?.name,
        }));
        Alert.alert('Notification', 'Update successfully');
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Something went wrong while updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableNativeFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <UserInfoComponent
              email={email || 'N/a'}
              image={selectedImage || 'N/a'}
              name={name || 'N/a'}
              showAddBtn
              onChangeImage={() => setOpenBottomSheet(!isOpenBottomSheet)}
              style={styles.userInfoContainer}
            />
            <View style={styles.userInfoForm}>
              <TextInputComponent
                enable={false}
                placeHolder="Email"
                keyboardType="default"
                type="normal"
                value={email}
              />
              <TextInputComponent
                onChangeText={setName}
                keyboardType="default"
                type="normal"
                value={name}
              />
              <TextInputComponent
                onChangeText={setAge}
                placeHolder="Age"
                keyboardType="default"
                type="normal"
                value={age}
              />
              <TextInputComponent
                onChangeText={setPhone}
                placeHolder="Phone"
                keyboardType="default"
                type="normal"
                value={phone}
              />
              <TextInputComponent
                onChangeText={setAddress}
                placeHolder="Address"
                keyboardType="default"
                type="normal"
                value={address}
              />
              <>
                {error?.age?.message && (
                  <Text style={styles.errorText}>{error.age.message}</Text>
                )}
                {error?.name?.message && (
                  <Text style={styles.errorText}>{error.name.message}</Text>
                )}
                {error?.phone?.message && (
                  <Text style={styles.errorText}>{error.phone.message}</Text>
                )}
              </>
            </View>
            <FilledButtonComponent
              style={styles.saveBtn}
              onPress={handleUpdate}
              title="Save"
              loading={isLoading}
              enabled={
                hasChanged?.address ||
                hasChanged?.age ||
                hasChanged?.image ||
                hasChanged?.name ||
                hasChanged?.phone
              }
            />
          </View>
        </TouchableNativeFeedback>
      </KeyboardAvoidingView>
      <BottomSheet
        isOpen={isOpenBottomSheet}
        toggleSheet={() => setOpenBottomSheet(!isOpenBottomSheet)}>
        <ImageSelectOptionBottomSheet
          onOptionSelected={val => handleSelectImage(val)}
          optionList={['Camera', 'Gallery']}
        />
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    marginVertical: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  userInfoForm: {
    ...cardStyles,
  },
  saveBtn: {
    marginTop: 15,
  },
});

export default UserProfile;
