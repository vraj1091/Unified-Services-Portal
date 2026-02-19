import { Platform } from 'react-native';

// For physical device, change this to your computer's IP address (e.g., 'http://192.168.1.5:8000')
// For Android Emulator, use 'http://10.0.2.2:8000'
// For iOS Simulator or Web, use 'http://localhost:8000'

const DEV_API_URL = Platform.select({
    android: 'http://10.0.2.2:8000', // Default for Android Emulator
    ios: 'http://localhost:8000',
    web: 'http://localhost:8000',
    default: 'http://localhost:8000',
});

// If you are running on a physical device, replace the above with your machine's local IP
// export const API_URL = 'http://192.168.x.x:8000'; 
export const API_URL = DEV_API_URL;
