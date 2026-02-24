import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import mobileTheme from '../theme/mobileTheme';

const InstallAppBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') return undefined;

    const onBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const onAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    const standalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
    const iosStandalone = window.navigator.standalone === true;
    if (standalone || iosStandalone) {
      setIsInstalled(true);
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const isIOS = useMemo(() => {
    if (Platform.OS !== 'web') return false;
    const ua = window.navigator.userAgent || '';
    return /iPad|iPhone|iPod/.test(ua);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result?.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      return;
    }

    if (isIOS) {
      Alert.alert(
        'Install App',
        'In Safari, tap Share and then tap "Add to Home Screen" to install the app.'
      );
      return;
    }

    Alert.alert('Install App', 'Install option is not available yet. Open in Chrome and use the browser install menu.');
  };

  if (Platform.OS !== 'web' || isInstalled) return null;

  return (
    <View style={styles.wrap}>
      <View style={styles.banner}>
        <Text style={styles.title}>Install App</Text>
        <Text style={styles.text}>Add this portal to your phone home screen.</Text>
        <TouchableOpacity onPress={handleInstall} style={styles.button} activeOpacity={0.86}>
          <Text style={styles.buttonText}>Download & Install</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: mobileTheme.spacing.md,
  },
  banner: {
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    padding: mobileTheme.spacing.md,
  },
  title: {
    color: mobileTheme.colors.textPrimary,
    fontSize: mobileTheme.typography.small,
    fontWeight: mobileTheme.typography.bold,
  },
  text: {
    marginTop: 4,
    color: mobileTheme.colors.textSecondary,
    fontSize: mobileTheme.typography.caption,
  },
  button: {
    marginTop: mobileTheme.spacing.sm,
    borderRadius: mobileTheme.radius.md,
    backgroundColor: mobileTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: mobileTheme.spacing.sm,
  },
  buttonText: {
    color: mobileTheme.colors.textOnPrimary,
    fontSize: mobileTheme.typography.caption,
    fontWeight: mobileTheme.typography.semibold,
  },
});

export default InstallAppBanner;
