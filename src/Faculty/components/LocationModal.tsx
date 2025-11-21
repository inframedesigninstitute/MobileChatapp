import Geolocation from 'react-native-geolocation-service';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface LocationModalProps {
  visible: boolean;
  onClose: () => void;
  onSend: (coords: { latitude: number; longitude: number }) => void;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

const LocationModal: React.FC<LocationModalProps> = ({ visible, onClose, onSend }) => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (visible) {
      getLocation();
    }
  }, [visible]);

  // Permission Request (Android only)
  const requestPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getLocation = async () => {
    setLoading(true);
    try {
      const hasPermission = await requestPermission();

      if (!hasPermission) {
        Alert.alert("Permission Denied", "Enable location permission to continue.");
        onClose();
        return;
      }

      Geolocation.getCurrentPosition(
        (pos: any) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error(error);
          Alert.alert("Error", "Unable to get location.");
          setLoading(false);
          onClose();
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    } catch (err) {
      console.error(err);
      onClose();
    }
  };

  const handleSendLocation = () => {
    if (location) {
      onSend(location);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Your Live Location</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : location ? (
          <View style={styles.mapContainer}>
            <Text style={styles.mapText}>
              {location.latitude}, {location.longitude}
            </Text>
          </View>
        ) : (
          <Text>Unable to fetch location.</Text>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: '#d6e6d6ff' }]}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSendLocation} style={[styles.button, { backgroundColor: '#d6e6d6ff' }]}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 0, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  mapContainer: {
    width: '100%',
    height: "80%",
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  mapText: { fontSize: 16, color: '#666' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: { paddingHorizontal: 40, paddingVertical: 12, borderRadius: 25 },
  buttonText: { color: '#000000ff', fontSize: 16, fontWeight: 'bold' },
});
