import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../Redux/Slices/adminTokenSlice';
import UserProvider from '../Faculty/context/UserContext';
import RootNavigator from './navigation/RootNavigator';

const AdminApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const hydrateToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('TOKEN');
        if (storedToken) {
          dispatch(setToken({ token: storedToken }));
        }
      } catch (e) {
        // ignore hydration errors
      }
    };
    hydrateToken();
  }, [dispatch]);

  return (
    <NavigationContainer {...({ independent: true } as any)}>
      <UserProvider>
        <RootNavigator />
      </UserProvider>
    </NavigationContainer>
  );
};

export default AdminApp;