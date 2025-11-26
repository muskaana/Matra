import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.matra.hindi',
  appName: 'Matra',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  },
  ios: {
    contentInset: 'automatic'
  }
};

export default config;
