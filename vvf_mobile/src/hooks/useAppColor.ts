import {RootState} from '@libs/redux/store';
import {appColor} from '@styles/appColor';
import {useSelector} from 'react-redux';

export const useAppColor = () => {
  const theme = useSelector((state: RootState) => state.theme);
  return theme.value === 'light' ? appColor.light : appColor.dark;
};
