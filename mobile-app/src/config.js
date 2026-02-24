import { Platform } from 'react-native';
import Constants from 'expo-constants';

const DEFAULT_BACKEND_PORT = '8000';

const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

const getHostFromExpo = () => {
  const hostUri =
    Constants?.expoConfig?.hostUri ||
    Constants?.manifest2?.extra?.expoClient?.hostUri ||
    Constants?.manifest?.debuggerHost ||
    '';

  if (!hostUri) return null;

  const [host] = hostUri.split(':');
  if (!host || host === 'localhost' || host === '127.0.0.1') {
    return null;
  }

  return host;
};

const getDefaultApiUrl = () => {
  if (Platform.OS === 'android') {
    const expoHost = getHostFromExpo();
    if (expoHost) {
      return `http://${expoHost}:${DEFAULT_BACKEND_PORT}`;
    }
    return 'http://10.0.2.2:8000';
  }

  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.location?.hostname) {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return `http://${host}:${DEFAULT_BACKEND_PORT}`;
    }
    return 'https://gujarat-portal-backend.onrender.com';
  }

  return 'http://localhost:8000';
};

const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
const configuredUrls = process.env.EXPO_PUBLIC_API_URLS
  ?.split(',')
  .map((value) => value.trim())
  .filter(Boolean) || [];

const getWebDerivedUrl = () => {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const host = window.location?.hostname || '';
  if (!host.includes('onrender.com')) return null;

  // Example: gujarat-portal-mobile.onrender.com -> gujarat-portal-backend.onrender.com
  const backendHost = host.replace('-mobile', '-backend');
  if (backendHost === host) return null;
  return `https://${backendHost}`;
};

const candidates = [
  ...configuredUrls,
  configuredUrl,
  getWebDerivedUrl(),
  getDefaultApiUrl(),
].filter(Boolean).map(trimTrailingSlash);

export const API_URLS = [...new Set(candidates)];
export const API_URL = API_URLS[0];
